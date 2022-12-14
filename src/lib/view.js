import FACING from "./FACING"

const buildKernel = (distance, facing) => {
  const k = []

  const toOffset = {
    NORTH: (x, d) => [x, d - distance],
    SOUTH: (x, d) => [x * -1, (d - distance) * -1],
    EAST: (x, d) => [(d - distance) * -1, x],
    WEST: (x, d) => [(d - distance), x * -1],
  }

  for (let d = 0; d <= distance; d++) {
    for (let x = -2; x <= 2; x++) {
      const offset = toOffset[facing](x, d)
      if (offset[0] === -0) offset[0] = 0
      k.push(offset) 
    }
  }

  return k
}

const buildBrightnessMap = viewDistance => {
  const brightnessMap = []

  for (let i = 0; i < viewDistance; i++) {
    brightnessMap.push(1 - i / viewDistance)
  }

  return brightnessMap
}

const buildKernelMap = (viewDistance) => {
  return {
    NORTH: buildKernel(viewDistance, FACING.NORTH),
    SOUTH: buildKernel(viewDistance, FACING.SOUTH),
    EAST: buildKernel(viewDistance, FACING.EAST),
    WEST: buildKernel(viewDistance, FACING.WEST),
  }
}

const view = {
  buildBrightnessMap,
  buildKernel,
  buildKernelMap
}

export default view