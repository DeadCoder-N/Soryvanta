import NextAuth from 'next-auth'
import { authConfig } from '@brisvora/shared'

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
