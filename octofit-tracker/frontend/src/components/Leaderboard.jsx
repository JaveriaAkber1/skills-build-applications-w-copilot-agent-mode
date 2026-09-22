// Endpoint reference: https://super-parakeet-57w65r6rxxgf4qqq-8000.app.github.dev/api/leaderboard
import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('leaderboard').then(setLeaders).then(() => setStatus('ready')).catch((loadError) => { setError(loadError.message); setStatus('error') })
  }, [])

  if (status === 'loading') return <p className="state-message">Loading leaderboard...</p>
  if (status === 'error') return <p className="state-message state-error">{error}</p>

  return <section className="content-section" aria-labelledby="leaderboard-heading">
    <div className="section-heading"><div><p className="eyebrow">Friendly competition</p><h1 id="leaderboard-heading">Leaderboard</h1></div><span className="count-badge">{leaders.length} ranked</span></div>
    {leaders.length === 0 ? <p className="empty-state">Points will appear here after the first activity.</p> : <div className="leader-list">{leaders.map((leader, index) => <article className="leader-row" key={leader.userId || leader._id || leader.id}><span className="rank">{String(index + 1).padStart(2, '0')}</span><div className="leader-name"><strong>{leader.name || leader.username || 'Member'}</strong><span>{leader.activities ?? 0} activities</span></div><strong className="points">{leader.points ?? 0} pts</strong></article>)}</div>}
  </section>
}

export default Leaderboard
