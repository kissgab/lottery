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

function Html (basePath) {
  this.basePath = basePath
  this.name = null
  this.iterations = []
  this.template = Handlebars.compile(`
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html lang="en">
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <title>{{name}}</title>
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
          .game {
            clear: both;
          }
          .game span {
            margin: 3px;
            display: block;
            width: 25px;
            height: 25px;
            line-height: 27px;
            text-align: center;
            float: left;
            border: 1px solid #999;
          }
          .game .nowin {
            color: #555;
            font-weight: normal;
          }
          .game .win {
            color: green;
            font-weight: bold;
            background-color: #ddd;
          }
        </style>
      </head>
      <body>
        <table>
          <tr>
            <th>Week</th>
            <th>Numbers</th>
            <th>Games</th>
          </tr>
          {{#each iterations}}
            <tr>
              <td>{{postDraw.year}}/{{postDraw.week}}</td>
              <td>{{printNumbers postDraw.numbers}}</td>
              <td>
                {{#each games}}
                  {{printGame this ../postDraw.numbers}}
                {{/each}}
              </td>
            </tr>
          {{/each}}
        </table>
      </body>
    </html>
  `)
}

Html.prototype.begin = function (name) {
  this.name = name
}

Html.prototype.addIteration = function (iteration) {
  this.iterations.push(iteration)
  return this
}

Html.prototype.end = function () {
  var filename = path.join(this.basePath, this.name + '.html')
  fs.writeFileSync(filename, this.template({
    name: this.name,
    iterations: this.iterations
  }))
}

module.exports = exports = Html
