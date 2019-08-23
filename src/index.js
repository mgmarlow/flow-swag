const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const keys = require('lodash/keys')
const merge = require('lodash/merge')
const last = require('lodash/last')
const prettier = require('prettier')

function extractTypeFromSchema(schema) {
  return last(schema.split('/'))
}

function getType(property) {
  const type = property.type
    ? property.type
    : extractTypeFromSchema(property['$ref'])

  switch (type) {
    case 'integer':
      return 'number'

    // TODO: enum
    case 'string':
      return 'string'

    // TODO: Nested objects
    case 'object':
    case 'Object':
      return 'Object'

    case 'array':
      return `${getType(property.items)}[]`
    case 'boolean':
      return 'boolean'

    default:
      return type
  }
}

function generateProperties(properties) {
  return keys(properties)
    .map(key => {
      return `${key}: ${getType(properties[key])},`
    })
    .join('\n')
}

function readSchema(definition, prettierConfig) {
  if (!definition.components) {
    throw new Error(
      'No schema definitions found. Create definitions in components.schemas',
    )
  }

  const { schemas } = definition.components

  const types = keys(schemas).map(key => {
    const properties = generateProperties(schemas[key].properties)

    return `export type ${key} = {
        ${properties}
      }`
  })

  const config = prettier.resolveConfig.sync(prettierConfig) || {}
  return prettier.format(
    `// @flow\n${types.join('\n\n')}`,
    merge(config, { parser: 'flow' }),
  )
}

function isYaml(ext) {
  return ext === '.yaml' || ext === '.yml'
}

function fetchSwaggerFromFile(filename) {
  const ext = path.extname(filename)

  const file = fs.readFileSync(filename, 'utf8')
  return isYaml(ext) ? yaml.safeLoad(file) : JSON.parse(file)
}

// TODO:
// function fetchSwaggerFromURL(url) {
//   return fetch(url)
// }

module.exports = function generateFlowTypes(source, prettierFile) {
  const definition = fetchSwaggerFromFile(source)
  return readSchema(definition, prettierFile)
}
