import { cac } from 'cac'
import { resolve } from 'path'
import { prerenderFromCLI, prerenderForceExit } from '../prerender/runPrerender.js'
import { projectInfo, assertUsage } from './utils.js'

const cli = cac(projectInfo.projectName)

cli
  .command('prerender', 'Pre-render the HTML of your pages', { allowUnknownOptions: true })
  .option('--configFile <path>', '[string] Path to vite.config.js')
  .action(async (options) => {
    assertOptions()
    const { partial, noExtraDir, base, parallel, outDir, configFile } = options
    const root = options.root && resolve(options.root)
    await prerenderFromCLI({ partial, noExtraDir, base, root, parallel, outDir, configFile })
    prerenderForceExit()
  })

function assertOptions() {
  // We use `rawOptions` because `cac` maps option names to camelCase
  const rawOptions = process.argv.slice(3)
  assertUsage(!rawOptions.includes('--no-extra-dir'), '`--no-extra-dir` has been renamed: use `--noExtraDir` instead.')
  Object.values(rawOptions).forEach((option) => {
    assertUsage(
      !option.startsWith('--') ||
        [
          '--root',
          '--partial',
          '--noExtraDir',
          '--clientRouter',
          '--base',
          '--parallel',
          '--outDir',
          '--configFile'
        ].includes(option),
      'Unknown option: ' + option
    )
  })
}

// Listen to unknown commands
cli.on('command:*', () => {
  assertUsage(false, 'Unknown command: ' + cli.args.join(' '))
})

cli.help()
cli.version(projectInfo.projectVersion)

cli.parse(process.argv.length === 2 ? [...process.argv, '--help'] : process.argv)

process.on('unhandledRejection', (rejectValue) => {
  throw rejectValue
})
