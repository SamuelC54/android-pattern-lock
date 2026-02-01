import './PatternVisualizer.css'

// Dot positions on a 3x3 grid
const DOT_POSITIONS = {
  1: { x: 0, y: 0 },
  2: { x: 1, y: 0 },
  3: { x: 2, y: 0 },
  4: { x: 0, y: 1 },
  5: { x: 1, y: 1 },
  6: { x: 2, y: 1 },
  7: { x: 0, y: 2 },
  8: { x: 1, y: 2 },
  9: { x: 2, y: 2 },
}

function PatternVisualizer({ pattern, index }) {
  const size = 140
  const dotRadius = 10
  const gridSize = 3
  const cellSize = size / gridSize
  const padding = 15

  // Calculate positions for SVG
  const getPosition = (dotNum) => {
    const pos = DOT_POSITIONS[dotNum]
    return {
      x: padding + pos.x * cellSize + cellSize / 2,
      y: padding + pos.y * cellSize + cellSize / 2,
    }
  }

  // Generate path for the pattern
  const pathData = pattern
    .map((dot, index) => {
      const pos = getPosition(dot)
      return `${index === 0 ? 'M' : 'L'} ${pos.x} ${pos.y}`
    })
    .join(' ')

  return (
    <div className="pattern-card">
      <div className="pattern-header">
        <div className="pattern-number">#{index + 1}</div>
        <span className="pattern-sequence">{pattern.join(' → ')}</span>
        <span className="pattern-length">Length: {pattern.length}</span>
      </div>
      <div className="pattern-svg-container">
        <svg
          width={size + padding * 2}
          height={size + padding * 2}
          viewBox={`0 0 ${size + padding * 2} ${size + padding * 2}`}
          className="pattern-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          {[1, 2].map(i => (
            <line
              key={`v${i}`}
              x1={padding + i * cellSize}
              y1={padding}
              x2={padding + i * cellSize}
              y2={padding + size}
              stroke="#e0e0e0"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          ))}
          {[1, 2].map(i => (
            <line
              key={`h${i}`}
              x1={padding}
              y1={padding + i * cellSize}
              x2={padding + size}
              y2={padding + i * cellSize}
              stroke="#e0e0e0"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          ))}

          {/* Pattern path */}
          <path
            d={pathData}
            fill="none"
            stroke="#4a90e2"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pattern-path"
          />

          {/* Dots */}
          {Object.entries(DOT_POSITIONS).map(([dotNum, pos]) => {
            const position = getPosition(parseInt(dotNum))
            const isVisited = pattern.includes(parseInt(dotNum))
            const visitOrder = pattern.indexOf(parseInt(dotNum))

            return (
              <g key={dotNum}>
                {/* Dot circle */}
                <circle
                  cx={position.x}
                  cy={position.y}
                  r={dotRadius}
                  fill={isVisited ? '#4a90e2' : '#333'}
                  stroke={isVisited ? '#2c5aa0' : '#666'}
                  strokeWidth="2"
                  className="pattern-dot"
                />
                {/* Dot number */}
                <text
                  x={position.x}
                  y={position.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                  className="pattern-dot-number"
                >
                  {dotNum}
                </text>
                {/* Visit order indicator */}
                {isVisited && visitOrder >= 0 && (
                  <circle
                    cx={position.x}
                    cy={position.y}
                    r={dotRadius + 4}
                    fill="none"
                    stroke="#ff6b6b"
                    strokeWidth="2"
                    className="pattern-visit-indicator"
                  />
                )}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export default PatternVisualizer

