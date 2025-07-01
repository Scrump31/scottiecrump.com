import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import TestAutomationCalculator from '@/components/TestAutomationCalculator'

export default function TestAutomationCalculatorPage() {
  return (
    <>
      <PageSEO
        title={`Test Automation Decision Calculator - ${siteMetadata.author}`}
        description="Make data-driven decisions about what to automate based on risk, ROI, and team capacity"
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Test Automation Decision Calculator
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Make data-driven decisions about what to automate based on risk, ROI, and team capacity
          </p>
        </div>
        <div className="container py-12">
          <TestAutomationCalculator />
        </div>
      </div>
    </>
  )
}
