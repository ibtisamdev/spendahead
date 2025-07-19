"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle, DollarSign, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email")
      return
    }

    setError("")
    setIsLoading(true)

    // TODO: Replace with server action
    // const success = await resetPasswordAction(email)

    // For now, simulate the action
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-t-lg">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">SpendAhead</span>
          </div>
          <CardTitle className="text-2xl">Check Your Email</CardTitle>
          <p className="text-emerald-100">We've sent you a password reset link</p>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-emerald-500" />
          </div>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to <strong>{email}</strong>.
            Please check your email and click the link to reset your password.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => {
                setIsSuccess(false)
                setEmail("")
              }}
              variant="outline"
              className="w-full"
            >
              Send another email
            </Button>
            <Link href="/auth/login">
              <Button variant="ghost" className="w-full">
                Back to login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md shadow-2xl border-0">
      <CardHeader className="text-center bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-t-lg">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <DollarSign className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold">SpendAhead</span>
        </div>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <p className="text-emerald-100">Enter your email to receive a reset link</p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={error ? "border-red-500" : ""}
            />
            {error && (
              <p className="text-xs text-red-500">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending reset link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>

          <div className="text-center">
            <Link href="/auth/login" className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 