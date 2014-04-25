var Module = require('module')
var path = require('path')

module.exports = mapExtension

function mapExtension(directory) {
  return function(map) {
    var _compile = Module.prototype._compile

    Module.prototype._compile = overridden

    function overridden(content, filename) {
      var shouldTransform = !/\/node_modules\//.test(
        path.relative(directory, filename)
      )

      if (shouldTransform) {
        content = map(content, filename)
      }

      return _compile.call(this, content, filename)
    }
  }
}
