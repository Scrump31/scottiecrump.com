import Link from '@/components/Link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="space-y-6 max-w-2xl px-4">
        <div className="space-y-3">
          <h1 className="text-8xl font-extrabold text-gray-900 dark:text-gray-100 md:text-9xl">
            404
          </h1>
          <div className="h-1 w-24 bg-primary-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 md:text-3xl">
            Test Failed: Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Looks like this endpoint returned a 404. The resource you're looking for doesn't exist
            or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/">
            <button className="px-6 py-3 text-base font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 dark:hover:bg-primary-400 transition-colors duration-200 shadow-md hover:shadow-lg">
              Back to Home
            </button>
          </Link>
          <Link href="/blog">
            <button className="px-6 py-3 text-base font-medium text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 shadow-md hover:shadow-lg">
              View Blog Posts
            </button>
          </Link>
        </div>

        <div className="pt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Need help? Check out my testing resources or get in touch.</p>
        </div>
      </div>
    </div>
  )
}
