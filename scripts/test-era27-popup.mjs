import { spawn } from 'node:child_process';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DEV_URL = 'http://127.0.0.1:5173';
const DEBUG_PORT = 9222;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendCdp(ws, method, params = {}) {
  const id = Math.floor(Math.random() * 1000000);
  return new Promise((resolve, reject) => {
    const handler = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.id === id) {
          ws.removeEventListener('message', handler);
          if (data.error) reject(new Error(JSON.stringify(data.error)));
          else resolve(data.result);
        }
      } catch (err) {
        reject(err);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function main() {
  console.log('1. Starting headless Chrome with remote debugging on port ' + DEBUG_PORT);
  const chrome = spawn(
    CHROME_PATH,
    [
      '--headless=new',
      `--remote-debugging-port=${DEBUG_PORT}`,
      '--disable-gpu',
      '--no-sandbox',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  try {
    // Wait for Chrome debugging endpoint
    let wsUrl = null;
    for (let i = 0; i < 20; i++) {
      await sleep(300);
      try {
        const res = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
        const list = await res.json();
        if (list && list[0] && list[0].webSocketDebuggerUrl) {
          wsUrl = list[0].webSocketDebuggerUrl;
          break;
        }
      } catch {}
    }

    if (!wsUrl) throw new Error('Failed to obtain Chrome WebSocket Debugger URL');
    console.log('2. Connected to Chrome WebSocket:', wsUrl);

    const ws = new WebSocket(wsUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    await sendCdp(ws, 'Page.enable');
    await sendCdp(ws, 'DOM.enable');

    // TEST A: Desktop (1440x900) - Homepage load & popup delay
    console.log('3. Navigating to homepage on Desktop (1440x900)...');
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // Clear sessionStorage before testing
    await sendCdp(ws, 'Page.navigate', { url: `${DEV_URL}/` });
    await sleep(600);
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: 'sessionStorage.clear();',
    });
    await sendCdp(ws, 'Page.navigate', { url: `${DEV_URL}/` });

    // Check at 500ms (should NOT be open yet, delay is 1800ms)
    await sleep(500);
    let checkEarly = await sendCdp(ws, 'Runtime.evaluate', {
      expression: 'Boolean(document.querySelector("[role=\'dialog\']"))',
      returnByValue: true,
    });
    console.log('   - At 500ms, is popup open?', checkEarly.result.value);

    // Wait until 2400ms (1.8s delay + render buffer)
    await sleep(2000);
    let checkOpen = await sendCdp(ws, 'Runtime.evaluate', {
      expression: 'Boolean(document.querySelector("[role=\'dialog\']"))',
      returnByValue: true,
    });
    console.log('   - At 2500ms, is popup open?', checkOpen.result.value);

    // Verify dialog properties
    let dialogProps = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `JSON.stringify({
        role: document.querySelector("[role='dialog']")?.getAttribute('role'),
        ariaModal: document.querySelector("[role='dialog']")?.getAttribute('aria-modal'),
        title: document.getElementById('era27-popup-title')?.innerText,
        tagline: document.getElementById('era27-popup-desc')?.innerText,
        ctaHref: document.querySelector("a[data-autofocus='true']")?.getAttribute('href'),
        bodyOverflow: document.body.style.overflow
      })`,
      returnByValue: true,
    });
    console.log('   - Dialog accessibility & attributes:', dialogProps.result.value);

    // Take Desktop Screenshot
    const screenshotDesktop = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    const fs = await import('node:fs/promises');
    await fs.writeFile(
      '/Users/agratisheela/.gemini/antigravity/brain/65600af8-c051-4576-9eb0-9d3904ee4f94/scratch/era27_popup_desktop.png',
      Buffer.from(screenshotDesktop.data, 'base64')
    );
    console.log('   - Saved desktop screenshot: scratch/era27_popup_desktop.png');

    // TEST B: Close via Close Button & check session storage persistence
    console.log('4. Testing Close Button click dismissal...');
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: 'document.querySelector("button[aria-label=\'Close ERA 27 announcement\']").click();'
    });
    await sleep(300);

    let checkClosedBtn = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `JSON.stringify({
        isOpen: Boolean(document.querySelector("[role='dialog']")),
        sessionDismissed: sessionStorage.getItem('era27_popup_dismissed_session'),
        bodyOverflow: document.body.style.overflow
      })`,
      returnByValue: true,
    });
    console.log('   - Post-close-button state:', checkClosedBtn.result.value);

    // TEST B2: Close via Backdrop click
    console.log('4b. Testing Backdrop click dismissal...');
    await sendCdp(ws, 'Runtime.evaluate', { expression: 'sessionStorage.clear();' });
    await sendCdp(ws, 'Page.navigate', { url: `${DEV_URL}/` });
    await sleep(2200);
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: 'document.querySelector("[role=\'dialog\']").parentElement.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));'
    });
    await sleep(300);
    let checkClosedBackdrop = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `Boolean(document.querySelector("[role='dialog']"))`,
      returnByValue: true
    });
    console.log('   - Is closed after backdrop click?', !checkClosedBackdrop.result.value);

    // TEST B3: Close via Escape key
    console.log('4c. Testing Escape key dismissal...');
    await sendCdp(ws, 'Runtime.evaluate', { expression: 'sessionStorage.clear();' });
    await sendCdp(ws, 'Page.navigate', { url: `${DEV_URL}/` });
    await sleep(2200);
    await sendCdp(ws, 'Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await sendCdp(ws, 'Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await sleep(300);
    let checkClosedEsc = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `Boolean(document.querySelector("[role='dialog']"))`,
      returnByValue: true
    });
    console.log('   - Is closed after Escape key?', !checkClosedEsc.result.value);

    // TEST C: Reload page to verify session persistence (should NOT re-open)
    console.log('5. Testing session persistence on page reload...');
    await sendCdp(ws, 'Page.navigate', { url: `${DEV_URL}/` });
    await sleep(2500);
    let checkReopen = await sendCdp(ws, 'Runtime.evaluate', {
      expression: 'Boolean(document.querySelector("[role=\'dialog\']"))',
      returnByValue: true,
    });
    console.log('   - Did popup reopen after reload in same session?', checkReopen.result.value);

    // TEST D: Mobile Viewport (390x844) with fresh session
    console.log('6. Testing Mobile Viewport (390x844)...');
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: 'sessionStorage.clear();',
    });
    await sendCdp(ws, 'Page.navigate', { url: `${DEV_URL}/` });
    await sleep(2500);

    const screenshotMobile = await sendCdp(ws, 'Page.captureScreenshot', { format: 'png' });
    await fs.writeFile(
      '/Users/agratisheela/.gemini/antigravity/brain/65600af8-c051-4576-9eb0-9d3904ee4f94/scratch/era27_popup_mobile.png',
      Buffer.from(screenshotMobile.data, 'base64')
    );
    console.log('   - Saved mobile screenshot: scratch/era27_popup_mobile.png');

    // Check horizontal scroll / overflow on mobile
    let mobileOverflow = await sendCdp(ws, 'Runtime.evaluate', {
      expression: `JSON.stringify({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      })`,
      returnByValue: true,
    });
    console.log('   - Mobile layout overflow check:', mobileOverflow.result.value);

    // TEST E: Verify popup NEVER appears on /era27
    console.log('7. Verifying popup NEVER appears on /era27 standalone route...');
    await sendCdp(ws, 'Runtime.evaluate', {
      expression: 'sessionStorage.clear();',
    });
    await sendCdp(ws, 'Page.navigate', { url: `${DEV_URL}/era27` });
    await sleep(2500);
    let checkEraRoute = await sendCdp(ws, 'Runtime.evaluate', {
      expression: 'Boolean(document.querySelector("[role=\'dialog\']"))',
      returnByValue: true,
    });
    console.log('   - On /era27 route, is popup present?', checkEraRoute.result.value);

    console.log('ALL PHASE 3 CDP TESTS COMPLETED SUCCESSFULLY!');
    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
