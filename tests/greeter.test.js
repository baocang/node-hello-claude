const { greet, getSupportedLanguages } = require('../src/greeter');

describe('greet()', () => {
  const cases = [
    ['en', 'Alice', 'Hello, Alice!'],
    ['es', 'Alice', '¡Hola, Alice!'],
    ['fr', 'Alice', 'Bonjour, Alice!'],
    ['de', 'Alice', 'Hallo, Alice!'],
    ['ja', 'Alice', 'こんにちは、Alice！'],
    ['zh', 'Alice', '你好，Alice！'],
  ];

  test.each(cases)('returns correct greeting for lang=%s', (lang, name, expected) => {
    expect(greet(name, lang)).toBe(expected);
  });

  const defaultNameCases = [
    ['en', 'Hello, World!'],
    ['es', '¡Hola, World!'],
    ['fr', 'Bonjour, World!'],
    ['de', 'Hallo, World!'],
    ['ja', 'こんにちは、World！'],
    ['zh', '你好，World！'],
  ];

  test.each(defaultNameCases)('returns correct greeting with name "World" for lang=%s', (lang, expected) => {
    expect(greet('World', lang)).toBe(expected);
  });

  test('throws an error for unsupported language code', () => {
    expect(() => greet('Alice', 'xx')).toThrow('Unsupported language: "xx"');
  });
});

describe('getSupportedLanguages()', () => {
  test('returns array with correct structure', () => {
    const languages = getSupportedLanguages();
    for (const lang of languages) {
      expect(lang).toHaveProperty('code');
      expect(lang).toHaveProperty('name');
      expect(lang).toHaveProperty('example');
      expect(typeof lang.code).toBe('string');
      expect(typeof lang.name).toBe('string');
      expect(typeof lang.example).toBe('string');
    }
  });

  test('includes all 6 languages', () => {
    const languages = getSupportedLanguages();
    const codes = languages.map((l) => l.code);
    expect(codes).toEqual(expect.arrayContaining(['en', 'es', 'fr', 'de', 'ja', 'zh']));
    expect(languages).toHaveLength(6);
  });
});
