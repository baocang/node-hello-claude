# hello-claude

A production-ready CLI that greets users in multiple languages.

![Coverage: 95%](https://img.shields.io/badge/coverage-95%25-brightgreen)
![Tests: 31 passing](https://img.shields.io/badge/tests-31%20passing-brightgreen)
![Node: >=14](https://img.shields.io/badge/node-%3E%3D14-blue)

## Features

- Greet users in 6 languages: English, Spanish, French, German, Japanese, and Chinese
- 3 output formats: plain text, JSON, and emoji
- Uppercase transform option
- Configuration via environment variables or CLI flags
- Built-in `list-languages` command
- Clean error handling with informative messages

## Installation

### Global install

```bash
npm install -g .
hello-claude greet
```

### Run without installing

```bash
npx . greet
```

### Local development

```bash
npm install
node bin/hello-claude.js greet
```

## Usage

### Basic greeting

```bash
$ hello-claude greet
Hello, World!

$ hello-claude greet Alice
Hello, Alice!
```

### Greet in different languages

```bash
$ hello-claude greet Alice --lang fr
Bonjour, Alice!

$ hello-claude greet Carlos --lang es
¡Hola, Carlos!

$ hello-claude greet Tanaka --lang ja
こんにちは、Tanaka！
```

### Uppercase output

```bash
$ hello-claude greet Alice --upper
HELLO, ALICE!

$ hello-claude greet Alice --lang fr --upper
BONJOUR, ALICE!
```

### JSON format

```bash
$ hello-claude greet Alice --format json
{"greeting":"Hello, Alice!","timestamp":"2026-02-24T12:00:00.000Z","lang":"en"}
```

### Emoji format

```bash
$ hello-claude greet Alice --lang fr --format emoji
🇫🇷 Bonjour, Alice! 🇫🇷

$ hello-claude greet --format emoji
👋 Hello, World! 👋
```

### List supported languages

```bash
$ hello-claude list-languages
  en  English    Hello, World!
  es  Spanish    ¡Hola, World!
  fr  French     Bonjour, World!
  de  German     Hallo, World!
  ja  Japanese   こんにちは、World！
  zh  Chinese    你好，World！
```

## Commands

| Command | Description |
|---------|-------------|
| `greet [name]` | Greet someone in a specified language. Defaults to `World` if no name given. |
| `list-languages` | List all supported languages with example greetings. |

## Options for `greet`

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--lang <lang>` | `-l` | Language code for the greeting | `en` |
| `--format <format>` | `-f` | Output format: `plain`, `json`, or `emoji` | `plain` |
| `--upper` | `-u` | Output the greeting in uppercase | `false` |

## Supported Languages

| Code | Language | Example Greeting |
|------|----------|-----------------|
| `en` | English | Hello, World! |
| `es` | Spanish | ¡Hola, World! |
| `fr` | French | Bonjour, World! |
| `de` | German | Hallo, World! |
| `ja` | Japanese | こんにちは、World！ |
| `zh` | Chinese | 你好，World！ |

## Output Formats

### Plain (default)

Simple text output:

```
Hello, Alice!
```

### JSON

Structured output with greeting, timestamp, and language code:

```json
{
  "greeting": "Hello, Alice!",
  "timestamp": "2026-02-24T12:00:00.000Z",
  "lang": "en"
}
```

### Emoji

Greeting wrapped with language-specific emoji flags:

```
🇫🇷 Bonjour, Alice! 🇫🇷
👋 Hello, Alice! 👋
🇩🇪 Hallo, Alice! 🇩🇪
```

## Configuration

Configure defaults via environment variables. CLI flags always take precedence over environment variables.

| Variable | Description | Default |
|----------|-------------|---------|
| `HELLO_CLAUDE_LANG` | Default language code | `en` |
| `HELLO_CLAUDE_NAME` | Default name to greet | `World` |

**Precedence order** (highest to lowest):

1. CLI arguments
2. Environment variables
3. Built-in defaults

Example:

```bash
export HELLO_CLAUDE_NAME=Alice
hello-claude greet
# Hello, Alice!

hello-claude greet Bob
# Hello, Bob!  (CLI arg wins)
```

Copy `.env.example` to `.env` to get started with a template.

## Development

```bash
# Clone the repository
git clone <repo-url>
cd node-hello-claude

# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint the code
npm run lint

# Run the CLI locally
node bin/hello-claude.js greet
```

## License

MIT
