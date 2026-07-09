'use client';

import React, { useState } from "react";

interface LeadFormProps {
  propertyId: string;
  onSent?: () => void;
}

const COUNTRIES = [
  { code: 'IN', dial: '+91', flag: '🇮🇳', name: 'India' },
  { code: 'US', dial: '+1', flag: '🇺🇸', name: 'United States' },
  { code: 'GB', dial: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'AE', dial: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: 'SG', dial: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: 'CA', dial: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: 'AU', dial: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: 'NZ', dial: '+64', flag: '🇳🇿', name: 'New Zealand' },
  { code: 'ZA', dial: '+27', flag: '🇿🇦', name: 'South Africa' },
  { code: 'NG', dial: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: 'QA', dial: '+974', flag: '🇶🇦', name: 'Qatar' },
  { code: 'SA', dial: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
];

export default function LeadForm({ propertyId, onSent }: LeadFormProps) {
  const [name, setName] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("IN");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; message?: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [focusName, setFocusName] = useState<boolean>(false);
  const [focusPhone, setFocusPhone] = useState<boolean>(false);
  const [focusCountry, setFocusCountry] = useState<boolean>(false);
  const [focusMessage, setFocusMessage] = useState<boolean>(false);

  const tokenCount = message.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const newErrors: { name?: string; phone?: string; message?: string } = {};
    if (!name.trim()) {
      newErrors.name = "Full name is required.";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }
    if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const country = COUNTRIES.find((c) => c.code === countryCode);
      const dial = country ? country.dial : "";
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId,
          name,
          phone: `${dial}${phone}`,
          message,
          source: "web",
          countryCode,
          tokenCount: tokenCount,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setLoading(false);
      setSuccess(true);
      setTimeout(() => onSent?.(), 2000);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  if (success) {
    return (
      <div style={{ textAlign: "center", padding: "20px 0", color: "#fff" }}>
        <svg width="72" height="72" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ margin: "0 auto", display: "block" }}>
          <circle cx="26" cy="26" r="25" stroke="#4ade80" strokeWidth="2" fill="none" pathLength="1" strokeDasharray="1" strokeDashoffset="1">
            <animate attributeName="stroke-dashoffset" from="1" to="0" dur="0.5s" fill="freeze" />
          </circle>
          <path d="M14 27 L22 35 L38 19" stroke="#4ade80" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset="1">
            <animate attributeName="stroke-dashoffset" from="1" to="0" dur="0.3s" begin="0.5s" fill="freeze" />
          </path>
        </svg>
        <div style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", marginTop: "12px" }}>Thank you</div>
      </div>
    );
  }

  return (
    <form role="form" aria-label="Property enquiry form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", backgroundColor: "#111", color: "#fff" }}>
      <div>
        <label htmlFor="name" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", marginBottom: "4px" }}>
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setFocusName(true)}
          onBlur={() => setFocusName(false)}
          autoComplete="name"
          aria-required="true"
          aria-label="Full Name"
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "8px",
            fontSize: "0.88rem",
            fontFamily: "DM Sans, sans-serif",
            backgroundColor: "#1a1a1a",
            color: "#fff",
            border: `1px solid ${errors.name ? "#f87171" : (focusName ? "#C9A84C" : "#ffffff1f")}`,
          }}
        />
        {errors.name && <div style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "4px" }}>{errors.name}</div>}
      </div>
      <div>
        <label htmlFor="phone" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", marginBottom: "4px" }}>
          Phone Number
        </label>
        <div style={{ display: "flex", alignItems: "center", border: `1px solid ${errors.phone ? "#f87171" : (focusPhone || focusCountry ? "#C9A84C" : "#ffffff1f")}`, borderRadius: "8px", overflow: "hidden", backgroundColor: "#1a1a1a" }}>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            onFocus={() => setFocusCountry(true)}
            onBlur={() => setFocusCountry(false)}
            aria-label="Country Code"
            style={{ outline: "none", border: "none", backgroundColor: "#1a1a1a", color: "#fff", padding: "14px 8px", fontSize: "0.88rem", fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.dial}
              </option>
            ))}
          </select>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            onFocus={() => setFocusPhone(true)}
            onBlur={() => setFocusPhone(false)}
            autoComplete="tel"
            inputMode="tel"
            aria-required="true"
            aria-label="Phone number"
            style={{
              flex: 1,
              padding: "14px 16px",
              border: "none",
              fontSize: "0.88rem",
              fontFamily: "DM Sans, sans-serif",
              backgroundColor: "#1a1a1a",
              color: "#fff",
            }}
          />
        </div>
        {errors.phone && <div style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "4px" }}>{errors.phone}</div>}
      </div>
      <div>
        <label htmlFor="message" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", marginBottom: "4px" }}>
          Message / Enquiry
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setFocusMessage(true)}
          onBlur={() => setFocusMessage(false)}
          rows={4}
          maxLength={500}
          aria-required="true"
          aria-label="Message"
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "8px",
            fontSize: "0.88rem",
            fontFamily: "DM Sans, sans-serif",
            backgroundColor: "#1a1a1a",
            color: "#fff",
            border: `1px solid ${errors.message ? "#f87171" : (focusMessage ? "#C9A84C" : "#ffffff1f")}`,
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
          <div style={{ color: errors.message ? "#f87171" : "transparent", fontSize: "0.75rem" }}>{errors.message || " "}</div>
          <div style={{ color: tokenCount >= 490 ? "#f87171" : (tokenCount >= 200 ? "#4ade80" : (tokenCount >= 50 ? "#C9A84C" : "rgba(255,255,255,0.35)")), fontSize: "0.75rem" }}>{tokenCount} / 500</div>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: "30px",
          background: "linear-gradient(90deg, #C9A84C 0%, #E0C779 100%)",
          color: "#000",
          fontFamily: "DM Sans, sans-serif",
          fontWeight: 600,
          fontSize: "0.9rem",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Sending..." : "Submit"}
      </button>
      {submitError && <div style={{ color: "#f87171", fontSize: "0.9rem", textAlign: "center" }}>{submitError}</div>}
    </form>
  );
}