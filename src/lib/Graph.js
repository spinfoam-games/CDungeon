function Graph() {
  this.vertexId = 0
  this.vertexList = []
  this.vertexMap = {}
  this.connectionMap = {}
  this.edgeMap = {}
}

Graph.prototype.addVertex = function(id, data = {}) {
  const effectiveId = id ? id : this.vertexId++
  const v = { id: effectiveId, data }

  this.vertexList.push(v)
  this.vertexMap[effectiveId] = v

  return v
}

Graph.prototype.addHalfEdge = function(from, to) {
  const edgeId = `${from}::${to}`

  // This edge already exists
  if (this.edgeMap[edgeId]) return

  this.edgeMap[edgeId] = true

  if (!this.connectionMap[from]) {
    this.connectionMap[from] = []
  }

  this.connectionMap[from].push(to)
}

Graph.prototype.addEdge = function(from, to) { 
  this.addHalfEdge(from, to)
  this.addHalfEdge(to, from)
}

Graph.prototype.hasHalfEdge = function(from, to) {
  const edgeId = `${from}::${to}`
  return !!this.edgeMap[edgeId]
}

Graph.prototype.hasEdge = function(from, to) {
  return this.hasHalfEdge(from, to) || this.hasHalfEdge(to, from)
}

export default Graph