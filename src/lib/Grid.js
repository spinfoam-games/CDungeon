function Grid(width, height) {
  this.cells = []
  this.width = width
  this.height = height

  for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      const index = this.toIndex(x, y)
      this.cells[index] = {}
    }
  }
}

Grid.prototype.toIndex = function(x, y) {
  return (y * this.width) + x
}

Grid.prototype.getCellAt = function(x, y) {
  // Must be in bounds
  if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
    return undefined
  }

  return this.cells[this.toIndex(x, y)]
}

Grid.prototype.map = function(fn) {
  for(let y = 0; y < this.height; y++) {
    for(let x = 0; x < this.width; x++) {
      const index = this.toIndex(x, y)
      this.cells[index] = fn(this.cells[index], x, y, index)
    }
  }  
}

Grid.prototype.forEach = function(fn) {
  for(let y = 0; y < this.height; y++) {
    for(let x = 0; x < this.width; x++) {
      const index = this.toIndex(x, y)
      fn(this.cells[index], x, y, index)
    }
  }  
}

export default Grid;