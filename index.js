"use strict"

var path = require('path')
var defaults = require('defaults')

var Module = require('module')

module.exports = mapExtension

function mapExtension(directory) {

  var _compile = Module.prototype._compile
  Module.prototype._compile = overridden

  var fns = []

  function overridden(content, filename) {
    content = fns.reduce(function(content, map) {
      if (!doMapping(directory, filename)) return content
      return map(content)
    }, content)

    return _compile.call(this, content, filename)
  }

  function map(fn) {
    fns.push(fn)
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
