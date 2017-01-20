const Draw = require('./draw')
const _ = require('lodash')

function Lottery () {
  this.draws = []
  this.strategies = []
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

Lottery.prototype.createDrawsFromList = function (rows) {
}

Lottery.prototype.runSimulations = function () {
  var numbers = null
  var results = []
  var result

  for (let draw of this.draws) {
    result = {
      draw: draw,
      strategyResults: []
    }
    for (let strategy of this.strategies) {
      iteration = strategy.iterate(draw)
      this.asdad(numbers)
    }
    results.push(result)
  }

  return results
}

module.exports = exports = Lottery
