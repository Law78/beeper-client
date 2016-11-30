<template>
  <div id="profile">
    <div>
      <p class="text-center"><img :src="user.avatar" alt="User Profile" class="img-circle"></p>
      <h2 class="text-center">@{{user.username}}</h2>
      <p class="text-center m-b-20">{{user.about}}</p>
      <beep-list :endpoint='`/users/${$route.params.username}/beeps`' :showUserInfo="false"></beep-list>
    </div>
  </div>
</template>

<script>
  import BeepList from './BeepList.vue';

  export default {
    name: 'profile',
    components: {
      beepList: BeepList
    },
    created(){
      this.getUser();
    },
    data(){ 
      return{
        user: {}
      }
    },
    watch: {
      $route: 'getUser'
    },
    methods: {
      getUser: function(){
        this.$http.get(`/users/${this.$route.params.username}`)
          .then(function(res){
            this.user = res.body;
          })
          .catch(function(res){

          });
      }
    }
  }
</script>

<style>
  #profile img{
    max-width: 200px;
  }
</style>
