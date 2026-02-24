function format(greeting, style, lang) {
  switch (style) {
    case 'json':
      return JSON.stringify({
        greeting,
        timestamp: new Date().toISOString(),
        lang: lang || 'en',
      });
    case 'emoji': {
      const emojis = {
        en: '\ud83d\udc4b',
        es: '\ud83c\udf1e',
        fr: '\ud83c\uddeb\ud83c\uddf7',
        de: '\ud83c\udde9\ud83c\uddea',
        ja: '\ud83c\uddef\ud83c\uddf5',
        zh: '\ud83c\udde8\ud83c\uddf3',
      };
      const emoji = emojis[lang] || '\ud83d\udc4b';
      return `${emoji} ${greeting} ${emoji}`;
    }
    case 'plain':
    default:
      return greeting;
  }
}

module.exports = { format };
