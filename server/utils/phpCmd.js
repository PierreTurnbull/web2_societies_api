const execSync = require('child_process').execSync

/**
 * Execute a PHP script and return the parsed result
 * @param {string} cmd: script to execute
 * @param {object} data: data which JSON shall be passed as argument to the command
 */
const phpCmd = (cmd, data) => {
  const scriptPath  = `${process.env.PWD}/server/phpDbUpdate/${cmd}.php`
  const phpPath     = execSync('which php').toString().replace('\n', '')
  const jsonData    = `'${JSON.stringify(data)}'`
  const result      = execSync(`${phpPath} ${scriptPath} ${jsonData}`)
  try {
    return JSON.parse(result)
  } catch (error) {
    return undefined
  }
}

module.exports = phpCmd
