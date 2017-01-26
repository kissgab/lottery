const rwc = require('random-weighted-choice')
const _ = require('lodash')

function Game () {
  this.numbers = []
}

Game.prototype.sortNumbers = function () {
  this.numbers = _.sortBy(this.numbers, _.toInteger)
}

Game.prototype.generateFreeRandomNumber = function (weightTable) {
  var number
  do {
    if (weightTable) {
      number = rwc(weightTable)
    } else {
      number = Math.round(Math.random() * 45) + 1
    }
  } while (this.numbers.indexOf(number) !== -1)
  return number
}

Game.prototype.generateRandomNumbers = function (count, weightTable) {
  for (let i = 0; i < count; i++) {
    this.numbers.push(this.generateFreeRandomNumber(weightTable))
    if (this.numbers.length > 6) {
      throw new Error('Too much random numbers generated')
    }
  }

  this.sortNumbers()
}

Game.prototype.addNumber = function (number) {
  var n = _.toInteger(number)
  if (this.numbers.indexOf(n) !== -1) {
    throw new Error('Number ' + n + ' already in the list')
  }
  this.numbers.push(n)
  if (this.numbers.length > 6) {
    throw new Error('Too much random numbers generated')
  }
  this.sortNumbers()
}

module.exports = exports = Game
