function Simulation (strategy) {
  this.strategy = strategy
}

Simulation.prototype.iterate = function (draw) {
  this.strategy.iterate(draw)
}

Simulation.prototype.export = function (exporter) {
  this.strategy.export(exporter)
}

module.exports = exports = Simulation
