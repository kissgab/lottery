const path = require('path')
const io = require('./lib/io')
const Lottery = require('./lib/lottery')

io.readCSV(path.join(__dirname, 'data', 'hatos.csv'))
.then((items) => {
  var lottery = new Lottery()
  lottery.createDrawsFromList(items)
  return lottery
})
.then((lottery) => {
  lottery.runSimulations()
  return lottery
})
.then((lottery) => {
  lottery.exportSimulations(path.join(__dirname, 'export'))
  return lottery
})
.then((lottery) => {
  lottery.exportStatistics(path.join(__dirname, 'export'))
  return lottery
})
.catch((err) => {
  console.error(err)
})
