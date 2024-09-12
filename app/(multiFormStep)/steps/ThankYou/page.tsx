import { CheckCircleIcon } from '@heroicons/react/24/solid'

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-violet-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-violet-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Thank You!
          </h2>
          <p className="mt-2 text-sm text-violet-600">
            Your form has been successfully submitted.
          </p>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <p className="text-center text-gray-700">
              We appreciate you taking the time to complete our form. Your input is valuable to us.
            </p>
          </div>
        </div>
        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  )
}