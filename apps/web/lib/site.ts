/**
 * Canonical site URL.
 *
 * Reads the deployment-configured host from the environment. No former-brand
 * hostname is hard-coded here. Set `CANONICAL_URL` (preferred) or `NEXTAUTH_URL`
 * in the deployment environment.
 */
export function getCanonicalUrl(): string {
  const raw = process.env.CANONICAL_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000'
  return raw.replace(/\/$/, '')
}

export function getCanonicalHost(): string {
  try {
    return new URL(getCanonicalUrl()).host
  } catch {
    return getCanonicalUrl()
  }
}