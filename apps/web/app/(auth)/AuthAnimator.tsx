'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function AuthAnimator({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [displayed, setDisplayed] = useState(children)
  const [animClass, setAnimClass] = useState('')
  const prevPath = useRef(pathname)
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return }
    if (pathname === prevPath.current) return

    // login → register: slide left; register → login: slide right
    const goingToRegister = pathname === '/register'
    const exitClass = goingToRegister ? 'auth-slide-exit-left' : 'auth-slide-exit-right'
    const enterClass = goingToRegister ? 'auth-slide-enter-right' : 'auth-slide-enter-left'

    setAnimClass(exitClass)
    const t1 = setTimeout(() => {
      setDisplayed(children)
      setAnimClass(enterClass)
      prevPath.current = pathname
    }, 220)
    const t2 = setTimeout(() => setAnimClass(''), 420)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Keep displayed in sync when no animation needed
  useEffect(() => {
    if (!animClass) setDisplayed(children)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children])

  return (
    <>
      <style>{`
        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(48px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInFromLeft {
          from { opacity: 0; transform: translateX(-48px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutToLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-48px); }
        }
        @keyframes slideOutToRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(48px); }
        }
        .auth-slide-exit-left  { animation: slideOutToLeft  0.22s ease forwards; }
        .auth-slide-exit-right { animation: slideOutToRight 0.22s ease forwards; }
        .auth-slide-enter-right { animation: slideInFromRight 0.22s ease forwards; }
        .auth-slide-enter-left  { animation: slideInFromLeft  0.22s ease forwards; }
      `}</style>
      <div className={animClass} style={{ width: '100%' }}>
        {displayed}
      </div>
    </>
  )
}
