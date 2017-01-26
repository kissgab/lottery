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
  this.iterations.push(iteration)
  this.lastIteration = iteration
  this.onIterationAdded(iteration)
  iteration.games = this.generateGames()
  return iteration
}

Base.prototype.export = function (exporter) {
  exporter.begin(this.name)
  _.every(this.iterations, (iteration) => exporter.addIteration(iteration))
  exporter.end()
  return this
}

Base.prototype.onIterationAdded = function (iteration) {
}

module.exports = exports = Base
