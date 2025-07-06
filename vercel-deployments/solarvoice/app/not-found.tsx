"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-primary sm:text-5xl">404</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Page not found
              </h1>
              <p className="mt-1 text-base text-muted-foreground">
                Sorry, we couldn't find the page you're looking for.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link href="/">
                <Button>
                  <Home className="mr-2 h-4 w-4" />
                  Go home
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go back
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
