function Iteration () {
  this.games = []
  this.preDraw = null
  this.postDraw = null
}

Iteration.prototype.evalDraw = function (draw) {
  this.postDraw = draw
}

module.exports = exports = Iteration
