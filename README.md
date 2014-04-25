# module-map

Transform module source at require-time.

## Installation

```bash
> npm install --save module-map
```

## Usage

```js
// ./some/module.js

module.exports = function() {
  return 'Hello World'
}
```

```js
// index.js

var ModuleMap = require('module-map')(__dirname)

ModuleMap(function(content, filename) {
  // modify the source code!
  return content.replace('Hello World', 'HELLO WORLD')
})

// functions are applied in order
ModuleMap(function(content, filename) {
  return content.replace('HELLO WORLD', 'HELLO WORLD!')
})

// elsewhere...

var hello = require('./some/module')
console.log(hello()) // HELLO WORLD!

```

## Caveats

* Does not work with .json files, or any custom require extension that
produces JSON output e.g. require-yaml

## License

MIT
