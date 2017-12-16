const sass = require('node-sass')

const sassOptionsDefaults = {
  includePaths: ['src/styles'],
  outputStyle: 'compressed'
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




function compileSass(scssEntry, variables) {
  return new Promise((resolve, reject) => {
    const dataString = sassGenerator.sassVariables(variables) + sassGenerator.sassImport(scssEntry)
    const sassOptions = Object.assign({}, sassOptionsDefaults, {data: dataString})
    sass.render(sassOptions, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result.css.toString())
      }
    })
  })
}

module.exports = compileSass
