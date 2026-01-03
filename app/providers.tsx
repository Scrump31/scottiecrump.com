'use client'

import { datadogRum } from '@datadog/browser-rum'
import { ThemeProvider } from 'next-themes'
import { ReactNode, useEffect } from 'react'

export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  useEffect(() => {
    datadogRum.init({
      applicationId: process.env.NEXT_PUBLIC_DD_APPLICATION_ID ?? '',
      clientToken: process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN ?? '',
      site: process.env.NEXT_PUBLIC_DD_SITE,
      service: process.env.NEXT_PUBLIC_DD_SERVICE,
      env: process.env.NODE_ENV,
      version: '3.0.2',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: 'mask-user-input',
    })
  }, [])

  return (
    // @ts-ignore
    <ThemeProvider attribute="class">{children}</ThemeProvider>
  )
}
