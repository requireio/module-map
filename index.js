"use strict"

var up = require('findup').sync
var ModuleMap = require('./map')
var dirname = require('path').dirname
var path = require('path')

module.exports = PackageMap
module.exports.Map = ModuleMap

var processed = {}

function PackageMap(filename) {
  if (processed[filename]) return false

  var dir = up(dirname(filename), 'package.json')
  var pkg = require(path.resolve(dir, 'package.json'))

  var mappings = toArray(pkg['module-map'])
  if (!mappings.length) return

  var moduleMap = ModuleMap(dir)
  mappings.forEach(function(mapping) {
    var fn = require(path.resolve(dir, mapping))
    moduleMap(fn)
  })
  processed[filename] = moduleMap

  delete require.cache[filename]
  require(filename) // reload file
  return true
}

function toArray(item) {
  if (!item) return []
  if (Array.isArray(item)) return item
  return [item]
}
