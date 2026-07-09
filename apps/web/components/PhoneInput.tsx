'use client'

import { useState } from 'react'

export const COUNTRY_CODES = [
  { code: '+91', country: 'IN', flag: '🇮🇳', label: 'India' },
  { code: '+1', country: 'US', flag: '🇺🇸', label: 'United States' },
  { code: '+1', country: 'CA', flag: '🇨🇦', label: 'Canada' },
  { code: '+44', country: 'GB', flag: '🇬🇧', label: 'United Kingdom' },
  { code: '+971', country: 'AE', flag: '🇦🇪', label: 'UAE' },
  { code: '+65', country: 'SG', flag: '🇸🇬', label: 'Singapore' },
  { code: '+61', country: 'AU', flag: '🇦🇺', label: 'Australia' },
  { code: '+966', country: 'SA', flag: '🇸🇦', label: 'Saudi Arabia' },
  { code: '+974', country: 'QA', flag: '🇶🇦', label: 'Qatar' },
  { code: '+968', country: 'OM', flag: '🇴🇲', label: 'Oman' },
  { code: '+965', country: 'KW', flag: '🇰🇼', label: 'Kuwait' },
  { code: '+973', country: 'BH', flag: '🇧🇭', label: 'Bahrain' },
]

// Deduplicate by code (handles US/CA same code scenario)
const UNIQUE_CODES = COUNTRY_CODES.reduce<typeof COUNTRY_CODES>((acc, curr) => {
  const exists = acc.find(c => c.code === curr.code && c.country === curr.country)
  if (!exists) acc.push(curr)
  return acc
}, [])

export type PhoneInputValue = {
  countryCode: string
  phone: string
}

export function getFullPhone(value: PhoneInputValue): string {
  const digits = value.phone.replace(/\D/g, '')
  const code = value.countryCode.replace(/\D/g, '')
  return `${code}${digits}`
}

export function getDisplayPhone(value: PhoneInputValue): string {
  const full = getFullPhone(value)
  if (full.length > 8) {
    return `${full.slice(0, -8)} ${full.slice(-8, -4)} ${full.slice(-4)}`
  }
  return full
}

export function validatePhone(value: PhoneInputValue): string | null {
  const digits = value.phone.replace(/\D/g, '')
  if (!digits) return 'Phone number is required'
  if (digits.length < 7 || digits.length > 15) return 'Enter a valid phone number (7-15 digits)'
  return null
}

type PhoneInputProps = {
  value: PhoneInputValue
  onChange: (value: PhoneInputValue) => void
  error?: string | null
  required?: boolean
  placeholder?: string
  label?: string
  disabled?: boolean
}

export default function PhoneInput({
  value,
  onChange,
  error,
  required = true,
  placeholder = 'Phone Number',
  label,
  disabled = false,
}: PhoneInputProps) {
  const [open, setOpen] = useState(false)
  const selected = UNIQUE_CODES.find(c => c.code === value.countryCode) || UNIQUE_CODES[0]

  return (
    <div>
      {label && (
        <label style={{
          fontSize: '0.7rem', color: 'var(--text-secondary)',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          display: 'block', marginBottom: '8px',
        }}>
          {label}
        </label>
      )}
      <div style={{ display: 'flex', gap: '8px', position: 'relative' }}>
        {/* Country Code Dropdown Trigger */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            disabled={disabled}
            style={{
              padding: '12px 10px',
              background: 'var(--surface-2, #161412)',
              border: error ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(201,168,76,0.15)',
              borderRadius: '8px',
              color: '#F0EBE0',
              fontSize: '14px',
              cursor: disabled ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              minWidth: '80px',
              fontFamily: "'DM Sans', sans-serif",
              opacity: disabled ? 0.45 : 1,
            }}
            aria-label="Select country code"
          >
            <span style={{ fontSize: '18px', lineHeight: 1 }}>{selected.flag}</span>
            <span style={{ color: '#C9A84C' }}>{value.countryCode}</span>
            <span style={{ fontSize: '8px', color: '#6B5E45', marginLeft: '2px' }}>▼</span>
          </button>

          {/* Dropdown */}
          {open && (
            <>
              <div
                onClick={() => setOpen(false)}
                style={{ position: 'fixed', inset: 0, zIndex: 49 }}
              />
              <div style={{
                position: 'absolute', top: '100%', left: 0, marginTop: '4px',
                background: 'var(--surface-1, #0F0E0C)',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: '8px',
                padding: '6px',
                zIndex: 50,
                minWidth: '200px',
                maxHeight: '280px',
                overflowY: 'auto',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              }}>
                {UNIQUE_CODES.map((c) => (
                  <button
                    key={`${c.country}-${c.code}`}
                    type="button"
                    onClick={() => {
                      onChange({ ...value, countryCode: c.code })
                      setOpen(false)
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      width: '100%',
                      background: c.code === value.countryCode ? 'rgba(201,168,76,0.08)' : 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      color: c.code === value.countryCode ? '#C9A84C' : '#F0EBE0',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontFamily: "'DM Sans', sans-serif",
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>{c.flag}</span>
                    <span style={{ flex: 1 }}>{c.label}</span>
                    <span style={{ color: '#6B5E45', fontSize: '12px' }}>{c.code}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Phone Input */}
        <input
          type="tel"
          inputMode="numeric"
          value={value.phone}
          onChange={e => onChange({ ...value, phone: e.target.value.replace(/[^0-9]/g, '') })}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-label="Phone number"
          style={{
            flex: 1,
            padding: '12px',
            background: 'var(--surface-2, #161412)',
            border: error ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(201,168,76,0.15)',
            borderRadius: '8px',
            color: disabled ? '#6B5E45' : '#F0EBE0',
            fontSize: '14px',
            fontFamily: "'DM Sans', sans-serif",
            outline: 'none',
            transition: 'border-color 0.2s',
            opacity: disabled ? 0.45 : 1,
          }}
        />
      </div>

      {error && (
        <p style={{
          fontSize: '0.72rem', color: '#f87171', marginTop: '6px',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          <span>⚠</span> {error}
        </p>
      )}

      {!error && value.phone && (
        <p style={{
          fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px',
        }}>
          Full number: <strong style={{ color: 'var(--text-secondary)' }}>{getFullPhone(value)}</strong>
        </p>
      )}
    </div>
  )
}