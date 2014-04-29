"use strict"

var test = require('tape')

var ModuleMap = require('../../')(__dirname)

test('filenames are passed to map', function(t) {
  t.plan(1)
  ModuleMap(function(content, filename) {
    t.equal(filename, require.resolve('./test'))
    return content
  })
  var actual = require('./test')
  t.end()
})
