import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getHackathons } from '../data/localData.js'
import './Hackathons.css'

// Dynamic route: /hackathons/:id  ->  useParams() gives us the id from the URL
function HackathonDetails() {
  const { id } = useParams()
  const [hackathon, setHackathon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        const list = await getHackathons()
        setHackathon(list.find((h) => h.id === Number(id)))
      } catch (err) {
        setError(err.message)
      }
      setLoading(false)
    }
    loadData()
  }, [id])

  if (loading) {
    return <div className="container hackathons-page"><div className="empty-state">Loading...</div></div>
  }

  if (error || !hackathon) {
    return (
      <div className="container hackathons-page">
        <div className="empty-state">{error || 'That hackathon does not exist.'}</div>
        <Link to="/hackathons" className="btn btn-ghost btn-sm">← All hackathons</Link>
      </div>
    )
  }

  return (
    <div className="container hackathons-page">
      <Link to="/hackathons" className="btn btn-ghost btn-sm">← All hackathons</Link>
      <div className="card hackathon-details">
        <div className="hackathon-top">
          <span className="badge badge-violet">{hackathon.mode}</span>
          <span className="badge badge-mint">{hackathon.theme}</span>
        </div>
        <h1>{hackathon.name}</h1>
        <p>📍 {hackathon.location}</p>
        <p>📅 Submission period: {hackathon.dateText || 'Not provided by organizer'}</p>
        <p>🏆 Prize: {hackathon.prize ? hackathon.prize.replace(/<[^>]*>/g, '') : 'Not listed'}</p>
        <p>📌 Status: {hackathon.status || 'Unknown'}</p>
        <p>👥 Registrations: {hackathon.registrations ?? 'Not listed'}</p>
        <p>🏢 Organizer: {hackathon.organization}</p>
        {hackathon.registrationLink && <a className="btn btn-primary btn-sm" href={hackathon.registrationLink} target="_blank" rel="noreferrer">Open hackathon ↗</a>}
      </div>
    </div>
  )
}

export default HackathonDetails
