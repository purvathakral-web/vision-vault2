import { useState } from 'react'

// Reusable form hook (controlled inputs + validation).
//   initialValues : starting values, e.g. { email: '', password: '' }
//   validate      : function(values) -> object with an error message for each bad field
//
// Strategy: validate a field when the user leaves it (blur), re-check it while
// typing once it has been touched, and validate everything again on submit.
function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)
    if (touched[name]) {
      setErrors({ ...errors, [name]: validate(nextValues)[name] })
    }
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched({ ...touched, [name]: true })
    setErrors({ ...errors, [name]: validate(values)[name] })
  }

  // returns the real onSubmit handler; onValid runs only if there are no errors
  function handleSubmit(onValid) {
    return (e) => {
      e.preventDefault()
      const allErrors = validate(values)
      setErrors(allErrors)
      setTouched(Object.fromEntries(Object.keys(values).map((name) => [name, true])))
      if (Object.keys(allErrors).length === 0) onValid(values)
    }
  }

  function reset() {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return { values, errors, handleChange, handleBlur, handleSubmit, reset }
}

export default useForm
