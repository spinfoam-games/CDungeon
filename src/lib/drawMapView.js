import FACING from "./FACING"

function drawMap(maze, mapGrid, playerPosition) {
  const canvas = document.getElementById('map')
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, 400, 400)

  const cellSize = 15
  const gridSize = 21

  ctx.strokeStyle = 'silver'
  ctx.translate(
    400 / 2 - (gridSize * cellSize / 2),
    400 / 2 - (gridSize * cellSize / 2),
  )

  for(let y = 0; y < gridSize + 1; y++) {
    ctx.beginPath()
    ctx.moveTo(0, y * cellSize)
    ctx.lineTo(gridSize * cellSize, y * cellSize)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(y * cellSize, 0)
    ctx.lineTo(y * cellSize, gridSize * cellSize)
    ctx.stroke()
  }

  mapGrid.forEach(
    (cell, x, y) => {
      ctx.fillStyle = cell && cell.isSolid ? 'black' : 'gainsboro'
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)  
    }
  )

  const toGraphSpace = x => (x * 2 + 1) * cellSize + cellSize / 2 

  maze.vertexList.forEach(vertex => {
    const vx = toGraphSpace(vertex.data.x)
    const vy = toGraphSpace(vertex.data.y)

    ctx.strokeStyle = 'black'
    ctx.beginPath()
    ctx.arc(
      vx, vy,
      2,
      0, 360
    )
    ctx.stroke()

    ctx.strokeStyle = 'blue'

    const connections = maze.connectionMap[vertex.id] || []
    connections.forEach(
      targetId => {
        const target = maze.vertexMap[targetId]
        ctx.beginPath()
        ctx.moveTo(vx, vy)
        ctx.lineTo(toGraphSpace(target.data.x), toGraphSpace(target.data.y))
        ctx.stroke()
      }
    )
  })

  const px = playerPosition.x * cellSize
  const py = playerPosition.y * cellSize

  ctx.strokeStyle = 'orange'
  ctx.fillStyle = 'yellow'

  ctx.translate(px + cellSize / 2, py + cellSize / 2)
  ctx.scale(0.8, 0.8)
  if (playerPosition.facing === FACING.EAST) ctx.rotate(Math.PI / 2)
  if (playerPosition.facing === FACING.SOUTH) ctx.rotate(Math.PI)
  if (playerPosition.facing === FACING.WEST) ctx.rotate((3 * Math.PI) / 2)

  ctx.beginPath()
  ctx.moveTo(-cellSize / 2, cellSize / 2)
  ctx.lineTo(0, -cellSize / 2 + 3)
  ctx.lineTo(cellSize / 2, cellSize / 2)
  ctx.lineTo(-cellSize / 2, cellSize / 2)
  ctx.stroke()
  ctx.fill()

  ctx.resetTransform()
}

export default drawMap