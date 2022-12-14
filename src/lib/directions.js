import FACING from "./FACING"

const turnRight = {
  NORTH: FACING.EAST,
  EAST: FACING.SOUTH,
  SOUTH: FACING.WEST,
  WEST: FACING.NORTH
}

const turnLeft = {
  NORTH: FACING.WEST,
  WEST: FACING.SOUTH,
  SOUTH: FACING.EAST,
  EAST: FACING.NORTH,
}

const facingDeltaMap = {
  NORTH: [0, -1],
  SOUTH: [0, 1],
  EAST: [1, 0],
  WEST: [-1, 0],
}

export default {
  facingDeltaMap,
  turnLeft,
  turnRight,
}