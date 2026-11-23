"""Exercise the built Worker against an isolated local D1 database."""
import json, os, subprocess, time, urllib.request, urllib.error, uuid
from pathlib import Path
state = '.sites-runtime/enquiry-access-tests'
cli = ['node', '--import', './scripts/sites-env.mjs', './node_modules/wrangler/bin/wrangler.js']
config = ['--config', 'dist/server/wrangler.json']
# A fresh isolated state for every run; production storage is never accessed.
state += '-' + uuid.uuid4().hex
for migration in sorted(Path('drizzle').glob('*.sql')):
    subprocess.run(cli + ['d1','execute','DB','--local'] + config + ['--persist-to',state,'--file',str(migration)], check=True, stdout=subprocess.DEVNULL)
log = open(state + '.log','w')
server = subprocess.Popen(cli + ['dev'] + config + ['--local','--persist-to',state,'--ip','127.0.0.1','--port','4199','--inspector-port','0'], stdout=log, stderr=log)
base='http://127.0.0.1:4199'
def request(method='GET',path='/api/enquiries',user=None,data=None,origin=base):
    headers={'Origin':origin}
    if user:
        headers.update({'oai-authenticated-user-id':user[0],'oai-authenticated-user-email':user[1]})
    raw=None
    if data is not None:
        raw=json.dumps(data).encode();headers['Content-Type']='application/json'
    req=urllib.request.Request(base+path,data=raw,headers=headers,method=method)
    try:
        with urllib.request.urlopen(req,timeout=10) as res:return res.status,json.load(res)
    except urllib.error.HTTPError as res:
        text=res.read().decode()
        try:return res.code,json.loads(text)
        except ValueError:raise RuntimeError(f'HTTP {res.code}: {text[:1500]}')
a=('visitor-a','visitor-a@example.com');b=('visitor-b','visitor-b@example.com');admin=('admin-owner','chinnuyadavvv369@gmail.com')
try:
    for _ in range(80):
        if server.poll() is not None:raise RuntimeError(Path(log.name).read_text()[-3000:])
        try:
            if request()[0]==401:break
        except (OSError,ValueError):time.sleep(.25)
    else:raise RuntimeError('Local Worker did not start')
    payload={'id':str(uuid.uuid4()),'Name':'Local test guest','email':a[1],'Occasion':'Birthday','Date':'2027-01-10','Guests':'20','Budget':'10000','Ideas':'Local verification only.'}
    assert request('POST',data=payload)[0]==401
    assert request('POST',user=a,data=payload,origin='https://other.example')[0]==403
    assert request('POST',user=a,data={**payload,'email':'invalid'})[0]==400
    assert request('POST',user=a,data=payload)[0]==201
    assert request('POST',user=a,data=payload)[0]==201 # Retry remains one record.
    status,own=request(user=a);assert status==200 and len(own['items'])==1
    assert 'accountEmail' not in own['items'][0] and 'userId' not in own['items'][0]
    assert request(user=b)[1]['items']==[]
    assert request(path='/api/enquiries?view=admin',user=b)[0]==403
    change={'id':payload['id'],'status':'Confirmed'}
    assert request('PATCH',user=b,data=change)[0]==403
    assert request('PATCH',data=change)[0]==401
    assert request('POST',user=b,data=payload)[0]==409
    assert len(request(path='/api/enquiries?view=admin',user=admin)[1]['items'])==1
    assert request('PATCH',user=admin,data={**change,'status':'invalid'})[0]==400
    assert request('PATCH',user=admin,data=change)[0]==200
    assert request(user=a)[1]['items'][0]['status']=='Confirmed'
    assert request(path='/api/enquiries?page=-1',user=a)[0]==400
    print('PASS: database persistence, retry deduplication, input validation, anonymous denial, cross-origin denial, visitor isolation, admin-only updates, and status visibility.')
finally:
    server.terminate()
    try:server.wait(timeout=10)
    except subprocess.TimeoutExpired:server.kill()
    log.close()
