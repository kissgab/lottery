const Simulation = require('./simulation')
const Draw = require('./draw')
const StrategyRandom = require('./strategies/random')
const HtmlExporter = require('./exporters/html')
const _ = require('lodash')

function Lottery () {
  this.draws = []
  this.strategies = []
  this.simulations = []
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

Lottery.prototype.getDraws = function* (fromYearAndWeek, toYearAndWeek) {
  for (let draw of this.draws) {
    if (draw.isInYearAndWeekPeriod(fromYearAndWeek, toYearAndWeek)) {
      yield draw
    }
  }
}

Lottery.prototype.runSimulations = function () {
  this.simulations = [
    new Simulation(new StrategyRandom(2))
  ]

  for (let draw of this.getDraws('2016-01')) {
    _.every(this.simulations, (simulation) => simulation.iterate(draw))
  }
}

Lottery.prototype.exportSimulations = function (basePath) {
  _.every(this.simulations, (simulation) => simulation.export(new HtmlExporter(basePath)))
}

module.exports = exports = Lottery
