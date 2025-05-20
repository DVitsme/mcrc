'use client'

/**
 * ToastHandler Component
 * 
 * A client-side component that handles toast notifications triggered by URL parameters.
 * This component is used to display toast messages that are passed through URL parameters,
 * typically from server-side redirects (like middleware) to provide feedback to users.
 * 
 * The component reads two URL parameters:
 * - toast: The message to display
 * - toastType: The type of toast (success, error, warning, or info)
 */

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export function ToastHandler() {
  // Get the current URL search parameters
  const searchParams = useSearchParams()

  useEffect(() => {
    // Extract toast message and type from URL parameters
    const toastMessage = searchParams.get('toast')
    const toastType = searchParams.get('toastType') || 'info'

    // If there's a toast message, display it with the appropriate type
    if (toastMessage) {
      switch (toastType) {
        case 'success':
          toast.success(toastMessage)
          break
        case 'error':
          toast.error(toastMessage)
          break
        case 'warning':
          toast.warning(toastMessage)
          break
        default:
          toast.info(toastMessage)
      }
    }
  }, [searchParams]) // Re-run effect when search parameters change

  // This component doesn't render anything visible
  return null
} 