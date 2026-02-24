const { Command } = require('commander');
const { greet, getSupportedLanguages } = require('./greeter');
const { loadConfig } = require('./config');
const { format } = require('./formatter');

function run(argv) {
  const program = new Command();

  program
    .name('hello-claude')
    .description('A production-ready CLI that greets users in multiple languages')
    .version('1.0.0');

  program
    .command('greet [name]')
    .description('Greet someone in a specified language')
    .option('-l, --lang <lang>', 'language code', 'en')
    .option('-f, --format <format>', 'output format (plain/json/emoji)', 'plain')
    .option('-u, --upper', 'output in uppercase')
    .action((name, options) => {
      try {
        const config = loadConfig({ name, lang: options.lang });
        let result = greet(config.name, config.lang);

        if (options.upper) {
          result = result.toUpperCase();
        }

        result = format(result, options.format, config.lang);
        process.stdout.write(result + '\n');
      } catch (err) {
        process.stderr.write(`Error: ${err.message}\n`);
        process.exitCode = 1;
      }
    });

  program
    .command('list-languages')
    .description('List all supported languages')
    .action(() => {
      const languages = getSupportedLanguages();
      for (const lang of languages) {
        process.stdout.write(`  ${lang.code}  ${lang.name.padEnd(10)} ${lang.example}\n`);
      }
    });

  program.parse(argv || process.argv);
}

module.exports = { run };
