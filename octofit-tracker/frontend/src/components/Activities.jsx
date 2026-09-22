// Endpoint reference: https://super-parakeet-57w65r6rxxgf4qqq-8000.app.github.dev/api/activities
import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities')
      .then(setActivities)
      .then(() => setStatus('ready'))
      .catch((loadError) => {
        setError(loadError.message)
        setStatus('error')
      })
  }, [])

  if (status === 'loading') return <p className="state-message">Loading activity...</p>
  if (status === 'error') return <p className="state-message state-error">{error}</p>

  return (
    <section className="content-section" aria-labelledby="activities-heading">
      <div className="section-heading">
        <div><p className="eyebrow">Movement log</p><h1 id="activities-heading">Activities</h1></div>
        <span className="count-badge">{activities.length} logged</span>
      </div>
      {activities.length === 0 ? <p className="empty-state">Your activity feed is ready for its first entry.</p> : (
        <div className="table-wrap"><table className="tracker-table"><thead><tr><th>Type</th><th>Duration</th><th>Points</th><th>Date</th></tr></thead><tbody>
          {activities.map((activity) => <tr key={activity._id || activity.id}><td>{activity.type || activity.name || 'Workout'}</td><td>{activity.durationMinutes ?? activity.duration ?? '-'} min</td><td><strong>{activity.points ?? 0}</strong></td><td>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : '-'}</td></tr>)}
        </tbody></table></div>
      )}
    </section>
  )
}

export default Activities
