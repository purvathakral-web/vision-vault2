import './FormInput.css'

// One reusable field: label + input (or select) + error message.
// Every form in the app uses this, so validation looks the same everywhere.
//   as        : "input" (default) or "select"
//   hideLabel : keeps the label for screen readers but hides it visually
function FormInput({ label, name, as = 'input', error, hideLabel = false, className = '', children, ...rest }) {
  const Field = as
  const id = `field-${name}`

  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={id} className={hideLabel ? 'sr-only' : ''}>{label}</label>
      <Field
        id={id}
        name={name}
        className={error ? 'input-error' : ''}
        aria-invalid={error ? 'true' : 'false'}
        {...rest}
      >
        {children}
      </Field>
      {error && <p className="field-error" role="alert">{error}</p>}
    </div>
  )
}

export default FormInput
