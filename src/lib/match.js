import { CANDIDATES } from '../data/candidates.js'

/**
 * answersToVector
 * Converts array of selected option indices (0–3) to frequency vector.
 * e.g. [0,1,0,2,0] → [3, 1, 1, 0]
 */
export function answersToVector(answers) {
  const vec = [0, 0, 0, 0]
  answers.forEach((a) => { if (a >= 0 && a <= 3) vec[a]++ })
  return vec
}

/**
 * cosineSimilarity
 * Computes cosine similarity between two numeric arrays.
 */
export function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0)
  const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0))
  const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0))
  if (magA === 0 || magB === 0) return 0
  return dot / (magA * magB)
}

/**
 * Each candidate implicitly maps to a personality profile vector.
 * Index corresponds to option preference (A=assertive, B=gentle, C=social, D=stable).
 */
const CANDIDATE_VECTORS = {
  yueue:     [1, 3, 1, 2],  // gentle + stable
  xingxing:  [3, 1, 2, 1],  // assertive + social
  qingqing:  [2, 2, 3, 1],  // social + assertive
  xiaoling:  [1, 2, 1, 3],  // stable + gentle
}

/**
 * findBestMatch
 * Given an array of selected answer indices, return the best matching candidate.
 */
export function findBestMatch(answers) {
  const userVec = answersToVector(answers)

  let bestCandidate = CANDIDATES[0]
  let bestScore = -1

  CANDIDATES.forEach((candidate) => {
    const cVec = CANDIDATE_VECTORS[candidate.id] || [1, 1, 1, 1]
    const score = cosineSimilarity(userVec, cVec)
    if (score > bestScore) {
      bestScore = score
      bestCandidate = candidate
    }
  })

  // Blend base compat with similarity score for display
  const displayCompat = Math.round(
    bestCandidate.compat * 0.7 + bestScore * 30
  )

  return { candidate: bestCandidate, compat: Math.min(displayCompat, 99) }
}
