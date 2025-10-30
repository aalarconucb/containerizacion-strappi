import React from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
  const [apiStatus, setApiStatus] = React.useState('...')

  React.useEffect(() => {
    fetch('/api')
      .then(r => r.text())
      .then(t => setApiStatus(`OK (${t.slice(0,80)}...)`))
      .catch(() => setApiStatus('offline'))
  }, [])

  return (
    <div style={{fontFamily:'sans-serif', padding:20}}>
      <h1>STRAPI - Frontend Scaffold</h1>
      <p>API base: <code>{import.meta.env.VITE_API_BASE_URL || '/api'}</code></p>
      <p>Strapi vía Gateway: <strong>{apiStatus}</strong></p>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
