"use strict"

var test = require('tape')

var ModuleMap = require('../../').Map()

ModuleMap(function(content, filename) {
  return content.replace('REPLACEME', 'replaced!')
})

test('when recursive option is set, child modules are not ignored', function(t) {
  var actual = require('./test')
  t.equal(actual.level0, 'replaced!')
  t.equal(actual.level1, 'replaced!')
  t.end()
})
