import React from 'react'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

export const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid var(--linen-dk)',
  background: 'var(--linen)',
  color: 'var(--ink)',
  padding: '13px 16px',
  fontSize: '0.875rem',
  transition: 'border-color 0.2s',
}

export function InputField({ label, hint, error, ...props }: InputFieldProps) {
  return (
    <div>
      {label && (
        <label style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
          {label}
        </label>
      )}
      <input
        {...props}
        style={inputStyle}
        onFocus={e => (e.target.style.borderColor = 'var(--mauve)')}
        onBlur={e => (e.target.style.borderColor = 'var(--linen-dk)')}
      />
      {hint && <p style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', marginTop: '6px' }}>{hint}</p>}
      {error && <p style={{ fontSize: '0.72rem', color: 'var(--gold)', marginTop: '6px' }}>{error}</p>}
    </div>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  variant?: 'dark' | 'gold'
}

export function Button({ loading, variant = 'dark', children, disabled, ...props }: ButtonProps) {
  const bg = variant === 'gold' ? 'var(--logo-gold)' : (loading || disabled) ? 'var(--linen-dk)' : 'var(--ink)'
  return (
    <button
      {...props}
      disabled={loading || disabled}
      style={{
        background: bg,
        color: 'var(--warm-white)',
        padding: '14px',
        fontSize: '0.72rem',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        border: 'none',
        cursor: (loading || disabled) ? 'not-allowed' : 'pointer',
        opacity: (loading || disabled) ? 0.7 : 1,
        width: '100%',
        ...props.style,
      }}
    >
      {children}
    </button>
  )
}
