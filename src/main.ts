import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import ru from './locales/ru.json'
import en from './locales/en.json'
import es from './locales/es.json'

const messages = { ru, en, es }
const locale = (navigator.language || 'ru').split('-')[0]
const i18n = createI18n({
  legacy: false,
  locale: ['ru', 'en', 'es'].includes(locale) ? locale : 'ru',
  fallbackLocale: 'ru',
  messages
})

createApp(App).use(i18n).mount('#app')
