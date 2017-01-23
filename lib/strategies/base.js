function Base () {
  this.draws = []
}

Base.prototype.registerDraw = function (draw) {
  this.draws.push(draw)
}

module.exports = exports = Base
