var map = require(process.argv[3])

require('../')(__dirname)(function(src, filename) {
  return map(src, filename)
})

require(process.argv[2])
