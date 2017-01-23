const util = require('util')
const Base = require('./base')
const Game = require('../game')

function Random (numOfGame) {
  Base.call(this)
  this.numOfGame = numOfGame
}

util.inherits(Random, Base)

Random.prototype.generateGames = function (draw) {
  var game
  var games = []

  for (let i = 0; i < this.numOfGame; i++) {
    game = new Game()
    game.generateRandomNumbers(6)
    games.push(game)
  }

  return games
}

module.exports = exports = Random
