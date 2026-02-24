# hello-claude Architecture

Production-ready Node.js CLI application that greets users in multiple languages.

## Directory Structure

```
node-hello-claude/
├── bin/
│   └── hello-claude.js        # CLI entry point (executable shebang script)
├── src/
│   ├── cli.js                 # Argument parsing & command setup (commander)
│   ├── greeter.js             # Core greeting logic & language support
│   └── config.js              # Configuration loading (env vars, defaults)
├── tests/
│   ├── cli.test.js            # CLI integration tests
│   ├── greeter.test.js        # Greeter unit tests
│   └── config.test.js         # Config unit tests
├── package.json               # Project metadata, scripts, dependencies
├── .eslintrc.json             # ESLint configuration
├── .gitignore                 # Git ignore rules
└── ARCHITECTURE.md            # This file
```

### File Responsibilities

| File | Role |
|------|------|
| `bin/hello-claude.js` | Executable entry point. Has `#!/usr/bin/env node` shebang. Imports and runs `src/cli.js`. Kept minimal — no logic here. |
| `src/cli.js` | Defines CLI commands and options using `commander`. Parses `--name`, `--lang`, `--uppercase` flags. Calls `greeter` with parsed args. Handles output to stdout. |
| `src/greeter.js` | Pure function module. Takes a name and language code, returns a greeting string. Contains the language map. No side effects. |
| `src/config.js` | Reads `HELLO_CLAUDE_LANG` and `HELLO_CLAUDE_NAME` env vars. Merges env vars with CLI args (CLI wins). Exports a `loadConfig(cliOptions)` function. |
| `tests/*.test.js` | Jest test files mirroring `src/` modules. |

## Module Responsibilities

### bin/hello-claude.js — Entry Point

- Shebang for direct execution (`npx`, `npm link`, or `./bin/hello-claude.js`)
- Single responsibility: import `cli.js` and call `run()`
- No business logic

### src/cli.js — CLI Layer

- Uses `commander` to define the program interface
- Options:
  - `-n, --name <name>` — Who to greet (default: `"World"`)
  - `-l, --lang <code>` — Language code (default: `"en"`)
  - `-u, --uppercase` — Output in uppercase
- Exports `run(argv)` for testability (accepts optional argv array)
- Calls `loadConfig()` to merge env vars with CLI args
- Calls `greeter.greet()` and writes result to stdout
- Sets exit code on error

### src/greeter.js — Core Logic

- Exports `greet(name, lang)` — returns greeting string
- Exports `getSupportedLanguages()` — returns array of language codes
- Language map:
  - `en` → `"Hello, {name}!"`
  - `es` → `"¡Hola, {name}!"`
  - `fr` → `"Bonjour, {name}!"`
  - `de` → `"Hallo, {name}!"`
  - `ja` → `"こんにちは、{name}！"`
  - `zh` → `"你好，{name}！"`
- Throws `Error` for unsupported language codes
- Pure functions — no I/O, no side effects

### src/config.js — Configuration

- Reads environment variables:
  - `HELLO_CLAUDE_LANG` — default language
  - `HELLO_CLAUDE_NAME` — default name
- Exports `loadConfig(cliOptions)` that merges sources with precedence:
  1. CLI arguments (highest)
  2. Environment variables
  3. Built-in defaults (lowest)
- Returns a plain object `{ name, lang }`

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| **`commander` for CLI parsing** | Mature, well-documented, lightweight. Auto-generates `--help`. Standard choice for Node.js CLIs. |
| **Separate `bin/` from `src/`** | `bin/` is the executable shim; `src/` holds all logic. Enables testing without spawning a process. |
| **Pure `greeter` module** | No I/O makes it trivially testable. Easy to extend with new languages. |
| **Config merging in dedicated module** | Single place to understand config precedence. CLI args override env vars override defaults. |
| **Jest for testing** | Zero-config for Node.js. Built-in mocking. Fast. |
| **ESLint (no Prettier)** | Keeps tooling minimal. ESLint handles both linting and basic formatting. |
| **No TypeScript** | Keeps the project simple and avoids a build step. Appropriate for a small CLI tool. |
| **Throws on bad language** | Fail-fast behavior. CLI layer catches and prints a user-friendly error with exit code 1. |

## Data Flow

```
 ┌─────────────────────────────────────────────────────────┐
 │                    User invokes CLI                      │
 │         $ hello-claude --name Alice --lang fr            │
 └────────────────────────┬────────────────────────────────┘
                          │
                          ▼
 ┌─────────────────────────────────────────────────────────┐
 │  bin/hello-claude.js                                     │
 │  ─ Shebang entrypoint                                    │
 │  ─ Calls cli.run(process.argv)                           │
 └────────────────────────┬────────────────────────────────┘
                          │
                          ▼
 ┌─────────────────────────────────────────────────────────┐
 │  src/cli.js — run(argv)                                  │
 │                                                          │
 │  1. Parse argv with commander                            │
 │     → { name: "Alice", lang: "fr", uppercase: false }    │
 │                                                          │
 │  2. loadConfig(parsedOptions)                            │
 │     → merges env vars + CLI args → { name, lang }        │
 │                                                          │
 │  3. greeter.greet(config.name, config.lang)              │
 │     → "Bonjour, Alice!"                                  │
 │                                                          │
 │  4. Apply transforms (--uppercase → "BONJOUR, ALICE!")   │
 │                                                          │
 │  5. process.stdout.write(result + "\n")                  │
 └────────────────────────┬────────────────────────────────┘
                          │
                          ▼
 ┌─────────────────────────────────────────────────────────┐
 │  stdout: "Bonjour, Alice!"                               │
 └─────────────────────────────────────────────────────────┘
```

## API / Interface Contracts

### greeter.greet(name, lang)

```js
/**
 * @param {string} name — the target of the greeting
 * @param {string} lang — ISO 639-1 language code (e.g. "en", "fr")
 * @returns {string} the greeting
 * @throws {Error} if lang is not supported
 */
function greet(name, lang) { ... }
```

### greeter.getSupportedLanguages()

```js
/**
 * @returns {string[]} array of supported language codes
 */
function getSupportedLanguages() { ... }
```

### config.loadConfig(cliOptions)

```js
/**
 * @param {object} cliOptions — parsed CLI options from commander
 * @param {string} [cliOptions.name] — name from --name flag
 * @param {string} [cliOptions.lang] — lang from --lang flag
 * @returns {{ name: string, lang: string }} merged configuration
 */
function loadConfig(cliOptions) { ... }
```

### cli.run(argv)

```js
/**
 * @param {string[]} [argv=process.argv] — argument vector
 * @returns {void}
 */
function run(argv) { ... }
```

## package.json Key Fields

```json
{
  "name": "hello-claude",
  "version": "1.0.0",
  "description": "A production-ready CLI that greets users in multiple languages",
  "main": "src/cli.js",
  "bin": {
    "hello-claude": "./bin/hello-claude.js"
  },
  "scripts": {
    "start": "node bin/hello-claude.js",
    "test": "jest",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/ tests/ bin/"
  },
  "dependencies": {
    "commander": "^12.0.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "eslint": "^8.0.0"
  }
}
```

## ESLint Configuration

Uses `eslint:recommended` with Node.js globals. Enforces consistent style without an extra formatter dependency.

```json
{
  "env": { "node": true, "jest": true, "es2022": true },
  "extends": "eslint:recommended",
  "parserOptions": { "ecmaVersion": 2022 },
  "rules": {
    "no-console": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
}
```

## Testing Strategy

- **Unit tests** for `greeter.js` and `config.js` (pure functions, fast)
- **Integration tests** for `cli.js` (pass synthetic argv, capture stdout)
- No snapshot tests — output is simple strings
- Target: 100% coverage on `src/` modules
