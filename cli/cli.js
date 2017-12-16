#!/usr/bin/env node

//command line config stuff
const path = require('path')
const chalk = require('chalk')
const vorpal = require('vorpal')()
const fs = require('fs-extra')
const log = console.log

//compile functions
const createFidoConfig = require('./create-fido-config')


const pagePresets = [{id: 1, name: 'goober', title: 'fucko'}, {id: 2, name: 'dober', title: 'fucko'}, {id: 3, name: 'freedom', title: 'fucko'}]
const componentPresets = [{id: 1, name: 'goober', title: 'fucko'}, {id: 2, name: 'dober', title: 'fucko'}, {id: 3, name: 'freedom', title: 'fucko'}]

const fidoFile = fs.pathExistsSync('./fidofile.json')

const vorpalFuncs = {
  getProjectName (that) {
    return that.prompt({
      type: 'input',
      name: 'projectName',
      message: 'Please enter your project name: '
    })
  },

  getPrimaryHex(that) {
    return that.prompt({
      type: 'input',
      name: 'primaryHex',
      message: 'Please enter primary hexcode for your project: '
    })
  },

  getSecondaryHex (that) {
    return that.prompt({
      type: 'input',
      name: 'secondaryHex',
      message: 'Please enter secondary hexcode for your project: '
    })
  },

  getColors(that, projectName) {
    this.getPrimaryHex(that)
    .then(result => {
      this.getSecondaryHex(that)
      .then(secondResult => {
        const resultObj = {
          name: projectName,
          styles: {
            primary: result.primaryHex,
            secondary: secondResult.secondaryHex
          }
        }
        //regex for validating hexidecimal color codes, hashtag optional
        const regex = /^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/
        for (const key in resultObj.styles){
          if (!regex.test(resultObj.styles[key])){
            return log(chalk.red`Oopsies!!! Please enter a valid hex color code for ${key}`)
          }
          const arr = resultObj.styles[key].split('')
          if (arr[0] !== '#') resultObj.styles[key] = `#${resultObj.styles[key]}`
        }
        log(chalk.green('color codes check out!'))
        createFidoConfig(resultObj)
        .then(res => {
          log(chalk.green`
          nice job!!
          you created your config file and a base style sheet!!!
          `)
        })
        .catch(err => log(chalk.red(err)))

      })
      .catch(error => chalk.error(log(error)))
    })
  }
}



//initialize a project
vorpal
  .command('init')
  .description('Initialize a fido project.')
  .action(function(...args) {
    if (fidoFile){
      log(chalk.green`
            Looks like you are already set up with fido my guy/gal dude.
            You can edit your fido base styles if you want~
        `)
      vorpal.execSync('edit')
    } else {
      log(chalk.green`
              汪汪汪
              new fido project!!! 🐶 🐶
              Let's generate the base styles first.
        `)

      vorpalFuncs.getProjectName(this)
      .then(projectName => {
        const nonObjProjName = projectName.projectName
        vorpalFuncs.getColors(this, nonObjProjName)
      })
      .catch(error => chalk.error(log(error)))
    }
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

vorpal
    .command('edit')
    .description('Edit your fido base styles')
    .action(function(...args){
      this.prompt({
        type: 'confirm',
        name: 'confirmEdit',
        message: 'Do you want to edit your fido base styles?'
      })
      .then(res => {
        if (res.confirmEdit) {
          fs.readJson('./fidofile.json')
          .then(fileObj =>{
            const name = fileObj.name
            vorpalFuncs.getColors(this, name)
          })
          .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
    })


//parse the node TTY instance into vorpal lol
vorpal
  .version('0.0.1')
  .delimiter('')
  .show()
  .parse(process.argv)

