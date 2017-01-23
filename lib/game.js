const _ = require('lodash')

function Game () {
  this.numbers = []
}

Game.prototype.sortNumbers = function () {
  this.numbers = _.sortBy(this.numbers, _.toInteger)
}

Game.prototype.generateFreeRandomNumber = function () {
  var number
  do {
    number = Math.round(Math.random() * 45) + 1
  } while (this.numbers.indexOf(number) !== -1)
  return number
}

Game.prototype.generateRandomNumbers = function (count) {
  for (let i = 0; i < count; i++) {
    this.numbers.push(this.generateFreeRandomNumber())
    if (this.numbers.length > 6) {
      throw new Error('Too much random numbers generated')
    }
  }

  this.sortNumbers()
}

module.exports = exports = Game
