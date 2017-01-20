const Promise = require('bluebird')
const csv = require('fast-csv')

module.exports = exports = ((ns) => {
  ns.readCSV = function (filepath) {
    return new Promise((resolve, reject) => {
      var items = []
      csv
        .fromPath(filepath, {delimiter: ';'})
        .on('data', (data) => {
          items.push(data)
        })
        .on('end', () => {
          resolve(items)
        })
        .on('error', (err) => {
          reject(err)
        })
    })
  }

  return ns
})({})
