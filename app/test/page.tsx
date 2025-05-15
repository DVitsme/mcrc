'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestPage() {
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const testConnection = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/supabase-test')
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ success: false, message: String(error) })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Supabase Connection Test</CardTitle>
          <CardDescription>Test if your app is connected to Supabase</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={testConnection}
            disabled={isLoading}
            className="w-full mb-4"
          >
            {isLoading ? 'Testing...' : 'Test Connection'}
          </Button>

          {result && (
            <div className={`p-4 rounded-md ${result.success ? 'bg-green-100' : 'bg-red-100'}`}>
              <p className="font-medium">{result.success ? 'Success!' : 'Failed!'}</p>
              <p>{result.message}</p>
              {result.error && <p className="text-red-500">{result.error}</p>}
              {result.version && <p className="text-sm mt-2">Supabase version: {result.version}</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 