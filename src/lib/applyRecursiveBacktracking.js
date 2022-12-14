import directions from './directions'
import FACING from './FACING'
import Graph from './Graph'
import random from './random'

const applyRecursiveBacktracking = graph => {
  const output = new Graph()

  const baseDirectionList = [
    FACING.NORTH,
    FACING.SOUTH,
    FACING.WEST,
    FACING.EAST
  ]

  const carvePassages = (ox, oy) => {
    const directionList = [...baseDirectionList].sort(() => Math.random() - 0.5)

    directionList.forEach(direction => {
      const delta = directions.facingDeltaMap[direction]
      const tx = ox + delta[0]
      const ty = oy + delta[1]
      const oid = `${ox}:${oy}`
      const tid = `${tx}:${ty}`
      const nextVertex = graph.vertexMap[tid]

      if (!nextVertex || output.vertexMap[tid]) return

      output.addVertex(nextVertex.id, nextVertex.data)
      output.addEdge(oid, tid)
      carvePassages(tx, ty)
    })
  }

  let v = graph.vertexList[0]

  output.addVertex(v.id, v.data)
  carvePassages(v.data.x, v.data.y)

  return output
}

export default applyRecursiveBacktracking