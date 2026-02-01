// Pattern validation logic for Android pattern locks
// You cannot skip a collinear dot, even if it's already been visited

const BETWEEN_DOTS = {
  '1-3': 2, '3-1': 2,
  '1-7': 4, '7-1': 4,
  '1-9': 5, '9-1': 5,
  '2-8': 5, '8-2': 5,
  '3-7': 5, '7-3': 5,
  '3-9': 6, '9-3': 6,
  '4-6': 5, '6-4': 5,
  '7-9': 8, '9-7': 8
}

export function isValidMove(fromDot, toDot, visited) {
  // Can't visit the same dot twice
  if (visited.has(toDot)) {
    return false
  }
  
  // Check if there's a collinear dot between from and to
  // If there is, you cannot skip it - must go through it
  const moveKey = `${fromDot}-${toDot}`
  if (moveKey in BETWEEN_DOTS) {
    return false  // Cannot skip a collinear middle dot
  }
  
  return true
}

export function isValidPattern(pattern) {
  if (pattern.length < 2) {
    return true
  }
  
  const visited = new Set([pattern[0]])
  
  for (let i = 0; i < pattern.length - 1; i++) {
    const fromDot = pattern[i]
    const toDot = pattern[i + 1]
    
    if (!isValidMove(fromDot, toDot, visited)) {
      return false
    }
    
    visited.add(toDot)
  }
  
  return true
}

