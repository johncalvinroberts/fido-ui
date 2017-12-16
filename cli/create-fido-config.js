/*
  Creates the base styles in app.wxss and a fido config file.
  Fido config wil be used for compiling styles on other components added to the project.
*/

const compileStyles = require('./compile-styles')

function createConfigFile (stylesObj) {
  return new Promise((resolve, reject) => {

    const filePath = './app.wxss'
    compileStyles('src/styles/app.scss', stylesObj, filePath)
    .then(res => resolve(res))
    .catch(err => reject(err))
  })

}

module.exports = createConfigFile
