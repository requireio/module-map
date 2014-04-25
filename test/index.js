"use strict"

var test = require('tape')
var spawn = require('child_process').spawn

var tests = [
  "./modify-content/index.js",
  "./not-recursive/index.js",
  "./multiple/index.js",
  "./recursive/index.js",
  "./custom-directory/index.js",
  "./es6/index.js",
]

var pendingTests = tests.slice()
tests.forEach(function(cmd) {
  test(cmd, function(t) {
    t.plan(1)
    runTest(cmd, function(err) {
      t.ifError(err)
    })
  })
})

function runTest(cmd, done) {
  // These tests necessarily modify require, so we run them in their own
  // process to ensure they can't affect each other or test runner itself.
  spawn(process.execPath, cmd.split(' '), {
    cwd: __dirname
  }).on('close', function(exitCode) {
    if (exitCode !== 0) return done(new Error('expected 0 exit code: ' + cmd))
    done()
  })
  .on('error', done)
}
