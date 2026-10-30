import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Landing from './pages/Landing.jsx'
import Hackathons from './pages/Hackathons.jsx'
import HackathonDetails from './pages/HackathonDetails.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Internships from './pages/Internships.jsx'
import Deadlines from './pages/Deadlines.jsx'
import Profile from './pages/Profile.jsx'
import NotFound from './pages/NotFound.jsx'

// The whole site is a single page app: the URL decides which page component renders.
function App() {
  return (
    <Routes>
      {/* every route inside Layout gets the navbar + footer */}
      <Route element={<Layout />}>
        {/* public pages */}
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* private pages: ProtectedRoute redirects to /login if nobody is logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="hackathons" element={<Hackathons />} />
          <Route path="hackathons/:id" element={<HackathonDetails />} />
          <Route path="internships" element={<Internships />} />
          <Route path="deadlines" element={<Deadlines />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* anything else */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
