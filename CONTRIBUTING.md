# Contributing to hello-claude

Thank you for your interest in contributing!

## Getting Started

```bash
git clone https://github.com/baocang/node-hello-claude.git
cd node-hello-claude
npm install
```

## Development Workflow

```bash
npm test              # run tests
npm run test:coverage # run tests with coverage report
npm run lint          # check for lint errors
npm run format        # auto-format code with Prettier
npm run format:check  # check formatting without writing
```

## Adding a Language

Edit `src/greeter.js` and add an entry to the `LANGUAGES` object:

```js
pt: { name: 'Portuguese', template: 'Olá, {name}!' },
```

Then add the corresponding emoji to `src/formatter.js`, and add test cases in `tests/greeter.test.js` and `tests/formatter.test.js`.

## Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes and ensure all tests pass: `npm test`
4. Ensure lint passes: `npm run lint`
5. Open a pull request against `main`

## Commit Style

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation changes
- `test:` — adding or updating tests
- `chore:` — maintenance (deps, config, etc.)

## Reporting Issues

Please use [GitHub Issues](https://github.com/baocang/node-hello-claude/issues) to report bugs or request features.
