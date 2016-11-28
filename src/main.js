import Vue from 'vue';
import App from './App';
import Router from './routes';
import VueResource from 'vue-resource';
import Auth from './plugins/Auth';

// Middleware
Vue.use(VueResource);
Vue.use(Auth);

// Vue.http.options.emulateJSON = true;
alertify.defaults.notifier.position = 'top-right';

// Interceptors
Vue.http.interceptors.push(function(req, next){
  
  // Modifica la Richiesta (request) qui
  const re =  new RegExp("^[\/]$");
  if (re.test(req.url[0])){
    req.url = `${process.env.API}${req.url}`;
    console.log(req.url);
    const token = Vue.auth.getToken();
    if(token) req.headers.set('Authorization', `Bearer ${token}`);
  } 
  next(function(res){
    // Modifica la Risposta (response) qui
    
    
    if(res.status === 422){
      res.body.errors.map(function(e){
        alertify.error(e);
      });
    } 
    if(res.status === 401){
      Vue.auth.destroyToken();
      alertify.error('Non Autorizzato!');
      this.$router.push('/auth/login');
    }
    if(this.loading){
      this.loading = !this.loading;
    }
    

  });
});

// Route Guards
Router.beforeEach(function (to, from, next){
  if( to.matched.some(function(record){ return record.meta.requiresGuest})
    && Vue.auth.loggedIn()) {
      console.log('PAGINA GUEST')
      next({
        path: '/newsfeed'
      });
  } else if ( to.matched.some(function(record){ return record.meta.requiresAuth})
    && !Vue.auth.loggedIn()) {
      console.log('PAGINA PROTETTA')
      next({
        path: '/auth/login'
      });
  } else {
    console.log('PAGINA ELSE')
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  template: '<App/>',
  components: { App },
});
