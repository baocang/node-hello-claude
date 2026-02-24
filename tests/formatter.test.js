const { format } = require('../src/formatter');

describe('format()', () => {
  test('plain style returns greeting unchanged', () => {
    expect(format('Hello, World!', 'plain', 'en')).toBe('Hello, World!');
  });

  test('json style returns valid JSON with greeting, timestamp, lang fields', () => {
    const result = format('Hello, World!', 'json', 'en');
    const parsed = JSON.parse(result);
    expect(parsed).toHaveProperty('greeting', 'Hello, World!');
    expect(parsed).toHaveProperty('timestamp');
    expect(parsed).toHaveProperty('lang', 'en');
    // timestamp should be a valid ISO string
    expect(new Date(parsed.timestamp).toISOString()).toBe(parsed.timestamp);
  });

  test('emoji style wraps greeting with emoji characters', () => {
    const result = format('Hello, World!', 'emoji', 'en');
    // English emoji is 👋
    expect(result).toBe('👋 Hello, World! 👋');
  });

  test('emoji style uses language-specific emoji', () => {
    const result = format('¡Hola, World!', 'emoji', 'es');
    expect(result).toBe('🌞 ¡Hola, World! 🌞');
  });

  test('unknown style falls back to plain (default case)', () => {
    expect(format('Hello, World!', 'unknown', 'en')).toBe('Hello, World!');
  });

  test('undefined style falls back to plain (default case)', () => {
    expect(format('Hello, World!', undefined, 'en')).toBe('Hello, World!');
  });
});
