/**
 * Public contact email addresses.
 *
 * All read from the deployment environment with the previously-hard-coded
 * values kept as documented fallbacks, so nothing breaks and operators can
 * reconfigure without touching source. No former-brand address is hard-coded
 * here; set the NEXT_PUBLIC_*_EMAIL variables in deployment.
 */
export function getContactEmails() {
  const support = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@marketingos.in'
  const privacy = process.env.NEXT_PUBLIC_PRIVACY_EMAIL || 'privacy@marketingos.in'
  const legal = process.env.NEXT_PUBLIC_LEGAL_EMAIL || 'legal@marketingos.in'
  const security = process.env.NEXT_PUBLIC_SECURITY_EMAIL || 'security@marketingos.in'
  const hello = process.env.NEXT_PUBLIC_HELLO_EMAIL || 'hello@marketingos.in'
  const sales = process.env.NEXT_PUBLIC_SALES_EMAIL || 'sales@marketingos.in'
  return { support, privacy, legal, security, hello, sales }
}