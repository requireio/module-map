"use strict"

var test = require('tape')

var ModuleMap = require('../../')(__dirname)

// order matters!
ModuleMap(function(content, filename) {
  return content.replace('REPLACEME', 'first')
})

ModuleMap(function(content, filename) {
  return content.replace('first', 'second')
})

test('modules map functions are applied in the order they are added', function(t) {
  var actual = require('./test')
  t.equal(actual, 'second', 'should have been replaced twice')
  t.end()
})
