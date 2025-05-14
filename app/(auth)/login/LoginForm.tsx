"use client"
import type React from "react"

import { useActionState } from "react"
import styles from "./login.module.css"
import Link from "next/link"
import { login } from "./actions"
import { useFormStatus } from "react-dom"

const LoginForm = () => {
  const [state, loginAction] = useActionState(login, undefined);


  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <span>Stafframe</span>
          </div>
        </div>

        <h1 className={styles.title}>Sign in to your account</h1>
        <p className={styles.subtitle}>Welcome back! Please enter your details.</p>

        <form action={loginAction} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>
          {state?.errors?.email && (
            <p className={styles.error}>{state.errors.email}</p>
          )}

          <div className={styles.formGroup}>
            <div className={styles.passwordHeader}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <Link href="/forgot-password" className={styles.forgotPassword}>
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              placeholder="Enter your password"
              required
            />
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  )
}

function SubmitButton() {
    const {pending} = useFormStatus();
    return (
        <button disabled={pending} type="submit" className={styles.loginButton}>
            Login
        </button>
    )
}

export default LoginForm