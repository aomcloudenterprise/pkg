#!/usr/bin/env node

'use strict';

let path = require('path');
let assert = require('assert');
let utils = require('../utils.js');

assert(!module.parent);
assert(__dirname === process.cwd());

let flags = process.argv.slice(2);
let input = './src/app.js';
let output = './run-time/app-output.exe';

let left, right;
utils.mkdirp.sync(path.dirname(output));

left = utils.spawn.sync(
  'node', [ path.basename(input) ],
  { cwd: path.dirname(input) }
);

utils.pkg.sync(flags.concat([
  '--config', './config.js',
  '--output', output, input
]));

right = utils.spawn.sync(
  './' + path.basename(output), [],
  { cwd: path.dirname(output) }
);

assert.equal(left, right);
utils.vacuum.sync(path.dirname(output));
