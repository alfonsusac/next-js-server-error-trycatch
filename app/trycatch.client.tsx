'use client'

import { createContext, useContext, useState } from "react"
import { useErrorBoundary } from "react-error-boundary"

const ErrorContext = createContext("Serverside Error Occured")

export const useError = () => useContext(ErrorContext)

export default function ErrorClientActionRunner(p: {
  initialError: string
  fallback: React.ReactNode
}) {
  return (
    <ErrorContext.Provider value={p.initialError}>
      {p.fallback}
    </ErrorContext.Provider>
  )
}

// ---------

export function ErrorMessage() {
  const error = useError()
  return (
    <div>
      Error occurred. I wonder why this happens
      <span style={ { opacity: 0.3 } }>{ error }</span>
    </div>
  )
}