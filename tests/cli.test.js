const { run } = require('../src/cli');

describe('CLI integration tests', () => {
  let stdoutData;
  let stderrData;
  const originalWrite = process.stdout.write;
  const originalErrWrite = process.stderr.write;
  const originalExitCode = process.exitCode;

  beforeEach(() => {
    stdoutData = '';
    stderrData = '';
    process.stdout.write = (data) => { stdoutData += data; };
    process.stderr.write = (data) => { stderrData += data; };
    process.exitCode = undefined;
  });

  afterEach(() => {
    process.stdout.write = originalWrite;
    process.stderr.write = originalErrWrite;
    process.exitCode = originalExitCode;
  });

  test('greet command with no args outputs "Hello, World!"', () => {
    run(['node', 'hello-claude', 'greet']);
    expect(stdoutData).toContain('Hello, World!');
  });

  test('greet command with name arg', () => {
    run(['node', 'hello-claude', 'greet', 'Alice']);
    expect(stdoutData).toContain('Hello, Alice!');
  });

  test('greet command with --lang flag', () => {
    run(['node', 'hello-claude', 'greet', '--lang', 'es']);
    expect(stdoutData).toContain('¡Hola, World!');
  });

  test('greet command with --upper flag uppercases output', () => {
    run(['node', 'hello-claude', 'greet', '--upper']);
    expect(stdoutData).toContain('HELLO, WORLD!');
  });

  test('greet command with --format json outputs valid JSON', () => {
    run(['node', 'hello-claude', 'greet', '--format', 'json']);
    const line = stdoutData.trim();
    const parsed = JSON.parse(line);
    expect(parsed).toHaveProperty('greeting', 'Hello, World!');
    expect(parsed).toHaveProperty('lang', 'en');
    expect(parsed).toHaveProperty('timestamp');
  });

  test('list-languages command outputs all 6 language codes', () => {
    run(['node', 'hello-claude', 'list-languages']);
    for (const code of ['en', 'es', 'fr', 'de', 'ja', 'zh']) {
      expect(stdoutData).toContain(code);
    }
  });
});
