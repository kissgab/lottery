const util = require('util')
const Base = require('./base')
const Game = require('../game')
const _ = require('lodash')

function WeightedRandom (numOfGame) {
  Base.call(this, 'weightedrandom')
  this.numOfGame = numOfGame
  this.numberWeights = []
  for (let c = 0; c < 45; c++) {
    this.numberWeights.push({
      weight: 0, id: c + 1
    })
  }
}

util.inherits(WeightedRandom, Base)

WeightedRandom.prototype.onIterationAdded = function (iteration) {
  iteration.preDraw.numbers.map((number) => {
    this.numberWeights[number - 1].weight++
  })
}

WeightedRandom.prototype.generateGames = function () {
  var game
  var games = []

  var range = _.shuffle(_.slice(_.reverse(_.sortBy(this.numberWeights, 'weight')), 0, this.numOfGame * 6))

  for (let i = 0; i < this.numOfGame; i++) {
    game = new Game()
    for (let c = 0; c < 6; c++) {
      game.addNumber(range.shift().id)
    }

    games.push(game)
  }

  return games
}

module.exports = exports = WeightedRandom
