"use strict"

var test = require('tape')

var ModuleMap = require('../../').Map(__dirname)

ModuleMap(function(content, filename) {
  return content.replace('REPLACEME', 'replaced!')
})

test('value returned from map becomes module content', function(t) {
  var actual = require('./test')
  t.equal(actual, 'replaced!', 'content should be replaced')
  t.end()
})
