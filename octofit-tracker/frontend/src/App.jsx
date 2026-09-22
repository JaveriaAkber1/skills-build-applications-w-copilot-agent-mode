import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/activities"><img src={logo} alt="Octofit" /><span>OCTOFIT<span>TRACKER</span></span></NavLink>
        <span className="live-status"><i /> API connected</span>
      </header>
      <div className="app-layout">
        <aside className="sidebar" aria-label="Primary navigation">
          <p className="sidebar-label">Workspace</p>
          <nav className="main-nav">
            <NavLink to="/activities">Activity</NavLink>
            <NavLink to="/workouts">Workouts</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/users">Members</NavLink>
          </nav>
          <p className="sidebar-note">Keep showing up.<br />The numbers follow.</p>
        </aside>
        <main className="main-content">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
