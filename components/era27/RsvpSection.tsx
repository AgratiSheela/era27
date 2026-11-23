'use client';

import { useState, useEffect } from 'react';
import styles from '@/app/era27/era27.module.css';
import {
  ERA27_SINGLE_PASSES,
  ERA27_GROUP_PASSES,
  ERA27_CONTACTS,
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
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    passType: 'Gold',
    quantity: 1,
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  // Update passType when preselectedPass prop changes from PassesSection
  useEffect(() => {
    if (preselectedPass) {
      setFormData((prev) => ({ ...prev, passType: preselectedPass }));
    }
  }, [preselectedPass]);

  const allPassOptions = [
    ...ERA27_SINGLE_PASSES.map((p) => ({ name: p.name, label: `${p.name} Pass (₹${p.basePrice})` })),
    ...ERA27_GROUP_PASSES.map((p) => ({ name: p.name, label: `${p.name} Group Pass (${p.guests} Guests — ₹${p.basePrice})` })),
  ];

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate frontend confirmation reference
    const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
    const code = `ERA27-PRB-${randomHex}`;
    setReferenceCode(code);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
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

  // Find selected pass details for pricing breakdown
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
        <p className={styles.sectionEyebrow}>09 / Priority Access</p>
        <h2 className={styles.sectionTitle}>Pre-Book Interest (10% Off)</h2>
        <p className={styles.sectionDesc}>
          Register your early-bird interest for ERA 27. Claim your 10% coupon discount and secure your priority entry before the 1,500 venue capacity is reached.
        </p>
      </div>

      <div className={styles.rsvpCard}>
        {submitted ? (
          /* Confirmation Screen */
          <div className={styles.confirmationCard}>
            <span className={styles.confirmationBadge}>
              ✓ Interest Registered (Frontend Demonstration)
            </span>
            <h3 style={{ fontSize: '28px', color: '#ffffff', margin: '0 0 6px' }}>
              You Are on the Priority List!
            </h3>
            <p style={{ color: 'var(--era-text-secondary)', fontSize: '13px', margin: '0 0 20px' }}>
              Thank you, <b>{formData.fullName}</b>. Your pre-booking enquiry details have been verified locally.
            </p>

            <div className={styles.confirmationRefCode}>
              Reference: <span style={{ color: 'var(--era-pink)' }}>{referenceCode}</span>
            </div>

            <div className={styles.confirmationSummaryList}>
              <div className={styles.confirmationSummaryRow}>
                <span style={{ color: 'var(--era-text-muted)' }}>Selected Pass:</span>
                <strong>{formData.passType} Pass</strong>
              </div>
              <div className={styles.confirmationSummaryRow}>
                <span style={{ color: 'var(--era-text-muted)' }}>Booking Quantity:</span>
                <strong>{formData.quantity} {formData.quantity > 1 ? 'passes' : 'pass'}</strong>
              </div>
              <div className={styles.confirmationSummaryRow}>
                <span style={{ color: 'var(--era-text-muted)' }}>Contact Mobile:</span>
                <span>{formData.phone}</span>
              </div>
              <div className={styles.confirmationSummaryRow}>
                <span style={{ color: 'var(--era-text-muted)' }}>Email:</span>
                <span>{formData.email}</span>
              </div>
              {selectedPassDetails && (
                <>
                  <div className={styles.confirmationSummaryRow}>
                    <span style={{ color: 'var(--era-text-muted)' }}>Early Bird Cost (Est):</span>
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

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${ERA27_CONTACTS.whatsappNumber}?text=${encodeURIComponent(
                  `Hi Advara team, I registered pre-booking interest for ERA 27 (Ref: ${referenceCode}). Name: ${formData.fullName}, Pass: ${formData.passType}, Qty: ${formData.quantity}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
                style={{ fontSize: '12px', padding: '12px 24px' }}
              >
                Send via WhatsApp ↗
              </a>
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={handleReset}
                style={{ fontSize: '12px', padding: '12px 24px' }}
              >
                Submit Another Enquiry
              </button>
            </div>

            <p className={styles.demoNotice}>
              ℹ️ <b>Frontend Only Demonstration:</b> No payment was collected and no external server transaction was executed.
            </p>
          </div>
        ) : (
          /* Pre-Booking Form */
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
                    setFormData({ ...formData, quantity: Math.max(1, parseInt(e.target.value, 10) || 1) })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Estimated Early Bird Price (10% Off)
                </label>
                <div
                  style={{
                    background: 'rgba(6, 7, 19, 0.5)',
                    border: '1px solid var(--era-border-glass)',
                    borderRadius: '8px',
                    padding: '14px 16px',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--era-pink)',
                  }}
                >
                  ₹{estimatedTotal.toLocaleString('en-IN')}{' '}
                  <span style={{ fontSize: '11px', color: 'var(--era-text-muted)', fontWeight: 400 }}>
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
                  rows={3}
                  placeholder="Planning a proposal, large group celebration, or custom dietary requests? Let us know here."
                  className={styles.formTextarea}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.formDisclaimerNotice}>
              🔒 <b>Privacy &amp; Policy:</b> Your details are collected strictly to reserve your early-bird spot. No online payment is processed at this stage. Official pass collection and ticketing will open prior to the event.
            </div>

            <div style={{ textAlign: 'center' }}>
              <button type="submit" className={styles.btnPrimary} style={{ width: '100%', maxWidth: '380px' }}>
                Register Pre-Booking Interest (10% Off) ↗
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

