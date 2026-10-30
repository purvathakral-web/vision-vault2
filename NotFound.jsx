import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
      <h1>404</h1>
      <p className="margin-note">this page does not exist</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 20 }}>Back to home</Link>
    </div>
  )
}

export default NotFound
