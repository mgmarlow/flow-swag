const fs = require('fs')
const commander = require('commander')
const generateFlowTypes = require('./index.js')

const program = new commander.Command()

program
  .arguments('<source>')
  .option('-o, --output <file>', 'output file', 'types.js')
  .option('-p, --prettierConfig <.prettierrc>', 'prettier configuration file')
  .option('-c, --camelizeKeys', 'camelCase property names')
  .action(async (source, program) => {
    const types = await generateFlowTypes(source, {
      prettierConfig: program.prettierConfig,
      camelizeKeys: program.camelizeKeys,
    })

    fs.writeFileSync(program.output, types)
  })
  .parse(process.argv)
