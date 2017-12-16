const compileStyles = require('./compile-styles')

function createConfigFile (stylesObj) {
  return new Promise((resolve, reject) => {
    compileStyles('src/styles/app.scss', stylesObj)
    .then(res => resolve(res))
    .catch(err => reject(err))
  })

}

module.exports = createConfigFile
