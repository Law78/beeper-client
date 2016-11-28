const AuthPlugin = {
  setToken(token, expiration){
    localStorage.setItem('authToken', token);
    localStorage.setItem('authTokenExpiration', expiration);
  },

  destroyToken(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenExpiration');
    return null;
  },

  getToken(){
    const token = localStorage.getItem('authToken') || undefined;
    const expiration = localStorage.getItem('authTokenExpiration') || undefined;
   
    if (!token || !expiration) return null;
    if (Date.now() > parseInt(expiration)) return this.destroyToken();
    
    return token;
  },

  loggedIn(){
    return this.getToken() ? true : false;
  }
}

export default function(Vue){
  Vue.auth = AuthPlugin;

// In questo modo ogni componente Vue eredita l'auth plugin che userò con $auth
  Object.defineProperties(Vue.prototype, {
    $auth: {
      get: function(){
        return Vue.auth;
      }
    }
  });
};