import directions from "./directions"
import FACING from "./FACING"

function braid(graph, deadEndPercentage = 0) {
  const deadEndList = []

  graph.vertexList.forEach(vertex => {
    if (graph.connectionMap[vertex.id].length === 1) {
      deadEndList.push(vertex)
    }
  })

  deadEndList.sort(() => Math.random() - 0.5)

  const directionList = [ FACING.NORTH, FACING.SOUTH, FACING.EAST, FACING.WEST ]
  const desiredDeadEndCount = Math.max(0, Math.round(deadEndList.length * deadEndPercentage))

  while (deadEndList.length > desiredDeadEndCount) {
    const origin = deadEndList.shift()
    const randomDirectionList = [...directionList].sort(() => Math.random() - 0.5)
    
    while (randomDirectionList.length > 0) {
      const direction = randomDirectionList.pop()
      const delta = directions.facingDeltaMap[direction]
      const targetId = `${origin.data.x + delta[0]}:${origin.data.y + delta[1]}`

      if (!graph.vertexMap[targetId] || graph.hasEdge(origin.id, targetId)) continue

      graph.addEdge(origin.id, targetId)
      break
    }
  }
}

export default braid