/*
|---------------------------------------------------------------------
| Firelayer Template Config File
|---------------------------------------------------------------------
|
| Landing - Website built with Nuxt.js
|
*/
module.exports = async function({ chalk, open, logger, prompt, targetDir }) {
  const website = 'https://firelayer.io/templates/landing'

  console.log(`\nTemplate Documentation - ${chalk.bold.green(website)}\n`)

  open(website)
}
