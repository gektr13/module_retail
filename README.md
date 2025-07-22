# yclients-podpislon

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Локальная отладка для RetailCRM
1. Соберите проект: `npm run build`
2. Запустите сервер: `node server.mjs`
3. В интерфейсе RetailCRM используйте window['CRM'].embed.register с параметрами вашего модуля для теста.

## Публикация JS-модуля
1. Соберите проект: `npm run build`
2. Создайте архив с содержимым папки dist и файлом manifest.json из public:
   - В архиве должны быть: manifest.json, index.html, js/app.js, css/app.css и другие файлы сборки.
3. Загрузите архив в маркетплейс RetailCRM или зарегистрируйте через API для отдельного аккаунта.
