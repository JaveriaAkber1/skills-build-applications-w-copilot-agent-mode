import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users')
      .then(setUsers)
      .then(() => setStatus('ready'))
      .catch((loadError) => {
        setError(loadError.message)
        setStatus('error')
      })
  }, [])

  if (status === 'loading') return <p className="state-message">Loading members...</p>
  if (status === 'error') return <p className="state-message state-error">{error}</p>

  return (
    <section className="content-section" aria-labelledby="users-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">People</p>
          <h1 id="users-heading">Members</h1>
        </div>
        <span className="count-badge">{users.length} total</span>
      </div>
      {users.length === 0 ? <p className="empty-state">No members have joined yet.</p> : (
        <div className="data-grid">
          {users.map((user) => (
            <article className="data-card" key={user._id || user.id || user.email}>
              <div className="avatar">{(user.name || user.username || '?').slice(0, 1).toUpperCase()}</div>
              <div>
                <h2>{user.name || user.username || 'Unnamed member'}</h2>
                <p>{user.email || 'No email listed'}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Users
