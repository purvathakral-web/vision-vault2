import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput.jsx'
import useForm from '../hooks/useForm.js'
import { useAuth } from '../context/AuthContext.jsx'
import { isBlank, isEmail } from '../utils/validators.js'
import './Auth.css'

function validate(values) {
  const errors = {}
  if (isBlank(values.name)) errors.name = 'Full name is required.'
  else if (values.name.trim().length < 2) errors.name = 'Name is too short.'
  if (isBlank(values.college)) errors.college = 'College is required.'
  if (isBlank(values.branch)) errors.branch = 'Branch and year are required.'
  if (isBlank(values.email)) errors.email = 'Email is required.'
  else if (!isEmail(values.email)) errors.email = 'Enter a valid email address.'
  if (!values.password) errors.password = 'Password is required.'
  else if (values.password.length < 6) errors.password = 'Use at least 6 characters.'
  if (!values.confirm) errors.confirm = 'Please confirm your password.'
  else if (values.confirm !== values.password) errors.confirm = 'Passwords do not match.'
  return errors
}

function Signup() {
  const { user, signup } = useAuth()
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState('')
  const [loading, setLoading] = useState(false)
  const form = useForm(
    { name: '', college: '', branch: '', email: '', password: '', confirm: '' },
    validate
  )

  if (user) return <Navigate to="/dashboard" replace />

  async function submit(values) {
    setSubmitError('')
    setLoading(true)
    const result = await signup(values)
    setLoading(false)
    if (!result.ok) {
      setSubmitError(result.error)
      return
    }
    navigate('/dashboard', { replace: true })
  }

  // every field needs the same 4 props, so build them in one place
  const field = (name) => ({
    name,
    value: form.values[name],
    onChange: form.handleChange,
    onBlur: form.handleBlur,
    error: form.errors[name],
  })

  return (
    <div className="container auth-page">
      <div className="card auth-card">
        <h1>Create your account</h1>
        <p className="margin-note">your goals, your progress, only yours</p>

        <form className="auth-form" onSubmit={form.handleSubmit(submit)} noValidate>
          <FormInput label="Full name" {...field('name')} />
          <FormInput label="College" {...field('college')} />
          <FormInput label="Branch & year" placeholder="e.g. CSE, 2nd Year" {...field('branch')} />
          <FormInput label="Email" type="email" {...field('email')} />
          <FormInput label="Password" type="password" {...field('password')} />
          <FormInput label="Confirm password" type="password" {...field('confirm')} />

          {submitError && <div className="auth-error" role="alert">{submitError}</div>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
