<template>
  <div>
    <h3 class="text-center">Login</h3>
    <input v-show="!loading" type="text" v-model="user.username" class="form-control m-b-15" placeholder="Username">
    <input v-show="!loading" v-on:keyup.enter="login" type="password" v-model="user.password" class="form-control m-b-15" placeholder="Password">
    <span v-show="loading"><div class="spinner"></div></span>
    <hr>
    <button @click="login" class="btn btn-lg btn-primary btn-block m-b-15">Login</button>
    <p class="text-center">
      Non hai un account? <router-link to="/auth/register">Register!</router-link>
    </p>
    
  </div>
</template>

<script>
  export default {
    name: 'login',
    created(){
      if(this.$router.params){
        this.user.username = this.$router.params.username;
      }
        
    },
    data() {
      return {
        loading: false,
        user: {
          username: '',
          password: ''
        }
      };
    },
    methods: {
      login() { 
        if(this.user.username.length < 3 || this.user.password.length < 3){
          alertify.error('Inserisci una username e password valida');
        } else {
          this.loading = true;
          this.$http.post("/auth", this.user)
            .then(function(res){
              alertify.success('Benvenuto!');
              this.$auth.setToken(res.body.token, Date.now() + (4*60*60*1000)); // 4h
              console.log('Token: ', res.body.token);
              this.$router.push('/newsfeed');
            })
            .catch(function(res){
              if(res.status !== 422){
                alertify.error('Connection refused');
              }
          });
        }

      }
    }
  };
</script>

<style src='../../assets/spinner.css'>
</style>