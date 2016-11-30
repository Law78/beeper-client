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

## Routes

Installo il Vue Router ufficiale:

```
npm install vue-router --save
```

Per usarlo devo iniettarlo in Vue con l'use, per cui creo un file routes.js:

```
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
```

Vedi anche la documentazione: http://router.vuejs.org/en/api/route-object.html

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

```js
// Interceptors
Vue.http.interceptors.push(function(request, next){
  // Modifica la Richiesta (request) qui
  next(function(response){
    // Modifica la Risposta (response) qui
  });
});
```

#Watch

Quando carico il profilo, il componente Profile prende i dati per via del metodo created, che carica il this.getUser(), ma quando cambio l'url con il router-link di Vue, il componente non richiama la getUser() e per questo non aggiorna il dato. Devo usare il metodo watch e fare il watch di $route. Questo però mi aggiorna la parte superiore dell'avatar e della descrizione ma non il beeplist, questo perchè anche il componente beeplist non ricarica i dati. Devo mettere un nuovo watch. A cosa? Vediamo, tramite gli strumenti di sviluppo di Chrome (Dev Tools) e plugin Vue, che il dato che cambia, nell'oggetto del componente BeepList è l'endpoint. Quindi metto un watch anche sull'endpoint, nel componente Beeplist. Dove resetto i beeps e richiamo la getBeeps.

#Vuex

In Sidebar ho già il mio dato dell'utente, quindi richiederlo anche per il componente Settings non è una best practies. Devo ottimizzare! Vuex è un "magazzino" centralizzato delle informazioni, questo magazzino è detto STORE e ogni Componente può impostare e prelevare dati dallo STORE.

```shell
npm install --save vuex
```

nella root del progetto creo un file store.js All'interno vado a creare una nuova instanza di Vuex.Store che accetta un oggetto con lo state (un oggetto contenente i dati) e le mutations (un oggetto che contiene le funzioni che insistono sui dati).
La filosofia è quella di NON modificare lo stato direttamente, ma usare le mutazioni definite dalle funzioni, si fa un DISPATCH delle MUTAZIONI. In questo modo ho completo controllo dei cambiamenti del mio stato. Questo è ottimo ancor più la mia applicazione crescerà nel tempo!

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  store: {

  },
  mutations: {

  }
})
```

Ok come lo uso?

Devo importare lo store.js nel main.js dove definisco il mio componente VUE principale e devo inserirlo nei settaggi di definizione di Vue:

```js
new Vue({
  el: '#app',
  router: Router,
  store: store,
  template: '<App/>',
  components: { App },
});
```

Il retrieve del dato dell'utente lo facciamo a livello di Sidebar. Ma ora non ha più senso farlo qui, conviene farlo ad un livello più alto in cui riesco ad impostare il mio user nello store e renderlo accessibile anche a Settings. Un componente candidato è Dash. All'interno della parte di successo della chiamata alla mia API, faro il DISPATCH della mia MUTATIONS, tramite l'oggetto $store accessibile al this del componente e richiamando il metodo commit, in cui passo il nome della mutazione e l'eventuale dato (opzionale) detto PAYLOAD:

```js
this.$store.commit('metodo', dato);
```
ovviamente posso invocare la mutazione anche nella sezione della catch, per eventuali problemi della API e quindi richiamare un "clear" del dato nello store.

C'è però un problema. Il componente Sidebar "perde" l'oggetto che inizializzo dallo store dopo la chiamata, questo perchè la proprietà che inizializzo prendendo il dato dallo store non è reactive, cioè non reagisce al cambiamento. Lo store lo aggiorno dopo una chiamata API esterna, Dash e Sidebar sono costruiti quasi nello stesso istante e quindi Sidebar si inizializza con un oggetto ancora vuoto e perde il dato nuovo. Questo lo risolvo con le computed properties.