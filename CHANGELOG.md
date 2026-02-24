# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-24

### Added

- `greet [name]` command with multi-language support
- `list-languages` command to display all supported languages
- 6 supported languages: English, Spanish, French, German, Japanese, and Chinese
- 3 output formats: plain, JSON, and emoji
- `--lang` / `-l` option to select greeting language
- `--format` / `-f` option to select output format (plain/json/emoji)
- `--upper` / `-u` option for uppercase output
- Environment variable configuration (`HELLO_CLAUDE_LANG`, `HELLO_CLAUDE_NAME`)
- Configuration precedence: CLI args > env vars > built-in defaults
- Comprehensive test suite with 95% coverage (31 tests)
- ESLint configuration for code quality
- Architecture documentation (ARCHITECTURE.md)
- `.env.example` template for environment variables
