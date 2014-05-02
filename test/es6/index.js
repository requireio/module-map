"use strict"

var test = require('tape')

var ModuleMap = require('../../').Map(__dirname)
var transpile = require('./transpile')

ModuleMap(transpile)

test('es6 is transpiled and executed', function(t) {
  var actual = require('./test')
  t.deepEqual(actual, ['Hugh', 'Tim'])
  t.end()
})
