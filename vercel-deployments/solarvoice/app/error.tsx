'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="flex flex-col items-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Something went wrong!
          </h1>
          <p className="mt-4 text-base text-muted-foreground text-center max-w-md">
            We apologize for the inconvenience. An error occurred while processing your request.
          </p>
          <div className="mt-8 flex space-x-3">
            <Button onClick={() => reset()}>
              Try again
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Go home
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
