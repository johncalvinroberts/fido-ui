#!/usr/bin/env node

//command line config stuff
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const vorpal = require('vorpal')()
const log = console.log

//compile functions
const creatFidoConfig = require('./create-fido-config')


const pagePresets = [{id: 1, name: 'goober', title: 'fucko'}, {id: 2, name: 'dober', title: 'fucko'}, {id: 3, name: 'freedom', title: 'fucko'}]
const componentPresets = [{id: 1, name: 'goober', title: 'fucko'}, {id: 2, name: 'dober', title: 'fucko'}, {id: 3, name: 'freedom', title: 'fucko'}]



function getPrimaryHex(that) {
  return that.prompt({
    type: 'input',
    name: 'primaryHex',
    message: 'Please enter primary hexcode for your project: '
  })
}

function getSecondaryHex (that) {
  return that.prompt({
    type: 'input',
    name: 'secondaryHex',
    message: 'Please enter secondary hexcode for your project: '
  })
}



//initialize a project
vorpal
  .command('init')
  .description('Initialize a fido project.')
  .action(function(args, callback) {
      log(chalk.green`
              汪汪汪
              new fido project!!! 🐶 🐶
              Let's generate the base styles first.
        `)
    getPrimaryHex(this)
    .then(result => {
      getSecondaryHex(this)
      .then(secondResult => {
        const resultObj = {
          primary: result.primaryHex,
          secondary: secondResult.secondaryHex
        }
        //regex for valid hexidecimal color codes, hashtag optional
        const regex = /^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/
        for (const key in resultObj){
          if (!regex.test(resultObj[key])){
            return log(chalk.red`Oopsies!!! Please enter a valid hex color code for ${key}`)
          }
          const arr = resultObj[key].split('')
          if (arr[0] !== '#') resultObj[key] = `#${resultObj[key]}`
        }
        log(chalk.green('color codes check out!'))
        creatFidoConfig(resultObj)
        .then(res => {
          console.log(res)
          log(chalk.green`
          yoooo
          nice job
          created your config file and a base style sheet!!!
          `)
        })
        .catch(err => log(chalk.red(err)))

      })
      .catch(error => chalk.error(log(error)))
    })
    .catch(error => chalk.error(log(error)))
  })


vorpal
  .command('page <pageName>')
  .description('Generate a new page from a fido preset')
  .action(function(pageName) {
    log(`
          汪汪
          Creating a new page named ${pageName}
      `)
    this.prompt({
      type: 'list',
      name: 'pagePreset',
      choices: pagePresets.map((page) => ({
        name: `${page.title} | ${page.name} | ${page.id}`,
        value: page.id
      })),
      message: 'Please choose the page preset: '
    })
    .then(result => log(result))
    .catch(error => chalk.error(log(error)))
})

vorpal
    .command('component <compName>')
    .description('Generate a new component from a fido preset')
    .action(function(compName) {
      log(`
            汪
            Creating a new component named ${compName}
        `)
      this.prompt({
        type: 'list',
        name: 'compPreset',
        choices: componentPresets.map((comp) => ({
          name: `${comp.title} | ${comp.name} | ${comp.id}`,
          value: comp.id
        })),
        message: 'Please choose the component preset: '
      })
      .then(result => log(result))
      .catch(error => chalk.error(log(error)))
  })




//parse the node TTY instance into vorpal lol
vorpal
  .version('0.0.1')
  .delimiter('')
  .show()
  .parse(process.argv)

