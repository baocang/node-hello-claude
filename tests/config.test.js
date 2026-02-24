const { loadConfig } = require('../src/config');

describe('loadConfig()', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.HELLO_CLAUDE_LANG;
    delete process.env.HELLO_CLAUDE_NAME;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('returns defaults when no options or env vars set', () => {
    const config = loadConfig();
    expect(config).toEqual({ name: 'World', lang: 'en' });
  });

  test('CLI args override defaults', () => {
    const config = loadConfig({ name: 'Alice', lang: 'fr' });
    expect(config).toEqual({ name: 'Alice', lang: 'fr' });
  });

  test('env vars override defaults', () => {
    process.env.HELLO_CLAUDE_LANG = 'de';
    process.env.HELLO_CLAUDE_NAME = 'Bob';
    const config = loadConfig();
    expect(config).toEqual({ name: 'Bob', lang: 'de' });
  });

  test('CLI args take precedence over env vars', () => {
    process.env.HELLO_CLAUDE_LANG = 'de';
    process.env.HELLO_CLAUDE_NAME = 'Bob';
    const config = loadConfig({ name: 'Alice', lang: 'fr' });
    expect(config).toEqual({ name: 'Alice', lang: 'fr' });
  });
});
