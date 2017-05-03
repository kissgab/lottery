const Draw = require('./draw')
const StrategyRandom = require('./strategies/random')
const StrategyWeightedRandom = require('./strategies/weightedrandom')
const StrategyWeightedRandomDesc = require('./strategies/weightedrandomdesc')
const HtmlExporter = require('./exporters/html')
const StatisticsImgExporter = require('./exporters/statisticsimg')
const _ = require('lodash')

function Lottery () {
  this.draws = []
  this.strategies = [
    new StrategyRandom(2),
    new StrategyWeightedRandom(2),
    new StrategyWeightedRandomDesc(5)
  ]
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
  for (let draw of this.getDraws('2015-01')) {
    _.every(this.strategies, (strategy) => strategy.iterate(draw))
  }
}

Lottery.prototype.exportSimulations = function (basePath) {
  _.every(this.strategies, (strategy) => strategy.export(new HtmlExporter(basePath)))
}

Lottery.prototype.exportStatistics = function (basePath) {
  var exporter = new StatisticsImgExporter(basePath)
  exporter.export(this.getDraws('2014-01'))
}

module.exports = exports = Lottery
