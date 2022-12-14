import Graph from './Graph'
import random from './random'

const applyPrims = graph => {
  const output = new Graph()
  const frontier = []

  let v = graph.vertexList[0]

  output.addVertex(v.id, v.data)

  frontier.push(...graph.connectionMap[v.id])

  while (frontier.length > 0) {
    const which = random.arrayIndex(frontier)
    const id = frontier.splice(which, 1)

    v = graph.vertexMap[id[0]]

    output.addVertex(v.id, v.data)

    const adjacentList = graph.connectionMap[v.id].filter(x => output.vertexMap[x])
    const whichNeighbor = random.arrayItem(adjacentList)

    output.addEdge(v.id, whichNeighbor)

    graph.connectionMap[v.id].forEach(otherV => {
      if (output.vertexMap[otherV] || frontier.find(x => x === otherV)) return

      frontier.push(otherV)
    })
  }

  return output
}

export default applyPrims