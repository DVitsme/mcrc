'use client'

import { useAuth } from '@/lib/auth-context'

export default function SessionChecker() {
  const { user, session, isLoading } = useAuth()

  return (
    <div className="container mx-auto max-w-7xl p-10">
      <h1 className="text-3xl font-bold mb-6">Session Checker</h1>

      {isLoading ? (
        <p>Loading user status...</p>
      ) : user ? (
        <div className="space-y-4">
          <p className="text-green-600">✅ Active user found</p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-bold mb-2">User Information:</h2>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-bold mb-2">Session Information:</h2>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <p className="text-red-600">❌ No active user</p>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Debug Information:</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="whitespace-pre-wrap">
            {JSON.stringify({
              cookies: document.cookie.split('; ').reduce((acc, cookie) => {
                const [name, value] = cookie.split('=')
                acc[name] = value
                return acc
              }, {} as Record<string, string>),
              hasUser: !!user,
              userId: user?.id,
              userEmail: user?.email,
              sessionExpiresAt: session?.expires_at,
              sessionToken: session?.access_token ? '✓' : '✗'
            }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
} 