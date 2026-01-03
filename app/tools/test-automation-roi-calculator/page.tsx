import siteMetadata from '@/data/siteMetadata'
import TestAutomationROICalculator from '@/components/TestAutomationROICalculator'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Test Automation ROI Calculator - ${siteMetadata.author}`,
  description:
    'Make data-driven decisions about test automation investments with our ROI calculator',
}

export default function TestAutomationROICalculatorPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Test Automation ROI Calculator
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Make data-driven decisions about test automation investments
        </p>
      </div>
      <div className="container py-12">
        <TestAutomationROICalculator />
      </div>
    </div>
  )
}
