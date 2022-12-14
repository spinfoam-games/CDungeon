import Grid from './lib/Grid'
import Graph from './lib/Graph'
import GraphToGridTranslator from './lib/GraphToGridTranslator'

import applyPrims from './lib/applyPrims'
import createGridGraph from './lib/createGridGraph'
import view from './lib/view'
import FACING from './lib/FACING'
import GeometryFactory from './lib/GeometryFactory'
import drawFirstPersonView from './lib/drawFirstPersonView'
import drawMap from './lib/drawMapView'
import directions from './lib/directions'

import './main.css'
import applyRecursiveBacktracking from './lib/applyRecursiveBacktracking'
import braid from './lib/braid'

const mapGrid = new Grid(21, 21)

const graph = new Graph()
createGridGraph(graph)

const maze = Math.random() < 0.5
  ? applyPrims(graph)
  : applyRecursiveBacktracking(graph)

braid(maze, Math.random())

const translator = GraphToGridTranslator(maze)
mapGrid.map(translator)

let playerPosition = {
  x: 3,
  y: 3,
  facing: FACING.EAST
}

const viewDistance = 8
const brightnessMap = view.buildBrightnessMap(viewDistance)
const viewKernelMap = view.buildKernelMap(viewDistance)
const geometryFactory = GeometryFactory(brightnessMap)

function redraw() {
  drawFirstPersonView(viewDistance, geometryFactory, mapGrid, viewKernelMap, playerPosition)
  drawMap(maze, mapGrid, playerPosition)
}

function application() {
  redraw()

  window.onkeydown = (event) => {
    if (event.key === 'e') {
      playerPosition.facing = directions.turnRight[playerPosition.facing]
    } else if (event.key === 'q') {
      playerPosition.facing = directions.turnLeft[playerPosition.facing]
    } else if (event.key === 'w') {
      const delta = directions.facingDeltaMap[playerPosition.facing]
      const nextCell = mapGrid.getCellAt(playerPosition.x + delta[0], playerPosition.y + delta[1])
      const isBlocked = nextCell.isSolid

      if (!isBlocked) {
        playerPosition.x += delta[0]
        playerPosition.y += delta[1]
      }
    }

    redraw()
  }  
}

document.onreadystatechange = () => { if (document.readyState === 'complete') application() }