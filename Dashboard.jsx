import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getHackathons } from '../data/localData.js'
import { loadUserData } from '../utils/auth.js'
import { useAuth } from '../context/AuthContext.jsx'
import './Dashboard.css'

function daysLeft(dateStr) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.ceil((new Date(dateStr) - today) / (1000 * 60 * 60 * 24))
}

function timeAgo(iso) {
  const minutes = Math.floor((Date.now() - new Date(iso)) / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days > 1 ? 's' : ''} ago`
}

// how much of the profile is filled in (0-100)
function profileCompleteness(profile) {
  const checks = [
    profile.name, profile.branch, profile.college, profile.bio,
    profile.skills.length > 0, profile.hackathonsDone.length > 0,
    profile.github, profile.linkedin,
  ]
  return Math.round((checks.filter(Boolean).length / checks.length) * 100)
}

function Dashboard() {
  const { user } = useAuth()
  const savedIds = useSelector((state) => state.savedHackathons)
  const [hackathons, setHackathons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // internships and custom deadlines are saved in localStorage, so we read them directly
  const internships = loadUserData(user.id, 'internships', [])
  const customDeadlines = loadUserData(user.id, 'deadlines', [])

  useEffect(() => {
    async function loadData() {
      try {
        setHackathons(await getHackathons())
      } catch (err) {
        setError(err.message)
      }
      setLoading(false)
    }
    loadData()
  }, [])

  // profile and activity are local to the student, so they are read directly
  const activity = loadUserData(user.id, 'activity', [])
  const profile = loadUserData(user.id, 'profile', {
    name: user.name, branch: user.branch, college: user.college,
    bio: '', skills: [], hackathonsDone: [], github: '', linkedin: '',
  })

  const allDeadlines = [
    ...hackathons.map((item) => ({ title: item.name + ' registration', date: item.registrationDeadline })),
    ...internships.filter((item) => item.deadline && item.status === 'Wishlist').map((item) => ({ title: item.role + ' at ' + item.company, date: item.deadline })),
    ...customDeadlines.map((item) => ({ title: item.title, date: item.date })),
  ].sort((a, b) => new Date(a.date) - new Date(b.date))

  const upcomingCount = allDeadlines.filter((item) => daysLeft(item.date) >= 0 && daysLeft(item.date) <= 7).length
  const nextDeadline = allDeadlines.find((item) => daysLeft(item.date) >= 0)
  const recommendedHackathon = [...hackathons].filter((h) => daysLeft(h.registrationDeadline) >= 0).sort((a, b) => new Date(a.registrationDeadline) - new Date(b.registrationDeadline))[0]

  const appliedCount = internships.filter((i) => i.status !== 'Wishlist').length
  const interviewCount = internships.filter((i) => i.status === 'Interview').length
  const offerCount = internships.filter((i) => i.status === 'Offer').length
  const completeness = profileCompleteness(profile)

  return (
    <div className="container dashboard">
      <div className="page-heading"><h1>Welcome back, {user.name.split(' ')[0]} 👋</h1><p className="margin-note">here is your progress so far</p></div>

      {error && <div className="empty-state">Could not load hackathons: {error}</div>}

      <div className="grid grid-3 overview-grid">
        <Link to="/internships" className="card overview-card">
          <span className="badge badge-mint">Internships</span>
          <h3>{loading ? '...' : `${appliedCount} of ${internships.length} applied`}</h3>
          <p>{interviewCount} interview · {offerCount} offer</p>
        </Link>
        <Link to="/deadlines" className="card overview-card">
          <span className="badge badge-coral">Deadlines</span>
          <h3>{loading ? '...' : `${upcomingCount} due this week`}</h3>
          {nextDeadline && <p>Next: {nextDeadline.title} in {daysLeft(nextDeadline.date)} days</p>}
        </Link>
        <Link to="/profile" className="card overview-card">
          <span className="badge badge-violet">Profile</span>
          <h3>{completeness}% complete</h3>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${completeness}%` }} /></div>
        </Link>
      </div>

      <div className="card saved-hackathons-card">
        <h3>Saved hackathons</h3>
        {savedIds.length === 0 ? (
          <p className="empty-line">No saved hackathons yet. Save one from the Hackathons page.</p>
        ) : (
          <ul>
            {savedIds.map((id) => {
              const item = hackathons.find((h) => h.id === id)
              return item ? <li key={id}><Link to="/hackathons">{item.name}</Link></li> : null
            })}
          </ul>
        )}
      </div>

      <div className="grid grid-2 dashboard-lower">
        <div className="card"><h3>Quick actions</h3><div className="quick-actions">
          <Link to="/internships" className="btn btn-ghost btn-sm">+ Add internship</Link>
          <Link to="/deadlines" className="btn btn-ghost btn-sm">+ Add deadline</Link>
          <Link to="/hackathons" className="btn btn-ghost btn-sm">Browse hackathons</Link>
          <Link to="/profile" className="btn btn-ghost btn-sm">Edit profile</Link>
        </div>
          {recommendedHackathon && <p className="recommend-line">Up next: <strong>{recommendedHackathon.name}</strong> ({recommendedHackathon.mode})</p>}
        </div>
        <div className="card"><h3>Recent activity</h3>
          {activity.length === 0 ? <p className="empty-line">Nothing yet. Add an internship or deadline to get started.</p> :
            <ul className="activity-list">
              {activity.map((item) => <li key={item.id}><span className="activity-dot" /><div><p className="activity-text">{item.text}</p><span className="activity-time">{timeAgo(item.at)}</span></div></li>)}
            </ul>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
