const createGridGraph = graph => {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const v = graph.addVertex(`${x}:${y}`, { x, y })
  
      if (x > 0) graph.addEdge(v.id, `${x-1}:${y}`)
      if (y > 0) graph.addEdge(v.id, `${x}:${y-1}`)
      if (x < 9) graph.addEdge(v.id, `${x+1}:${y}`)
      if (y < 9) graph.addEdge(v.id, `${x}:${y+1}`)
    }
  }  
}

export default createGridGraph