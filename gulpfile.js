'use strict'

const build = require('@microsoft/sp-build-web')

build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
)

/*
// Needed for fast-spfx-serve, not working yet with env
const argv = build.rig.getYargs().argv
const useCustomServe = argv['custom-serve']
const fs = require('fs')
const workbenchApi = require('@microsoft/sp-webpart-workbench/lib/api')

console.warn(`useCustomServe: ${useCustomServe}`)

if (useCustomServe) {
  build.tslintCmd.enabled = false

  const ensureWorkbenchSubtask = build.subTask(
    'ensure-workbench-task',
    function (gulp, buildOptions, done) {
      this.log('Creating workbench.html file... X')
      try {
        workbenchApi.default['/workbench']()
      } catch (e) {}

      done()
    }
  )

  build.rig.addPostBuildTask(
    build.task('ensure-workbench', ensureWorkbenchSubtask)
  )

  build.configureWebpack.mergeConfig({
    additionalConfiguration: (generatedConfiguration) => {
      const currentEnv = getClientEnvironment().stringified
      console.log('ce', currentEnv)
      if (generatedConfiguration.plugins) {
        // TODO; this assumes there is only one object with definitions key
        const currentDefinitionIndex = generatedConfiguration.plugins.findIndex(
          (p) => p.definitions
        )
        console.log('defIndex', currentDefinitionIndex)
        const newDef = generatedConfiguration.plugins[currentDefinitionIndex]
        console.log('newDef', newDef)
        console.log(Object.keys(newDef.definitions))
        const prop = 'process.env.NODE_ENV'
        const { [prop]: exclProp, ...x } = newDef.definitions
        console.log('exclProp', exclProp)
        console.log('x', x)
        const newDefObj = {
          // DefinePlugin: {
          //   ...newDef,
          //   definitions: {
          ...x,
          process: {
            ...x.process,
            env: {
              NODE_ENV: exclProp,
              ...currentEnv['process.env'],
              //...newDef.definitions.process.env,
            },
            // ...newDef.definitions.process.env,
            // ...currentEnv.process.env,
          },
          //   },
          // },
        }
        console.log(newDefObj)
        generatedConfiguration.plugins[
          currentDefinitionIndex
        ] = new webpack.DefinePlugin(newDefObj)
        console.log(generatedConfiguration.plugins[currentDefinitionIndex])

        fs.writeFileSync(
          './temp/_webpack_config.json',
          JSON.stringify(generatedConfiguration, null, 2)
        )
        return generatedConfiguration

        let pluginDefine = null
        for (var i = 0; i < generatedConfiguration.plugins.length; i++) {
          var plugin = generatedConfiguration.plugins[i]
          if (plugin instanceof webpack.DefinePlugin) {
            pluginDefine = plugin
          }
        }

        if (pluginDefine) {
          console.log('pluginDefine', 1)
          pluginDefine.definitions = {
            ...pluginDefine.definitions,
            ...currentEnv,
          }
        } else {
          console.log('pluginDefine', 2)
          generatedConfiguration.plugins.push(
            new webpack.DefinePlugin(currentEnv)
          )
        }

        fs.writeFileSync(
          './temp/_webpack_config.json',
          JSON.stringify(generatedConfiguration, null, 2)
        )

        console.log(generatedConfiguration)
      }
    },
  })
}
*/

const webpack = require('webpack')
const getClientEnvironment = require('./process-env')

build.configureWebpack.mergeConfig({
  additionalConfiguration: (cfg) => {
    let pluginDefine = null
    for (var i = 0; i < cfg.plugins.length; i++) {
      var plugin = cfg.plugins[i]
      if (plugin instanceof webpack.DefinePlugin) {
        pluginDefine = plugin
      }
    }

    const currentEnv = getClientEnvironment().stringified

    if (pluginDefine) {
      pluginDefine.definitions = { ...pluginDefine.definitions, ...currentEnv }
    } else {
      cfg.plugins.push(new webpack.DefinePlugin(currentEnv))
    }

    return cfg
  },
})

build.initialize(require('gulp'))
