"use strict"

var test = require('tape')

test('entire package can be mapped', function(t) {
  global.counter = 0
  var actual = require('level1')
  t.equal(actual, 'replaced!')
  t.equal(counter, 1)
  t.end()
  delete global.counter
})
