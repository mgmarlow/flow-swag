const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const prettier = require('prettier')
const keys = require('lodash/keys')
const merge = require('lodash/merge')
const last = require('lodash/last')
const camelCase = require('lodash/camelCase')

// Grabs the end of a ref and assumes it to be a defined type
// e.g. '#/components/schemas/User' -> User
function extractTypeFromRef(schema) {
  return last(schema.split('/'))
}

// Converts a given swagger type to Flow
function getType(property, camelizeKeys) {
  const type = property.type
    ? property.type
    : extractTypeFromRef(property['$ref'])

  switch (type) {
    case 'integer':
    case 'float':
      return 'number'

    case 'boolean':
      return 'boolean'

    case 'string':
      // Generate union types for enums
      return property.enum
        ? property.enum.map(t => `'${t}'`).join(' | ')
        : 'string'

    case 'object':
    case 'Object':
      // Nested object support, recursively generate sub-properties
      return `{
        ${generateProperties(property.properties, camelizeKeys)}
      }`

    case 'array':
      // Recursively extract type from the array items
      return `${getType(property.items, camelizeKeys)}[]`

    default:
      return type
  }
}

// Generates Flow types for properties within a given schema
function generateProperties(properties, camelizeKeys) {
  return keys(properties)
    .map(key => {
      const propertyKey = camelizeKeys ? camelCase(key) : key
      const propertyType = getType(properties[key], camelizeKeys)

      return `${propertyKey}: ${propertyType},`
    })
    .join('\n')
}

function readSchema(base, { prettierConfig, camelizeKeys }) {
  let schemas
  if (base.components) {
    schemas = base.components.schemas
  } else if (base.definitions) {
    schemas = base.definitions
  } else {
    throw new Error(
      'No schema definitions found. Create definitions in components.schemas',
    )
  }

  const types = keys(schemas).map(key => {
    const properties = generateProperties(schemas[key].properties, camelizeKeys)

    return `export type ${key} = {
        ${properties}
      }`
  })

  const config =
    prettier.resolveConfig.sync(prettierConfig, { config: prettierConfig }) ||
    {}

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

module.exports = function generateFlowTypes(source, opts) {
  const definition = fetchSwaggerFromFile(source)
  return readSchema(definition, opts)
}
