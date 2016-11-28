<template>
    <div>
    <h3 class="text-center">Register</h3>
    <input type="email" v-model="user.email" class="form-control m-b-15" placeholder="Email Address">
    <input type="text" v-model="user.username" class="form-control m-b-15" placeholder="Username">
    <input type="password" v-model="user.password" v-on:keyup.enter="register" class="form-control m-b-15" placeholder="Password">
    <hr>
    <button @click="register" class="btn btn-lg btn-primary btn-block m-b-15">Register</button>
    <p class="text-center">
      Hai già un account? <router-link to="/auth/login">Login!</router-link>
    </p>
  </div>
</template>

<script>
  export default {
    // il name di un componente ci aiuta per il debuggin, altrimenti non è necessario
    name: 'register',
    data: function() {
      return {
        user: {
          email: '',
          username: '',
          password: ''
        }
      };
    },
   	methods: {
      register: function (event) {
        console.log(this.user);
        this.$http.post("/users", this.user)
          .then(function (res){
            alertify.success('Success! You can now login with your email and password!');
            this.$router.push('/auth/login');
          })
          .catch(function(res){
            if(res.status !== 422){
              alertify.error('Connection refused');
            }
        });
      }
    }
  };
</script>

<style>
</style>