function Simulation (strategy) {
  this.strategy = strategy
}

Simulation.prototype.iterate = function (draw) {
  this.strategy.registerDraw(draw)
  return this.strategy.generateGames()
}

module.exports = exports = Simulation
