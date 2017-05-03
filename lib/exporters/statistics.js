const path = require('path')
const fs = require('fs')
const Handlebars = require('handlebars')

function printNumbers (numbers, winNumbers) {
  var markedNumbers = numbers.map((number) => {
    var className = winNumbers && winNumbers.indexOf(number) !== -1 ? 'win' : 'nowin'
    return '<span class="' + className + '">' + number + '</span>'
  })
  return '<div class="game">' + markedNumbers.join('') + '</div>'
}

Handlebars.registerHelper('printNumbers', (numbers) => {
  return new Handlebars.SafeString(numbers ? printNumbers(numbers) : 'GUESS')
})

Handlebars.registerHelper('printGame', (game, winNumbers) => {
  return new Handlebars.SafeString(printNumbers(game.numbers, winNumbers))
})

Handlebars.registerHelper('json', (context) => {
  return JSON.stringify(context)
})

function Statistics (basePath) {
  this.basePath = basePath
  this.name = null
  this.iterations = []
  this.template = Handlebars.compile(`
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html lang="en">
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <title>Statistics</title>
        <style>
          table {
            border-collapse: collapse;
          }
          table th, table td {
            border: 1px solid #666;
            padding: 5px 15px;
            color: #333;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          var drawsData = {{{ json drawsData }}}

        </script>
      </body>
    </html>
  `)
}

Statistics.prototype.export = function (draws) {
  var filename = path.join(this.basePath, 'statistics.html')
  var drawsData = []

  for (let draw of draws) {
    drawsData.push({year: draw.year, week: draw.week, numbers: draw.numbers})
  }

  fs.writeFileSync(filename, this.template({
    drawsData: drawsData
    // iterations: this.iterations
  }))
}

module.exports = exports = Statistics
