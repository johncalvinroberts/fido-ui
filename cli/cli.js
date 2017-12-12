#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const commander = require('commander')
const chalk = require('chalk')
const vorpal = require('vorpal')
const log = console.log

function initFido () {
  log(chalk.green`
          new fido project!!!🐶🐶
          heheheh
    `)
}


function generatePage (pageName) {
  log(`generating a page named...${pageName}`)
}

function generateComp (compName) {
  log(chalk.green(`generating a component named..${compName}`))
}

//declare commander format
commander.usage('[command] <options ...>')

commander.
  command('init')
  .description('add fido to your project')
  .action(name => {
    initFido()
})
commander
  .command('page <pageName> <pagePreset>')
  .description('Generate a new page from a fido preset')
  .action(pageName => {
  generatePage(pageName)
})
commander
  .command('component <compName> <compPreset>')
  .description('Generate a new page from a fido preset')
  .action(compName => {
  generateComp(compName)
})


commander.parse(process.argv)
if (!commander.args.length) commander.help()
