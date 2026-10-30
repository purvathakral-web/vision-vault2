import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput.jsx'
import useForm from '../hooks/useForm.js'
import { useAuth } from '../context/AuthContext.jsx'
import { isBlank, isEmail } from '../utils/validators.js'
import './Auth.css'

function validate(values) {
  const errors = {}
  if (isBlank(values.email)) errors.email = 'Email is required.'
  else if (!isEmail(values.email)) errors.email = 'Enter a valid email address.'
  if (isBlank(values.password)) errors.password = 'Password is required.'
  return errors
}

function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [submitError, setSubmitError] = useState('')
  const [loading, setLoading] = useState(false)
  const form = useForm({ email: '', password: '' }, validate)

  // send the student back to the page they originally wanted (set by ProtectedRoute)
  const redirectTo = location.state?.from?.pathname || '/dashboard'

  // already logged in? no need to see the login page
  if (user) return <Navigate to={redirectTo} replace />

  async function submit(values) {
    setSubmitError('')
    setLoading(true)
    const result = await login(values.email, values.password)
    setLoading(false)
    if (!result.ok) {
      setSubmitError(result.error)
      return
    }
    navigate(redirectTo, { replace: true })
  }

  return (
    <div className="container auth-page">
      <div className="card auth-card">
        <h1>Welcome back</h1>
        <p className="margin-note">log in to see your own progress</p>

        <form className="auth-form" onSubmit={form.handleSubmit(submit)} noValidate>
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="you@college.edu"
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.errors.email}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={form.values.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.errors.password}
          />

          {submitError && <div className="auth-error" role="alert">{submitError}</div>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
