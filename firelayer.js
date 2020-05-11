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

  console.log(`Template Documentation - ${chalk.bold.cyan(website)}\n`)

  open(website)
}
