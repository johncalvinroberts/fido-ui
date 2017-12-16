const compileStyles = require('./compile-styles')
const fs = require('fs-extra')


function createConfigFile (stylesObj) {
  return new Promise((resolve, reject) => {

    compileStyles('src/styles/app.scss', stylesObj)
    .then(res => {
      const file = './app.wxss'
      fs.outputFile(file, res)
      .then(res => resolve(res))
      .catch(err => reject(err))
    })
    .catch(err => reject(err))
  })

}

module.exports = createConfigFile
