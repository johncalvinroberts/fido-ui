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
          hehehehe
    `)

}


function generatePage (pageName) {
  log(`generating a page named...${pageName}`)
}

function generateComp (compName) {
  log(chalk.green(`generating a component named..${compName}`))
}

//declare commander format
commander
  .version('0.0.1')
  .usage('[command] <options ...>')


//init command, for when adding fido to your project
commander
  .command('init')
  .description('add fido to your project')
  .action(name => {
    initFido()
})

//Generate a page from a UI preset
commander
  .command('page <pageName> <pagePreset>')
  .description('Generate a new page from a fido preset')
  .action(pageName => {
    generatePage(pageName)
})

//Generate a component to add to your project
commander
  .command('component <compName> <compPreset>')
  .description('Generate a new page from a fido preset')
  .action(compName => {
    generateComp(compName)
})


commander.parse(process.argv)
if (!commander.args.length) commander.help()
