'use client'

/* ── Vector SVG icon set — no emojis, pure scalable graphics ── */

type IconProps = { size?: number; className?: string; style?: React.CSSProperties }

function Icon({ children, size = 18, className, style }: IconProps & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className} style={{ flexShrink: 0, ...style }}
      aria-hidden="true">
      {children}
    </svg>
  )
}

export function IcoChart({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M3 17L9 11L13 15L21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 21H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Icon>
  )
}

export function IcoBarChart({ size }: IconProps) {
  return (
    <Icon size={size}>
      <rect x="4" y="14" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="9" width="4" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="16" y="4" width="4" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </Icon>
  )
}

export function IcoEye({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </Icon>
  )
}

export function IcoMessage({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function IcoTarget({ size }: IconProps) {
  return (
    <Icon size={size}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
    </Icon>
  )
}

export function IcoHome({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M3 12L12 3L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10V20C5 20.5523 5.44772 21 6 21H10V15H14V21H18C18.5523 21 19 20.5523 19 20V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function IcoBuilding({ size }: IconProps) {
  return (
    <Icon size={size}>
      <rect x="3" y="10" width="18" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 10V5C7 4.44772 7.44772 4 8 4H16C16.5523 4 17 4.44772 17 5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="9" y="14" width="2" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="13" y="14" width="2" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
    </Icon>
  )
}

export function IcoPlus({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Icon>
  )
}

export function IcoEdit({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M16.5 3.5L20.5 7.5L7.5 20.5L3 21L3.5 16.5L16.5 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 6L18 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Icon>
  )
}

export function IcoTrash({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 11V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 11V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 6L6 20C6.05719 20.5984 6.52811 21 7 21H17C17.4719 21 17.9428 20.5984 18 20L19 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Icon>
  )
}

export function IcoExternalLink({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M18 13V19C18 20.1 17.1 21 16 21H5C3.9 21 3 20.1 3 19V8C3 6.9 3.9 6 5 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Icon>
  )
}

export function IcoWhatsApp({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M3 21L4.5 16.5C3.5 15 3 13.3 3 11.5C3 7.5 7 3.5 12 3.5C17 3.5 21 7.5 21 11.5C21 15.5 17 19.5 12 19.5C10.2 19.5 8.5 19 7 18L3 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 9C9.5 9 9.9 8.2 10 8.5C10.4 9.3 11.5 11.5 12 12C12.5 12.5 13.5 13 14 12.5C14.5 12 15 11.5 15.5 11.5C16 11.5 17 12 17.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Icon>
  )
}

export function IcoPhone({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M22 16.92V19.92C22.0001 20.1985 21.939 20.4731 21.821 20.7243C21.703 20.9754 21.5311 21.1969 21.3181 21.3723C21.105 21.5477 20.8563 21.6727 20.5885 21.7376C20.3207 21.8025 20.0408 21.8055 19.771 21.746C16.7207 21.0857 13.8352 19.7841 11.343 17.9315C9.0764 16.2793 7.21517 14.1481 5.885 11.6605C4.05414 8.68384 3.13351 5.24026 3.023 1.72902C2.97639 1.45774 2.99194 1.17977 3.06828 0.914928C3.14461 0.650091 3.27991 0.405288 3.46392 0.198487C3.64793 -0.00831452 3.87605 -0.171586 4.13207 -0.279188C4.3881 -0.386791 4.66548 -0.436021 4.942 0.423027L7.868 7.29603C8.11893 7.89475 8.19879 8.55076 8.09456 9.18979C7.99033 9.82882 7.70776 10.4416 7.275 10.949L6.643 11.729C8.07596 14.0926 10.1289 16.0256 12.6 17.293L13.356 16.677C13.8571 16.2446 14.4645 15.9589 15.0998 15.8492C15.7351 15.7394 16.3891 15.8106 16.99 16.055L20 17.553C20.642 17.843 21.033 18.392 22 16.92Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function IcoGlobe({ size }: IconProps) {
  return (
    <Icon size={size}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="3" ry="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Icon>
  )
}

export function IcoStar({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function IcoLightbulb({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M9 18H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 21H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 2C8.5 2 6 4.5 6 8C6 10.5 7.5 12.5 9 14V16H15V14C16.5 12.5 18 10.5 18 8C18 4.5 15.5 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function IcoBell({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6945 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3055 21.9044 11.0018 21.7295C10.6981 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function IcoUser({ size }: IconProps) {
  return (
    <Icon size={size}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 21C4 17 7.5 14 12 14C16.5 14 20 17 20 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function IcoSettings({ size }: IconProps) {
  return (
    <Icon size={size}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42001 10.0723 3.74101 9.96512 4.01031 9.77251C4.2796 9.5799 4.4847 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function IcoTrendUp({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 6H23V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function IcoTrendDown({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M23 18L13.5 8.5L8.5 13.5L1 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 18H23V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function IcoClose({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function IcoCheck({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function IcoArrowRight({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function IcoFunnel({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M4 4H20L13 12.5V20L11 18V12.5L4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function IcoPie({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M21 12C21 19 19 21 12 21C5 21 3 19 3 12C3 5 5 3 12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 3V12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function IcoCalendar({ size }: IconProps) {
  return (
    <Icon size={size}>
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Icon>
  )
}

export function IcoList({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M8 6H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 18H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="3" cy="6" r="1" fill="currentColor" />
      <circle cx="3" cy="12" r="1" fill="currentColor" />
      <circle cx="3" cy="18" r="1" fill="currentColor" />
    </Icon>
  )
}

export function IcoRefresh({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M1 4V10H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.51 15C4.15839 16.8404 5.38734 18.4202 7.01166 19.5014C8.63598 20.5826 10.5677 21.1064 12.5157 20.9945C14.4637 20.8826 16.322 20.1404 17.8122 18.8798C19.3024 17.6192 20.3413 15.909 20.94 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 14V20C23 20.5523 22.5523 21 22 21H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function IcoCamera({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5" />
    </Icon>
  )
}

export function IcoWarning({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M10.29 3.86L1.82 18C1.64 18.3 1.55 18.64 1.55 18.99C1.55 19.34 1.64 19.68 1.82 19.98C2 20.28 2.26 20.52 2.57 20.69C2.88 20.85 3.23 20.94 3.58 20.94H20.42C20.77 20.94 21.12 20.85 21.43 20.69C21.74 20.52 22 20.28 22.18 19.98C22.36 19.68 22.45 19.34 22.45 18.99C22.45 18.64 22.36 18.3 22.18 18L13.71 3.86C13.53 3.56 13.27 3.31 12.96 3.14C12.65 2.97 12.3 2.88 11.95 2.88C11.6 2.88 11.25 2.97 10.94 3.14C10.63 3.31 10.37 3.56 10.19 3.86H10.29Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 9V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
    </Icon>
  )
}

export function IcoSparkle({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 4L5.5 6L7 6.5L5.5 7L5 9L4.5 7L3 6.5L4.5 6L5 4Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 14L19.4 15.6L21 16L19.4 16.4L19 18L18.6 16.4L17 16L18.6 15.6L19 14Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function IcoUpload({ size }: IconProps) {
  return (
    <Icon size={size}>
      <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Icon>
  )
}