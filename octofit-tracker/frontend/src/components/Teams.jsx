// Endpoint reference: https://super-parakeet-57w65r6rxxgf4qqq-8000.app.github.dev/api/teams
import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('teams').then(setTeams).then(() => setStatus('ready')).catch((loadError) => { setError(loadError.message); setStatus('error') })
  }, [])

  if (status === 'loading') return <p className="state-message">Loading teams...</p>
  if (status === 'error') return <p className="state-message state-error">{error}</p>

  return <section className="content-section" aria-labelledby="teams-heading">
    <div className="section-heading"><div><p className="eyebrow">Collective momentum</p><h1 id="teams-heading">Teams</h1></div><span className="count-badge">{teams.length} active</span></div>
    {teams.length === 0 ? <p className="empty-state">Create a team to start moving together.</p> : <div className="data-grid">{teams.map((team) => <article className="data-card team-card" key={team._id || team.id || team.name}><span className="team-mark">{(team.name || 'T').slice(0, 1).toUpperCase()}</span><div><h2>{team.name || 'Unnamed team'}</h2><p>{team.description || `${team.memberIds?.length || 0} members`}</p></div></article>)}</div>}
  </section>
}

export default Teams
