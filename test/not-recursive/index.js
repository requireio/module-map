"use strict"

var test = require('tape')

var ModuleMap = require('../../')(__dirname)

ModuleMap(function(content, filename) {
  return content.replace('REPLACEME', 'replaced!')
})

test('by default anything in node_modules is ignored', function(t) {
  var actual = require('./test')
  t.equal(actual.level0, 'replaced!')
  t.equal(actual.level1, 'REPLACEME', 'child modules should be ignored.')
  t.end()
})
