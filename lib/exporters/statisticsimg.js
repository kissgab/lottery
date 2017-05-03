const path = require('path')
// const fs = require('fs')
const Jimp = require('jimp')

function StatisticsImgExporter (basePath) {
  this.basePath = basePath
  this.name = null
  this.tileWidth = 10
  this.tileHeight = 10
  this.bgColor = 0x000000FF
  this.activeColor = 0x00DD00FF
  this.inactiveColor = 0x555555FF
  this.gridColor = 0x333333FF
  this.gridWidth = 1
}

StatisticsImgExporter.prototype.setTile = function (image, x, y, color) {
  const xo = x * this.tileWidth + (x + 1) * this.gridWidth
  const yo = y * this.tileHeight + (y + 1) * this.gridWidth
  for (let xi = 0; xi < this.tileWidth; xi++) {
    for (let yi = 0; yi < this.tileHeight; yi++) {
      image.setPixelColor(color, xo + xi, yo + yi)
    }
  }

  for (let xi = 0; xi < this.tileWidth + 2 * this.gridWidth; xi++) {
    image.setPixelColor(this.gridColor, xo - this.gridWidth + xi, yo - this.gridWidth)
    image.setPixelColor(this.gridColor, xo - this.gridWidth + xi, yo + this.tileHeight)
  }

  for (let yi = 0; yi < this.tileHeight + 2 * this.gridWidth; yi++) {
    image.setPixelColor(this.gridColor, xo - this.gridWidth, yo - this.gridWidth + yi)
    image.setPixelColor(this.gridColor, xo + this.tileHeight, yo - this.gridWidth + yi)
  }
}

StatisticsImgExporter.prototype.export = function (draws) {
  var filename = path.join(this.basePath, 'statistics.png')
  var drawsCount = 0
  var drawsData = []
  var imageWidth
  var imageHeight

  for (let draw of draws) {
    drawsData.push({year: draw.year, week: draw.week, numbers: draw.numbers})
    drawsCount++
  }

  imageWidth = drawsCount * this.tileWidth + (drawsCount + 1) * this.gridWidth
  imageHeight = 45 * this.tileHeight + (45 + 1) * this.gridWidth

  var image = new Jimp(imageWidth, imageHeight, this.bgColor, (err, image) => {
      for (var n = 1; n <= 45; n++) {
        for (var d = 0; d < drawsData.length; d++) {
          this.setTile(image, d, n - 1, drawsData[d].numbers.indexOf(n) === -1 ? this.inactiveColor : this.activeColor)
        }
      }
      image.write(filename)
  })

  // fs.writeFileSync(filename, this.template({
  //   drawsData: drawsData
  //   // iterations: this.iterations
  // }))
}

module.exports = exports = StatisticsImgExporter
