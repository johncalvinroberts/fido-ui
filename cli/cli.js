#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const vorpal = require('vorpal')()
const log = console.log

const pagePresets = [{id: 1, name: 'goober', title: 'fucko'}, {id: 2, name: 'dober', title: 'fucko'}, {id: 3, name: 'freedom', title: 'fucko'}]
const componentPresets = [{id: 1, name: 'goober', title: 'fucko'}, {id: 2, name: 'dober', title: 'fucko'}, {id: 3, name: 'freedom', title: 'fucko'}]




//initialize a project
vorpal
  .command('init')
  .description('Initialize a fido project.')
  .action(function(args, callback) {
      log(chalk.green`
              new fido project!!! 🐶 🐶
              Let's generate the base styles first.
        `)
    this.prompt({
      type: 'input',
      name: 'primaryHex',
      message: 'Please enter primary hexcode for your project:_'
    })
    .then(result => log(result))
    .catch(error => chalk.error(log(error)))
  })


vorpal
  .command('page <pageName> <pagePreset>')
  .description('Generate a new page from a fido preset')
  .action(function(pageName) {
    this.prompt({
      type: 'list',
      name: 'pagePreset',
      choices: pagePresets.map((page) => ({
        name: `${page.title} | ${page.name} | ${page.id}`,
        value: page.id
      })),
      message: 'Please choose the page preset you want'
    })
    .then(result => log(result))
    .catch(error => chalk.error(log(error)))
})

vorpal
    .command('component <compName> <compPreset>')
    .description('Generate a new component from a fido preset')
    .action(function(compName) {
      this.prompt({
        type: 'list',
        name: 'compPreset',
        choices: componentPresets.map((style) => ({
          name: `${comp.title} | ${comp.name} | ${comp.id}`,
          value: comp.id
        })),
        message: 'Please choose the component preset you want'
      })
      .then(result => log(result))
      .catch(error => chalk.error(log(error)))
  })




//parse the node TTY instance into vorpal
vorpal
  .version('0.0.1')
  .description('Fido command line tool for wechat mini programs')
  .delimiter('fido$')
  .show()
  .parse(process.argv)

