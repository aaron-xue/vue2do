#!/usr/bin/env node

const argv = require('yargs')
  .usage('Usage: $0 --app [string]')
  .example('$0 --app example', 'Lunch dev server')
  .option('app', {
    alias: 'a',
    describe: 'App name',
    type: 'string'
  })
  .argv

require('../build/dev')({
  appName: argv.app
})
