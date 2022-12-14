const isInteger = x => x === Math.trunc(x)

const GraphToGridTranslator = (maze) => {
  return (cell, x, y) => {
    const graphX = (x - 1) / 2
    const graphY = (y - 1) / 2
    const vertexId = `${graphX}:${graphY}`
  
    let isSolid = true
  
    if (!isInteger(graphX) && !isInteger(graphY)) {
      return { isSolid: true }  
    }
  
    if (graphX < 0 || graphY < 0) {
      return { isSolid: true }
    }
  
    if (!isInteger(graphX)) {
      const leftId = `${Math.trunc(graphX)}:${graphY}`
      const rightId = `${Math.trunc(graphX) + 1}:${graphY}`
      const connectionList = maze.connectionMap[leftId] || []
  
      const isConnected = connectionList.find(x => x == rightId) ? true : false
  
      return { isSolid: !isConnected }
    }
  
    if (!isInteger(graphY)) {
      const leftId = `${graphX}:${Math.trunc(graphY)}`
      const rightId = `${graphX}:${Math.trunc(graphY) + 1}`
      const connectionList = maze.connectionMap[leftId] || []
  
      const isConnected = connectionList.find(x => x == rightId)
  
      return { isSolid: !isConnected }
    }
  
    const v = maze.vertexMap[vertexId]
    isSolid = v ? false : true
  
    return { isSolid }  
  }
}

export default GraphToGridTranslator