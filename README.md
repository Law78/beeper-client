# beeper

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

AVVIA IL SERVER CON:

php -S localhost:9090 public/index.php

# Sezione 2

Ho installato globalmente il vue-cli con:

npm install -g vue-cli

vue init <template-name> <project-name>

Dove il project-name è il nome del progetto e il template-name lo scegliamo tra una serie di set predefiniti che trovo sulla pagina github di vue-cli. Utilizziamo webpack in modo tale da avere un set predefinito di configurazioni con webpack:

vue init webpack beeper-client

Dopodichè rispondiamo ad una serie di domande tra cui: nome del progetto, descrizione, autore, se usare ESLINT, se usare Karma+Mocha come TEST UNIT, come VUE BUILD seleziono Runtime + Compile.

Ho aggiunto queste linee di codice nel mio .eslintrc.js:

```
'rules': {
  ...
  "object-shorthand": ["warn", "properties"],
  "func-names": ["warn", "as-needed"],
```

Un componente VUE fondamentalmente ha 3 sezioni:
TEMPLATE-SCRIPT-STYLE

Nello SCRIPT, avrò il nome del componente, la funzione data che ritorna un oggetto e la proprietà methods, un oggetto che ha al suo interno le funzioni che posso usare come handler nei tag html, come ad esempio con v-n:click (o abbreviato @click) nei BUTTON.

# Config Folder

Trovo le impostazioni in index.js, poi in base all'ambiente che avvio, ho delle impostazioni ulteriori in dev.env.js, test.env.js e prod.env.js. Sostanzialmente sono delle impostazioni di variabili e di cartelle.

Attenzione devi usare i single quotes e dentro i double quotes:

```
 API: '"http://localhost:9090"'
 ```

## Richieste http

https://github.com/pagekit/vue-resource/blob/master/docs/http.md

Il servizio http può essere globalmente con Vue.http o nelle istanze dei componenti Vue tramite this.$http.

Ad esempio in register avrò, nei methods:

this.$http.post("http://localhost:9090/users", this.user)

è una PROMISE che quindi posso gestire con then e catch.
Tutte le funzioni callback sono automaticamente auto-bound al this del componente.

La lista dei comandi che posso usare con http:

```
get(url, [options])
head(url, [options])
delete(url, [options])
jsonp(url, [options])
post(url, [body], [options])
put(url, [body], [options])
patch(url, [body], [options])
```


## Interceptors

Posso modificare le request e le response con l'interceptor.

Nel main.js vado a scrivere lo skeleton dell'interceptor:

```
// Interceptors
Vue.http.interceptors.push(function(request, next){
  // Modifica la Richiesta (request) qui
  next(function(response){
    // Modifica la Risposta (response) qui
  });
});
```