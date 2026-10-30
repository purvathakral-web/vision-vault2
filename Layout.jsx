import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

// Shared page frame. <Outlet /> is where the current child route renders,
// so the navbar and footer are written once and stay on every page.
function Layout() {
  const { pathname } = useLocation()

  // jump back to the top whenever the page changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
