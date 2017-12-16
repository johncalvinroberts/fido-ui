const sass = require('node-sass')
const fs = require('fs-extra')

const sassOptionsDefaults = {
  includePaths: ['src/styles'],
  outputStyle: 'expanded'
}


const sassGenerator = {
  sassVariable (name, value) {
    return "$" + name + ": " + value + ";"
  },
  sassVariables (variablesObj) {
    return Object.keys(variablesObj).map((name) => {
      return this.sassVariable(name, variablesObj[name])
    }).join('\n')
  },
  sassImport (path) {
    return "@import '" + path + "';"
  }
}




function compileSass(scssEntry, variables, filePath) {
  return new Promise((resolve, reject) => {
    const dataString = sassGenerator.sassVariables(variables) + sassGenerator.sassImport(scssEntry)
    const sassOptions = Object.assign({}, sassOptionsDefaults, {data: dataString})
    sass.render(sassOptions, (err, result) => {
      if (err) {
        reject(err)
      } else {
        const cssString = result.css.toString()
        fs.outputFile(filePath, cssString)
        .then(res => resolve(res))
        .catch(err => reject(err))
      }
    })
  })
}

module.exports = compileSass
