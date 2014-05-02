"use strict"

var path = require('path')
var defaults = require('defaults')

var Module = require('module')

module.exports = mapExtension

function mapExtension(directory) {

  var _compile = Module.prototype._compile
  Module.prototype._compile = overriddenCompile

  var mappings = []
  var beforeMappings = []
  var afterMappings = []

  function overriddenCompile(content, filename) {
    var fns = beforeMappings.concat(mappings).concat(afterMappings)
    content = fns.reduce(function(content, map) {
      if (!doMapping(directory, filename)) return content
      return map(content, filename)
    }, content)
    return _compile.call(this, content, filename)
  }

  function map(fn) {
    mappings.push(fn)
  }
  map.before = function before(fn) {
    beforeMappings.push(fn)
  }
  map.after = function after(fn) {
    afterMappings.push(fn)
  }
  return map
}

function doMapping(directory, filename) {
  if (!directory) return true
  // ignore if node_modules is anywhere in the path between requirer
  // and requiree
  return !(
    /node_modules\//.test(path.relative(filename, directory)) ||
    /node_modules\//.test(path.relative(directory, filename))
  )
}

