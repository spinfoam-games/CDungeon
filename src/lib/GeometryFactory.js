const GeometryFactory = (brightnessMap) => {
  const createFloorAndCeiling = (dx, dz) => {
    const xOffset = dx * 400
    const zOffset = dz * 400 + 200
    const brightness = brightnessMap[Math.abs(dz)] || 0;
  
    const corridorElement = document.createElement('div')
    corridorElement.setAttribute('class', 'corridor')
    corridorElement.setAttribute('style', `transform: translate3d(${xOffset}px, 0, ${zOffset}px)`)
  
    const ceiling = document.createElement('div')
    ceiling.setAttribute('class', 'ceiling')
    ceiling.setAttribute('style', `filter: brightness(${brightness});`)
  
    const floor = document.createElement('div')
    floor.setAttribute('class', 'floor')
    floor.setAttribute('style', `filter: brightness(${brightness});`)
    
    corridorElement.appendChild(ceiling)
    corridorElement.appendChild(floor)
  
    const applicationElement = document.getElementById('viewport')
    applicationElement.appendChild(corridorElement)
  }
  
  const createCube = (dx, dz, needsLeft, needsRight, mx, my) => {
    const xOffset = dx * 400
    const zOffset = dz * 400 + 200
    const brightness = brightnessMap[Math.abs(dz)] || 0;
  
    const cubeElement = document.createElement('div')
    cubeElement.setAttribute('class', 'cube')
    cubeElement.setAttribute('style', `transform: translate3d(${xOffset}px, 0, ${zOffset}px)`)
  
    const wallElements = []
  
    if (needsLeft) {
      const left = document.createElement('div')
      left.setAttribute('class', 'left')
      left.setAttribute('style', `filter: brightness(${brightness});`)
      wallElements.push(left)
    }
  
    if (needsRight) {
      const right = document.createElement('div')
      right.setAttribute('class', 'right')
      right.setAttribute('style', `filter: brightness(${brightness});`)
      wallElements.push(right)
    }
  
    const front = document.createElement('div')
    front.setAttribute('class', 'front')
    front.setAttribute('style', `filter: brightness(${brightness});`)
    //front.innerText = `${mx}, ${my}`
    wallElements.push(front)
  
    wallElements.forEach(wall => cubeElement.appendChild(wall))
    
    const applicationElement = document.getElementById('viewport')
    applicationElement.appendChild(cubeElement)
  }

  return {
    createCube,
    createFloorAndCeiling
  }
}

export default GeometryFactory