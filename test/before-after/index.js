"use strict"

var test = require('tape')

var ModuleMap = require('../../').Map(__dirname)

ModuleMap.after(function(content, filename) {
  return content.replace('during', 'after')
})

ModuleMap.before(function(content, filename) {
  return content.replace('REPLACEME', 'before')
})

ModuleMap(function(content, filename) {
  return content.replace('before', 'during')
})

test('before/after sequence', function(t) {
  var actual = require('./test')
  t.equal(actual.level0, 'after')
  t.end()
})
