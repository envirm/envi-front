"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { seedDatabase } from "@/lib/seed-data"

export default function SeedPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; error?: any } | null>(null)

  const handleSeed = async () => {
    setIsLoading(true)
    try {
      const result = await seedDatabase()
      setResult(result)
    } catch (error) {
      setResult({ success: false, error })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Seed Database</CardTitle>
          <CardDescription>Populate the database with sample data for the security monitoring system.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This will create sample users, access logs, shift logs, and security warnings in the database.
          </p>

          {result && (
            <div
              className={`p-4 rounded-md ${result.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {result.success ? (
                <p>Database seeded successfully!</p>
              ) : (
                <div>
                  <p>Error seeding database:</p>
                  <pre className="text-xs mt-2 overflow-auto">{JSON.stringify(result.error, null, 2)}</pre>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSeed} disabled={isLoading} className="w-full">
            {isLoading ? "Seeding..." : "Seed Database"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
