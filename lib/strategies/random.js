const util = require('util')
const Base = require('./base')
const Game = require('../game')

function Random (numOfGame) {
  Base.call(this, 'random')
  this.numOfGame = numOfGame
}

util.inherits(Random, Base)

Random.prototype.generateGames = function () {
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
