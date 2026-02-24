const LANGUAGES = {
  en: { name: 'English', template: 'Hello, {name}!' },
  es: { name: 'Spanish', template: '\u00a1Hola, {name}!' },
  fr: { name: 'French', template: 'Bonjour, {name}!' },
  de: { name: 'German', template: 'Hallo, {name}!' },
  ja: { name: 'Japanese', template: '\u3053\u3093\u306b\u3061\u306f\u3001{name}\uff01' },
  zh: { name: 'Chinese', template: '\u4f60\u597d\uff0c{name}\uff01' },
};

function greet(name, lang) {
  const language = LANGUAGES[lang];
  if (!language) {
    const supported = Object.keys(LANGUAGES).join(', ');
    throw new Error(`Unsupported language: "${lang}". Supported: ${supported}`);
  }
  return language.template.replace('{name}', name);
}

function getSupportedLanguages() {
  return Object.entries(LANGUAGES).map(([code, { name, template }]) => ({
    code,
    name,
    example: template.replace('{name}', 'World'),
  }));
}

module.exports = { greet, getSupportedLanguages };
