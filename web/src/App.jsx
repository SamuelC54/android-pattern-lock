import { useState, useEffect } from 'react'
import PatternVisualizer from './PatternVisualizer'
import './App.css'

function App() {
  const [patterns, setPatterns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Load patterns from JSON file
    fetch('/patterns_with_3_lines.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load patterns')
        }
        return response.json()
      })
      .then(data => {
        setPatterns(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const filteredPatterns = patterns.filter(pattern => {
    // Filter by length
    if (filter !== 'all' && pattern.length !== parseInt(filter)) {
      return false
    }
    
    // Search filter
    if (searchTerm) {
      const patternStr = pattern.join('-')
      return patternStr.includes(searchTerm.replace(/\s+/g, '-'))
    }
    
    return true
  })

  const patternCounts = patterns.reduce((acc, pattern) => {
    const len = pattern.length
    acc[len] = (acc[len] || 0) + 1
    return acc
  }, {})

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading patterns...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">Error: {error}</div>
        <p>Make sure patterns_with_3_lines.json is in the public folder</p>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🔐 Android Pattern Lock Visualizer</h1>
        <p className="subtitle">Patterns with Exactly 3 Lines</p>
        <div className="stats">
          <div className="stat">
            <span className="stat-label">Total Patterns:</span>
            <span className="stat-value">{patterns.length.toLocaleString()}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Showing:</span>
            <span className="stat-value">{filteredPatterns.length.toLocaleString()}</span>
          </div>
        </div>
      </header>

      <div className="controls">
        <div className="filter-group">
          <label htmlFor="length-filter">Filter by Length:</label>
          <select
            id="length-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Lengths</option>
            {Object.keys(patternCounts).sort().map(len => (
              <option key={len} value={len}>
                Length {len} ({patternCounts[len]} patterns)
              </option>
            ))}
          </select>
        </div>

        <div className="search-group">
          <label htmlFor="search">Search Pattern:</label>
          <input
            id="search"
            type="text"
            placeholder="e.g., 1-2-3-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="patterns-grid">
        {filteredPatterns.map((pattern, index) => (
          <PatternVisualizer key={index} pattern={pattern} index={index} />
        ))}
      </div>

      {filteredPatterns.length === 0 && (
        <div className="no-results">
          No patterns found matching your criteria.
        </div>
      )}
    </div>
  )
}

export default App

