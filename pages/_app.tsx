import { AppProps } from 'next/app'

import '@/css/tailwind.css'
import { datadogRum } from '@datadog/browser-rum'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'

export default function App({ Component, pageProps }: AppProps) {
  datadogRum.init({
    applicationId: process.env.NEXT_PUBLIC_DD_APPLICATION_ID ?? '',
    clientToken: process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN ?? '',
    site: process.env.NEXT_PUBLIC_DD_SITE,
    service: process.env.NEXT_PUBLIC_DD_SERVICE,
    env: 'prod',
    version: '3.0.2',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
  })

  return (
    // @ts-ignore
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Analytics />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
