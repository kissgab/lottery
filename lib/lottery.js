const Draw = require('./draw')
const _ = require('lodash')

function Lottery () {
  this.draws = []
}

Lottery.prototype.createDrawsFromList = function (rows) {
  var draw
  for (let row of rows) {
    draw = new Draw()
    draw.createFromList(row)
    this.draws.push(draw)
  }

  this.draws = _.sortBy(this.draws, 'yearAndWeek')
}

module.exports = exports = Lottery
