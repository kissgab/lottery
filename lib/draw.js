const _ = require('lodash')

function Draw () {
  this.year = null
  this.week = null
  this.yearAndWeek = null
  this.hitCount6 = 0
  this.hitCount5 = 0
  this.hitCount4 = 0
  this.hitCount3 = 0
  this.winAmount6 = 0
  this.winAmount5 = 0
  this.winAmount4 = 0
  this.winAmount3 = 0
  this.numbers = []
}

Draw.prototype.convertAmountToNumber = function (amount) {
  return _.toInteger(amount.replace(/[^\d.-]/g, ''))
}

Draw.prototype.createFromList = function (data) {
  this.year = _.toInteger(data[0])
  this.week = _.toInteger(data[1])
  this.week = (this.week < 10 ? '0' : '') + this.week
  this.yearAndWeek = this.year + ':' + this.week
  this.hitCount6 = _.toInteger(data[3])
  this.winAmount6 = this.convertAmountToNumber(data[4])
  this.hitCount5 = _.toInteger(data[7])
  this.winAmount5 = this.convertAmountToNumber(data[8])
  this.hitCount4 = _.toInteger(data[9])
  this.winAmount4 = this.convertAmountToNumber(data[10])
  this.hitCount3 = _.toInteger(data[11])
  this.winAmount3 = this.convertAmountToNumber(data[12])

  this.numbers = _.sortBy([
    _.toInteger(data[13]),
    _.toInteger(data[14]),
    _.toInteger(data[15]),
    _.toInteger(data[16]),
    _.toInteger(data[17]),
    _.toInteger(data[18])
  ], _.toInteger)
}

Draw.prototype.isInYearAndWeekPeriod = function (fromYearAndWeek, toYearAndWeek) {
  if (fromYearAndWeek && this.yearAndWeek < fromYearAndWeek) {
    return false
  }
  if (toYearAndWeek && this.yearAndWeek > toYearAndWeek) {
    return false
  }
  return true
}

module.exports = exports = Draw
