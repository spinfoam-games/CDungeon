import FACING from "./FACING"

function drawFirstPersonView(viewDistance, geometryFactory, mapGrid, viewKernelMap, playerPosition) {
  const checkIfSolid = (mapX, mapY) => {
    const cell = mapGrid.getCellAt(mapX, mapY)
  
    return cell ? cell.isSolid : true
  }

  const applicationElement = document.getElementById('viewport')
  applicationElement.innerHTML = ''

  const viewKernel = viewKernelMap[playerPosition.facing]

  let left = (x, y) => [x - 1, y]
  let right = (x, y) => [x + 1, y]

  if (playerPosition.facing === FACING.SOUTH) {
    left = (x, y) => [x + 1, y]
    right = (x, y) => [x - 1, y]  
  }

  if (playerPosition.facing === FACING.WEST) {
    left = (x, y) => [x, y + 1]
    right = (x, y) => [x, y - 1]  
  }

  if (playerPosition.facing === FACING.EAST) {
    left = (x, y) => [x, y - 1]
    right = (x, y) => [x, y + 1]  
  }

  for(let y = 0; y <= viewDistance; y++) {
    for(let x = 0; x < 5; x++) {
      geometryFactory.createFloorAndCeiling(x - 2, y - viewDistance)
    }
  }

  for(let y = 0; y <= viewDistance; y++) {
    for(let x = 0; x < 5; x++) {
      let kernelIndex = (y * 5 + x)
      let [offsetX, offsetY] = viewKernel[kernelIndex]
      
      let mapX = playerPosition.x + offsetX
      let mapY = playerPosition.y + offsetY

      const isSolid = checkIfSolid(mapX, mapY)
      const isLeftSolid = checkIfSolid(...left(mapX, mapY))
      const isRightSolid = checkIfSolid(...right(mapX, mapY))

      if (isSolid) {
        geometryFactory.createCube(x - 2, y - viewDistance, !isLeftSolid, !isRightSolid, mapX, mapY)
      }
    }
  }
}

export default drawFirstPersonView