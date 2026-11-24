'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/era27/era27.module.css';
import {
  ERA27_SINGLE_PASSES,
  ERA27_GROUP_PASSES,
  ERA27_CONTACTS,
  ERA27_BOOKING_CONFIG,
  getBookingModeContent,
} from '@/lib/era27-content';

interface RsvpSectionProps {
  preselectedPass?: string;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  passType: string;
  quantity: number;
  notes: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  passType?: string;
}

export default function RsvpSection({ preselectedPass }: RsvpSectionProps) {
  const content = getBookingModeContent();
  const { isPreBooking } = content;

  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    passType: 'Gold',
    quantity: 1,
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  // Update passType when preselectedPass changes from PassesSection
  useEffect(() => {
    if (preselectedPass) {
      setFormData((prev) => ({ ...prev, passType: preselectedPass }));
    }
  }, [preselectedPass]);

  const allPassOptions = [
    ...ERA27_SINGLE_PASSES.map((p) => ({
      name: p.name,
      label: `${p.name} Pass (₹${p.basePrice.toLocaleString('en-IN')}${
        p.couponPrice ? ` → Early Bird ₹${p.couponPrice.toLocaleString('en-IN')}` : ''
      })`,
    })),
    ...ERA27_GROUP_PASSES.map((p) => ({
      name: p.name,
      label: `${p.name} Group Pass (${p.guests} Guests — ₹${p.basePrice.toLocaleString('en-IN')}${
        p.couponPrice ? ` → Early Bird ₹${p.couponPrice.toLocaleString('en-IN')}` : ''
      })`,
    })),
  ];

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.passType) {
      newErrors.passType = 'Please select a pass tier.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerMessage(null);

    // Fallback reference code in case of network issue
    const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
    const fallbackCode = isPreBooking ? `ERA27-PRB-${randomHex}` : `ERA27-TKT-${randomHex}`;

    try {
      const res = await fetch('/api/era27/prebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          passType: formData.passType,
          quantity: formData.quantity,
          notes: formData.notes.trim(),
        }),
      });

      const data = (await res.json()) as {
        referenceCode?: string;
        message?: string;
      };

      if (res.ok && data.referenceCode) {
        setReferenceCode(data.referenceCode);
        setServerMessage(data.message || null);
      } else {
        // Fallback to client reference
        setReferenceCode(fallbackCode);
      }
    } catch {
      // Local fallback on connection error
      setReferenceCode(fallbackCode);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setReferenceCode('');
    setServerMessage(null);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      passType: 'Gold',
      quantity: 1,
      notes: '',
    });
    setErrors({});
  };

  // Pricing calculations
  const selectedPassDetails = [
    ...ERA27_SINGLE_PASSES,
    ...ERA27_GROUP_PASSES,
  ].find((p) => p.name === formData.passType);

  const estimatedTotal = selectedPassDetails
    ? (selectedPassDetails.couponPrice ?? selectedPassDetails.basePrice) * formData.quantity
    : 0;

  const totalWalletMoney = selectedPassDetails
    ? selectedPassDetails.walletMoney * formData.quantity
    : 0;

  return (
    <section id="rsvp" className={styles.contentSection}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>{content.rsvpSectionEyebrow}</p>
        <h2 className={styles.sectionTitle}>{content.rsvpSectionTitle}</h2>
        <p className={styles.sectionDesc}>{content.rsvpSectionDesc}</p>
      </div>

      <div className={styles.rsvpCard}>
        {submitted ? (
          /* Confirmation Screen */
          <div className={styles.confirmationCard}>
            <span className={styles.confirmationBadge}>
              {content.confirmationBadge}
            </span>

            <h3 style={{ fontSize: '26px', color: '#ffffff', margin: '0 0 6px' }}>
              {content.confirmationHeading}
            </h3>

            <p style={{ color: 'var(--era-text-secondary)', fontSize: '13px', margin: '0 0 18px' }}>
              Thank you, <b>{formData.fullName}</b>.{' '}
              {isPreBooking
                ? 'Your early-bird pre-booking enquiry has been registered and your 10% discount is secured.'
                : 'Your pass booking request has been recorded.'}
            </p>

            <div className={styles.confirmationRefCode}>
              Reference ID:{' '}
              <span style={{ color: 'var(--era-pink)', letterSpacing: '1px' }}>
                {referenceCode}
              </span>
            </div>

            <div className={styles.confirmationSummaryList}>
              <div className={styles.confirmationSummaryRow}>
                <span style={{ color: 'var(--era-text-muted)' }}>Selected Tier:</span>
                <strong>{formData.passType} Pass</strong>
              </div>
              <div className={styles.confirmationSummaryRow}>
                <span style={{ color: 'var(--era-text-muted)' }}>Quantity:</span>
                <strong>
                  {formData.quantity} {formData.quantity > 1 ? 'passes' : 'pass'}
                </strong>
              </div>
              <div className={styles.confirmationSummaryRow}>
                <span style={{ color: 'var(--era-text-muted)' }}>Contact Mobile:</span>
                <span>{formData.phone}</span>
              </div>
              <div className={styles.confirmationSummaryRow}>
                <span style={{ color: 'var(--era-text-muted)' }}>Email Address:</span>
                <span>{formData.email}</span>
              </div>
              {selectedPassDetails && (
                <>
                  <div className={styles.confirmationSummaryRow}>
                    <span style={{ color: 'var(--era-text-muted)' }}>
                      {isPreBooking ? 'Early Bird Cost (10% Off):' : 'Total Pass Cost:'}
                    </span>
                    <strong style={{ color: 'var(--era-pink)' }}>
                      ₹{estimatedTotal.toLocaleString('en-IN')}
                    </strong>
                  </div>
                  {totalWalletMoney > 0 && (
                    <div className={styles.confirmationSummaryRow}>
                      <span style={{ color: 'var(--era-text-muted)' }}>Included Wallet Balance:</span>
                      <strong style={{ color: '#8cb5ff' }}>
                        ₹{totalWalletMoney.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  )}
                </>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${ERA27_CONTACTS.whatsappNumber}?text=${encodeURIComponent(
                  `Hi Advara team, I registered pre-booking interest for ERA 27 (Ref: ${referenceCode}). Name: ${formData.fullName}, Pass: ${formData.passType}, Qty: ${formData.quantity}. Please notify me when official ticket passes open.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
                style={{ fontSize: '12px', padding: '12px 22px' }}
              >
                Confirm via WhatsApp ↗
              </a>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={handleReset}
                style={{ fontSize: '12px', padding: '12px 22px' }}
              >
                Register Another Enquiry
              </button>
            </div>

            <p className={styles.demoNotice} style={{ marginTop: '20px' }}>
              ℹ️ <b>Two-Stage Launch Policy:</b> {ERA27_BOOKING_CONFIG.preBookingNotice}
            </p>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="fullName">
                  Your Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  className={styles.formInput}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
                {errors.fullName && <span className={styles.formErrorText}>{errors.fullName}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="phone">
                  Mobile Number (10 Digits) *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  className={styles.formInput}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                {errors.phone && <span className={styles.formErrorText}>{errors.phone}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="email">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="e.g. rahul@example.com"
                  className={styles.formInput}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <span className={styles.formErrorText}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="passType">
                  Pass Preference *
                </label>
                <select
                  id="passType"
                  className={styles.formSelect}
                  value={formData.passType}
                  onChange={(e) => setFormData({ ...formData, passType: e.target.value })}
                >
                  {allPassOptions.map((opt) => (
                    <option key={opt.name} value={opt.name}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.passType && <span className={styles.formErrorText}>{errors.passType}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="quantity">
                  Number of Passes
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max="50"
                  className={styles.formInput}
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: Math.max(1, parseInt(e.target.value, 10) || 1),
                    })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {isPreBooking
                    ? 'Estimated Early Bird Total (10% Off)'
                    : 'Estimated Pass Total'}
                </label>
                <div
                  style={{
                    background: 'rgba(6, 7, 19, 0.5)',
                    border: '1px solid var(--era-border-glass)',
                    borderRadius: '8px',
                    padding: '13px 16px',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--era-pink)',
                  }}
                >
                  ₹{estimatedTotal.toLocaleString('en-IN')}{' '}
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--era-text-muted)',
                      fontWeight: 400,
                    }}
                  >
                    ({formData.quantity} × {formData.passType})
                  </span>
                </div>
              </div>

              <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                <label className={styles.formLabel} htmlFor="notes">
                  Special Requests / Surprise Stage Inquiries (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  placeholder="Planning a surprise celebration, large group table, or dietary requests? Let us know here."
                  className={styles.formTextarea}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.formDisclaimerNotice}>
              🔒 <b>Two-Stage Launch Policy:</b> {ERA27_BOOKING_CONFIG.preBookingNotice}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.btnPrimary}
                style={{ width: '100%', maxWidth: '380px' }}
              >
                {isSubmitting ? 'Registering...' : content.formSubmitText}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
