import { Link } from 'react-router-dom'
import './Landing.css'

const steps = [
  { number: '01', title: 'Find opportunities', text: 'Explore hackathons and keep useful opportunities in one place.' },
  { number: '02', title: 'Track deadlines', text: 'Add important dates so you do not forget what is coming next.' },
  { number: '03', title: 'Stay prepared', text: 'Use the dashboard to see what needs your attention.' },
]

const features = [
  { to: '/hackathons', title: 'Hackathons', text: 'Explore hackathons, filter them and register your interest.' },
  { to: '/deadlines', title: 'Deadline Tracker', text: 'Add your own important deadlines and track upcoming dates.' },
  { to: '/profile', title: 'Profile', text: 'Keep your basic information and skills in one place.' },
]

function Landing() {
  return (
    <div className="landing">
      <section className="hero">
        <div className="container hero-inner">
          <div className="landing-brand"><img src={`${import.meta.env.BASE_URL}vision-vault-mark.png`} alt="Vision Vault emblem" /><span className="margin-note">built for students who want everything organised</span></div>
          <h1>Your next win is <span>waiting</span>.<br />Go find it.</h1>
          <p className="hero-sub">Vision Vault helps students track hackathons and important deadlines without using multiple apps or spreadsheets.</p>
          <div className="hero-cta">
            <Link to="/dashboard" className="btn btn-primary">Go to Dashboard →</Link>
            <Link to="/hackathons" className="btn btn-ghost">Browse Hackathons</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="page-heading"><h2>How it works</h2></div>
          <div className="grid grid-3">
            {steps.map((step) => (
              <div className="step-card" key={step.number}>
                <span className="step-number">{step.number}</span><h3>{step.title}</h3><p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="page-heading"><h2>Everything you need</h2></div>
          <div className="grid grid-3">
            {features.map((feature) => (
              <Link key={feature.to} to={feature.to} className="feature-card">
                <h3>{feature.title}</h3><p>{feature.text}</p><span className="feature-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing
