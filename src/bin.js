const commander = require('commander')
const generateFlowTypes = require('./index.js')

const program = new commander.Command()

program
  .arguments('<source>')
  .option('-c, --config <.prettierrc>', 'prettier configuration file')
  .action((source, program) => {
    const types = generateFlowTypes(source, program.config)
    console.log(types)
  })
  .parse(process.argv)
