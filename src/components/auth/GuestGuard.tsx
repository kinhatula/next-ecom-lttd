/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useRouter } from 'next/router'
import { ReactNode, ReactElement, useEffect } from 'react'
import { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'
// ** Hook

import { useAuth } from 'src/hooks/useAuth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  const router = useRouter()
  const authContext = useAuth()
  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (
      authContext.user === null &&
      window.localStorage.getItem(ACCESS_TOKEN) &&
      window.localStorage.getItem(USER_DATA)
    ) {
      router.replace('/')
    }
  }, [router.route])
  if (authContext.loading) {
    return fallback
  }
  return <>{children}</>
}

export default GuestGuard
