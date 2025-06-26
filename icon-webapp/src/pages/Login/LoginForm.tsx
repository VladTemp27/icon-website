"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AlertCircle } from "lucide-react"
import "./LoginForm.css"

const loginSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    setError(null)

    try {
      // This is where you would normally make an API call to authenticate
      // For demo purposes, we're simulating a login check
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Demo validation - in a real app, this would be handled by your auth API
      if (data.username === "admin" && data.password === "password") {
        // Navigate to dashboard or set authenticated state
        window.location.href = "/dashboard"
      } else {
        setError("Invalid username or password. Please try again.")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="form-container">
      {error && (
        <div className="error-alert">
          <AlertCircle className="error-icon" />
          <div className="error-message">{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className={`form-input ${errors.username ? "input-error" : ""}`}
            {...register("username")}
          />
          {errors.username && <p className="error-text">{errors.username.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className={`form-input ${errors.password ? "input-error" : ""}`}
            {...register("password")}
          />
          {errors.password && <p className="error-text">{errors.password.message}</p>}
        </div>

        <div className="form-options">
          <div className="remember-me">
            <input id="remember-me" name="remember-me" type="checkbox" className="checkbox" />
            <label htmlFor="remember-me" className="checkbox-label">
              Remember me
            </label>
          </div>

          <div className="forgot-password">
            <a href="#" className="forgot-link">
              Forgot your password?
            </a>
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  )
}
