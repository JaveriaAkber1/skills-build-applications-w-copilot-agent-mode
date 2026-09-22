import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('workouts').then(setWorkouts).then(() => setStatus('ready')).catch((loadError) => { setError(loadError.message); setStatus('error') })
  }, [])

  if (status === 'loading') return <p className="state-message">Loading workouts...</p>
  if (status === 'error') return <p className="state-message state-error">{error}</p>

  return <section className="content-section" aria-labelledby="workouts-heading">
    <div className="section-heading"><div><p className="eyebrow">Your next move</p><h1 id="workouts-heading">Workouts</h1></div><span className="count-badge">{workouts.length} plans</span></div>
    {workouts.length === 0 ? <p className="empty-state">No workout plans have been added yet.</p> : <div className="data-grid">{workouts.map((workout) => <article className="data-card workout-card" key={workout._id || workout.id || workout.name}><div className="workout-top"><span className="level-tag">{workout.difficulty || 'beginner'}</span><span>{workout.durationMinutes || workout.duration || '-'} min</span></div><h2>{workout.name || 'Workout plan'}</h2><p>{workout.description || workout.target || 'Build steady strength and stamina.'}</p></article>)}</div>}
  </section>
}

export default Workouts
