const Iteration = require('../iteration')
const _ = require('lodash')

function Base (name) {
  this.name = name
  this.iterations = []
  this.lastIteration = null
}

Base.prototype.generateGames = function () {
  throw new Error('Method not implemented  (generateGames)')
}

Base.prototype.iterate = function (draw) {
  var iteration = new Iteration()
  if (this.lastIteration) {
    this.lastIteration.evalDraw(draw)
  }
  iteration.preDraw = draw
  iteration.games = this.generateGames()
  this.lastIteration = iteration
  this.iterations.push(this.lastIteration)
  return iteration
}

Base.prototype.export = function (exporter) {
  exporter.begin(this.name)
  _.every(this.iterations, (iteration) => exporter.addIteration(iteration))
  exporter.end()
}

module.exports = exports = Base
