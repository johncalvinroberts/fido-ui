/*
  Creates the base styles in app.wxss and a fido config file.
  Fido config will be used for compiling styles on other components added to the project.
*/
const compileStyles = require('./compile-styles')
const fs = require('fs-extra')

function createFidoFile (stylesObj) {
  return new Promise((resolve, reject) => {

    const configFile = './fidofile.json'
    const options = {spaces: 2}
    fs.writeJson(configFile, stylesObj, options)
    .then(res => resolve(res))
    .catch(err => reject(err))
  })
}


function createConfig (stylesObj) {
  return new Promise((resolve, reject) => {

    const filePath = './app.wxss'
    Promise.all([
      compileStyles(__dirname + '/../src/styles/app.scss', stylesObj.styles, filePath),
      createFidoFile(stylesObj)
    ])
    .then(res => resolve(res))
    .catch(err => reject(err))
  })

}

module.exports = createConfig
