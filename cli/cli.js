#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const commander = require('commander')
const chalk = require('chalk')
const vorpal = require('vorpal')()
const log = console.log

const stylePresets = [{id: 1, name: 'goober', title: 'fucko'}, {id: 2, name: 'dober', title: 'fucko'}, {id: 3, name: 'freedom', title: 'fucko'}]


vorpal
  .command('init')
  .description('Initialize a fido project.')
  .action(function(args, callback) {
    this.prompt({
      type: 'list',
      name: 'themeId',
      choices: themes.map((theme) => ({
        name: `${theme.title} | ${theme.name} | ${theme.id}`,
        value: theme.id
      })),
      message: 'Choose theme to download'
    })
    .then(result => log(result))
    .catch(error => chalk.error(log(error)))
  })

function initFido () {
  log(chalk.green`
          new fido project!!! 🐶 🐶
          hehehehe
    `)
  vorpal
    .show()
    .parse(process.argv)
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
