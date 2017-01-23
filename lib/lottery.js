const Simulation = require('./simulation')
const Draw = require('./draw')
const StrategyRandom = require('./strategies/random')
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

Lottery.prototype.getNumberDistribution = function (rows) {
  var dist = []
  for (let i = 0; i <= 45; i++) {
    dist[i] = 0
  }

  for (let draw of this.draws) {
    if (draw.year >= 2016) {
      for (let number of draw.numbers) {
        dist[number]++
      }
    }
  }

  return dist
}

Lottery.prototype.getDraws = function* (from, to) {
  for (let draw of this.draws) {
    yield draw
  }
}

Lottery.prototype.runSimulations = function () {
  // var numbers = null
  // var results = []
  // var result

  var simulation = new Simulation(new StrategyRandom(2))
  var iterationResult

  for (let draw of this.getDraws()) {
    iterationResult = simulation.iterate(draw)
    console.log(iterationResult)
  }
  // for (let draw of this.draws) {
  //   result = {
  //     draw: draw,
  //     strategyResults: []
  //   }
  //   for (let strategy of this.strategies) {
  //     iteration = strategy.iterate(draw)
  //     this.asdad(numbers)
  //   }
  //   results.push(result)
  // }
  //
  // return results
}

module.exports = exports = Lottery
