// Small reusable checks. Each form's validate() function combines them.
export const isBlank = (value) => !value || !value.trim()
export const isEmail = (value) => /^\S+@\S+\.\S+$/.test(value)
export const isUrl = (value) => /^https?:\/\/\S+\.\S+/.test(value)
