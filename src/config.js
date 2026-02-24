const DEFAULTS = {
  lang: 'en',
  name: 'World',
};

function loadConfig(cliOptions = {}) {
  const envLang = process.env.HELLO_CLAUDE_LANG;
  const envName = process.env.HELLO_CLAUDE_NAME;

  return {
    name: cliOptions.name || envName || DEFAULTS.name,
    lang: cliOptions.lang || envLang || DEFAULTS.lang,
  };
}

module.exports = { loadConfig };
