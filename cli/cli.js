#!/usr/bin/env node

//command line config stuff
const path = require('path')
const chalk = require('chalk')
const vorpal = require('vorpal')()
const fs = require('fs-extra')
const log = console.log

//compile functions
const createFidoConfig = require('./create-fido-config')
const createComponent = require('./create-component')
const createPage = require('./create-page')

//Get an array of the names of all directories in a source directory
const isDirectory = source => fs.lstatSync(source).isDirectory()
function getDirectories (source) {
  const dirConts = fs.readdirSync(source)
  return dirConts.filter(file => fs.statSync(path.join(source, file)).isDirectory())
}

//Get the contents of the components & pages directorys, check if fidofile is present
const pagePresets = getDirectories(__dirname + '/../src/pages')
const componentPresets = getDirectories(__dirname + '/../src/components')
const fidoFile = fs.pathExistsSync('./fidofile.json')


//Put re-usable vorpal functions in an object, out of global scope
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
        createFidoConfig(resultObj)
        .then(res => {
          log(chalk.green`
          nice!!
          you created your config file and a base style sheet!!!
          `)
        })
        .catch(err => log(chalk.red(err)))

      })
      .catch(error => chalk.error(log(error)))
    })
  }
}



//From here down, we define the actual Vorpal commands
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
            汪汪汪汪汪   FIDO  汪汪汪汪汪
            new fido project!!! 🐶 🐶
            Let's generate the base styles first.
        `)

      vorpalFuncs.getProjectName(this)
      .then(res => {
        vorpalFuncs.getColors(this, res.projectName)
      })
      .catch(error => chalk.error(log(error)))
    }
  })


vorpal
  .command('page <pageName>')
  .description('Generate a new page from a fido preset')
  .action(function(pageName) {
    log(`
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
    .action(function(input) {
      log(`
            Creating a new component named ${input.compName}
        `)
      log(input.compName)
      this.prompt({
        type: 'list',
        name: 'compPreset',
        choices: componentPresets.map((comp) => ({
          name: comp,
          value: comp
        })),
        message: 'Please choose the component preset: '
      })
      .then(result => {
        createComponent(result.compPreset, input.compName)
        .then(res => log('success!! find your new component and require it into pages you want like this:(demo)'))
        .catch(err => log('哎 failed'))
      })
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


//parse the node TTY instance into vorpal and launch this guy lol
vorpal
  .version('0.0.1')
  .delimiter('')
  .show()
  .parse(process.argv)

