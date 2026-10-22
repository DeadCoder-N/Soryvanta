import NextAuth from 'next-auth'
import { authConfig } from '@marketing-os/shared'

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
