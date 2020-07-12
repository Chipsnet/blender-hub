const NextI18Next = require('next-i18next').default

module.exports = new NextI18Next({
  defaultLanguage: 'ja',
  otherLanguages: ['en'],
  localePath: 'renderer/public/static/locales'
})