import { useEffect, useState } from 'react'
import FormInput from '../components/FormInput.jsx'
import useForm from '../hooks/useForm.js'
import { useAuth } from '../context/AuthContext.jsx'
import { getInternships } from '../data/localData.js'
import { loadUserData, saveUserData, addActivity } from '../utils/auth.js'
import { isBlank, isUrl } from '../utils/validators.js'
import './Internships.css'

const STATUSES = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected']

const badgeClass = {
  Wishlist: 'badge-soft',
  Applied: 'badge-marigold',
  Interview: 'badge-violet',
  Offer: 'badge-mint',
  Rejected: 'badge-coral',
}

function validate(values) {
  const errors = {}
  if (isBlank(values.company)) errors.company = 'Company name is required.'
  if (isBlank(values.role)) errors.role = 'Role is required.'
  if (!isBlank(values.link) && !isUrl(values.link)) errors.link = 'Link must start with http:// or https://'
  return errors
}

const emptyForm = { company: '', role: '', status: 'Wishlist', deadline: '', link: '' }

function Internships() {
  const { user } = useAuth()
  // the student's own tracker, loaded from localStorage and saved on every change
  const [items, setItems] = useState(() => loadUserData(user.id, 'internships', []))
  const [filter, setFilter] = useState('All')
  const [selectedJob, setSelectedJob] = useState(null)
  const form = useForm(emptyForm, validate)

  // Example internship listings are stored locally in dummyData.js.
  const [live, setLive] = useState([])
  const [liveLoading, setLiveLoading] = useState(true)
  const [liveError, setLiveError] = useState('')

  // runs once when the page opens
  useEffect(() => {
    loadLive()
  }, [])

  async function loadLive() {
    setLiveLoading(true)
    setLiveError('')
    try {
      setLive(await getInternships())
    } catch (err) {
      setLiveError(err.message)
    }
    setLiveLoading(false)
  }

  // one place that updates the screen and localStorage together
  function saveItems(newItems) {
    setItems(newItems)
    saveUserData(user.id, 'internships', newItems)
  }

  function addInternship(data) {
    const item = { id: Date.now(), ...data }
    saveItems([item, ...items])
    addActivity(user.id, `Added internship: ${item.role} at ${item.company}`)
  }

  function changeStatus(item, status) {
    saveItems(items.map((i) => (i.id === item.id ? { ...i, status } : i)))
    addActivity(user.id, `${item.company}: moved to ${status}`)
  }

  function removeInternship(id) {
    const shouldDelete = window.confirm('Remove this internship from your tracker?')
    if (!shouldDelete) return
    saveItems(items.filter((i) => i.id !== id))
  }

  function submit(values) {
    addInternship({ ...values, company: values.company.trim(), role: values.role.trim() })
    form.reset()
  }

  // Save a live listing and ask for its real application deadline.
  // This sample listing may not have an application deadline.
  function trackLive(job) {
    const enteredDeadline = window.prompt(
      'Enter the application deadline for this internship (YYYY-MM-DD), if the listing provides one. Leave blank if no deadline is mentioned.'
    )
    if (enteredDeadline === null) return

    const deadline = enteredDeadline.trim()
    if (deadline && Number.isNaN(new Date(deadline).getTime())) {
      window.alert('Please enter a valid date in YYYY-MM-DD format.')
      return
    }

    addInternship({
      company: job.company_name,
      role: job.title,
      status: 'Wishlist',
      deadline,
      link: job.url,
    })
    if (deadline) {
      window.alert('Internship saved. Its deadline will now appear in Deadline Tracker.')
    } else {
      window.alert('Internship saved. No deadline was added because none was provided.')
    }
  }

  const field = (name) => ({
    name,
    value: form.values[name],
    onChange: form.handleChange,
    onBlur: form.handleBlur,
    error: form.errors[name],
  })

  const visible = filter === 'All' ? items : items.filter((i) => i.status === filter)

  return (
    <div className="container internships-page">
      <div className="page-heading">
        <h1>Internship Tracker</h1>
        <p className="margin-note">every application, one place</p>
      </div>

      <div className="card live-internships">
        <h3>Latest internship openings</h3>
        <p className="data-note">These 12 internship listings are dummy data for demonstration. Links are placeholder examples, not real job postings.</p>
        {liveLoading && <p>Loading internships...</p>}
        {liveError && (
          <p>
            Could not load internships: {liveError}{' '}
            <button className="btn btn-ghost btn-sm" onClick={loadLive}>Retry</button>
          </p>
        )}
        {!liveLoading && !liveError && live.length === 0 && <p>No sample internships are available right now.</p>}
        <div className="live-jobs-grid">
          {live.map((job) => (
            <article className="live-job-card" key={job.id}>
              <div className="live-job-card-top">
                <span className="live-job-pill">Internship</span>
                {job.publication_date && <span className="live-job-date">{new Date(job.publication_date).toLocaleDateString('en-IN')}</span>}
              </div>
              <h4>{job.title}</h4>
              <p className="live-company">{job.company_name}</p>
              <p className="live-job-location"><span aria-hidden="true">⌖</span> {job.candidate_required_location}</p>
              <p className="live-job-type">{job.job_type || 'Job type not specified'}</p>
              {job.salary && <p className="live-job-salary">{job.salary}</p>}
              <div className="live-job-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => setSelectedJob(job)}>View details</button>
                <button className="btn btn-primary btn-sm" onClick={() => trackLive(job)}>+ Track</button>
              </div>
              <a className="live-source-link" href={job.url} target="_blank" rel="noreferrer">View original listing ↗</a>
            </article>
          ))}
        </div>
      </div>

      <div className="intern-stats">
        {STATUSES.map((s) => (
          <div className="card intern-stat" key={s}>
            <strong>{items.filter((i) => i.status === s).length}</strong>
            <span>{s}</span>
          </div>
        ))}
      </div>

      <form className="card intern-form" onSubmit={form.handleSubmit(submit)} noValidate>
        <FormInput label="Company" placeholder="e.g. Google" {...field('company')} />
        <FormInput label="Role" placeholder="e.g. Frontend Intern" {...field('role')} />
        <FormInput as="select" label="Status" {...field('status')}>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </FormInput>
        <FormInput label="Application deadline" type="date" {...field('deadline')} />
        <FormInput className="full" label="Application link (optional)" placeholder="https://..." {...field('link')} />
        <button type="submit" className="btn btn-primary btn-sm full">+ Add internship</button>
      </form>

      <div className="intern-filters">
        {['All', ...STATUSES].map((s) => (
          <button key={s} className={filter === s ? 'active' : ''} onClick={() => setFilter(s)}>{s}</button>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="empty-state">
          {items.length === 0 ? 'No internships yet. Add the first one above.' : `Nothing in "${filter}" yet.`}
        </div>
      )}

      {visible.length > 0 && (
        <div className="intern-list">
          {visible.map((item) => (
            <div className="intern-row" key={item.id}>
              <div className="intern-info">
                <h4>{item.role}</h4>
                <p>
                  {item.company}
                  {item.deadline && ` · apply by ${item.deadline}`}
                </p>
                {item.link && <a href={item.link} target="_blank" rel="noreferrer">Open link →</a>}
              </div>
              <span className={`badge ${badgeClass[item.status]}`}>{item.status}</span>
              <div className="intern-form-row">
                <select
                  value={item.status}
                  onChange={(e) => changeStatus(item, e.target.value)}
                  aria-label="Change status"
                >
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <button
                className="intern-remove"
                onClick={() => removeInternship(item.id)}
                aria-label="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedJob && (
        <div className="simple-modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="simple-modal card" role="dialog" aria-modal="true" aria-label="Internship details" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedJob(null)} aria-label="Close">×</button>
            <h2>{selectedJob.title}</h2>
            <p><strong>Company:</strong> {selectedJob.company_name}</p>
            <p><strong>Location:</strong> {selectedJob.candidate_required_location || 'Not provided'}</p>
            <p><strong>Work mode:</strong> {selectedJob.job_type || 'Not provided'}</p>
            <p><strong>Posted:</strong> {selectedJob.publication_date ? new Date(selectedJob.publication_date).toLocaleDateString('en-IN') : 'Not provided'}</p>
            <p><strong>Salary:</strong> {selectedJob.salary || 'Not provided by the employer'}</p>
            {selectedJob.description && <p><strong>Summary:</strong> {selectedJob.description}</p>}
            <p className="data-note">Sample listing for demonstration only. Check a company website for real openings.</p>
            <a className="btn btn-primary btn-sm" href={selectedJob.url} target="_blank" rel="noreferrer">Open original listing ↗</a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Internships
