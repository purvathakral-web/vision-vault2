// Simple front-end-only authentication using localStorage.
// There is no backend, so accounts live in the student's own browser.
// (In a real app this would be a server + database.)

const USERS_KEY = 'vv_users'
const SESSION_KEY = 'vv_session'

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

// We never store the real password — only a SHA-256 hash of it.
async function hashPassword(password) {
  // TextEncoder changes the password text into bytes.
  const encoder = new TextEncoder()
  const passwordBytes = encoder.encode(password)

  // Web Crypto calculates a SHA-256 hash asynchronously.
  const hashBuffer = await crypto.subtle.digest('SHA-256', passwordBytes)
  const hashBytes = new Uint8Array(hashBuffer)

  // Turn each byte into two hexadecimal characters.
  let hashText = ''
  for (let i = 0; i < hashBytes.length; i++) {
    hashText += hashBytes[i].toString(16).padStart(2, '0')
  }
  return hashText
}

export async function signup({ name, email, password, college, branch }) {
  const users = readJSON(USERS_KEY, [])
  const cleanEmail = email.trim().toLowerCase()

  if (users.some((u) => u.email === cleanEmail)) {
    return { ok: false, error: 'An account with this email already exists. Try logging in.' }
  }

  const user = {
    id: 'u' + Date.now(),
    name: name.trim(),
    email: cleanEmail,
    college: college.trim(),
    branch: branch.trim(),
    passwordHash: await hashPassword(password),
  }

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]))
  localStorage.setItem(SESSION_KEY, user.id)
  return { ok: true, user: publicUser(user) }
}

export async function login(email, password) {
  const users = readJSON(USERS_KEY, [])
  const user = users.find((u) => u.email === email.trim().toLowerCase())

  if (!user || user.passwordHash !== (await hashPassword(password))) {
    return { ok: false, error: 'Wrong email or password.' }
  }

  localStorage.setItem(SESSION_KEY, user.id)
  return { ok: true, user: publicUser(user) }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

// Called once when the app starts, so a refresh keeps the student logged in.
export function getSessionUser() {
  const id = localStorage.getItem(SESSION_KEY)
  if (!id) return null
  const user = readJSON(USERS_KEY, []).find((u) => u.id === id)
  return user ? publicUser(user) : null
}

// the password hash should never travel around the app
function publicUser({ passwordHash, ...rest }) {
  return rest
}

// ---------- per-student data ----------
// Every student's data is saved under their own key, e.g. "vv_data_u123_internships".
// That is what makes each student see only their own progress.

export function loadUserData(userId, key, fallback) {
  return readJSON(`vv_data_${userId}_${key}`, fallback)
}

export function saveUserData(userId, key, value) {
  localStorage.setItem(`vv_data_${userId}_${key}`, JSON.stringify(value))
}

export function addActivity(userId, text) {
  const list = loadUserData(userId, 'activity', [])
  const next = [{ id: Date.now(), text, at: new Date().toISOString() }, ...list].slice(0, 8)
  saveUserData(userId, 'activity', next)
}
