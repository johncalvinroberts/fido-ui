const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

function renameNewComponents(targetName, targetDir, presetName) {
  return new Promise ((resolve, reject) => {
    fs.readdir(targetDir)
    .then((res) => {
      res.map(file => {
        try{
          let newName = file.replace(presetName, targetName)
          fs.renameSync(`${targetDir}/${file}`, `${targetDir}/${newName}`)
        } catch (err){
          reject(err)
        }
      })
      resolve()
    })
    .catch(err => reject(err))
  })
}


function copyPresetFiles (presetName, targetDir) {
  return new Promise ((resolve, reject) => {
    const presetSource = path.resolve(__dirname, `../src/components/${presetName}`)
    fs.copy(presetSource, targetDir)
    .then(res => resolve(targetDir))
    .catch(err => reject(err))
  })

}

function createTargetDir (targetName) {
  return new Promise ((resolve, reject) => {
    const targetDir = `components/${targetName}`
    fs.mkdirp(targetDir)
    .then(() => {
      console.log(`created ${targetName} component directory`)
      resolve(targetDir)
    })
    .catch(err => reject(err))
  })
}



function createComponent(presetName, targetName) {
  return new Promise((resolve, reject) => {
    createTargetDir(targetName)
    .then((targetDir) => copyPresetFiles(presetName, targetDir))
    .then((targetDir) => renameNewComponents(targetName, targetDir, presetName))
    .then((res) => resolve(res))
    .catch(err => reject(err))
  })

}


module.exports = createComponent
