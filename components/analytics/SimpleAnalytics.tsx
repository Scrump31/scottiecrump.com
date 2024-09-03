import Script from 'next/script'

const SimpleAnalyticsScript = () => {
  return (
    <>
      <Script strategy="lazyOnload" id="simple-analytics-script">
        {`
            window.sa_event=window.sa_event||function(){var a=[].slice.call(arguments);window.sa_event.q?window.sa_event.q.push(a):window.sa_event.q=[a]};
        `}
      </Script>
      <Script
        strategy="lazyOnload"
        id="simple-analytics-script"
        src="https://scripts.simpleanalyticscdn.com/latest.js"
      />
    </>
  )
}

export default SimpleAnalyticsScript
