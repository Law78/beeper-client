<template>
  <div>
    <div id="beepsWraper">
      <beep :showUserInfo="showUserInfo" v-for="beep in beeps" :beep="beep"></beep>
    </div>
    <div id="beepsLoading" class="text-center" v-show="beepsLoading">
      <i class="fa fa-spin fa-spinner"></i>
    </div>
  </div>
</template>

<script>
  import Beep from './Beep.vue';

  export default {
    name: 'BeepList',
    components: {
      beep: Beep,
    },
    created: function () {
      this.beeps = [];
      this.getBeeps(1);
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed: function(){
      window.removeEventListener('scroll', this.handleScroll);
    },
    props: {
      endpoint: {type: String, default:'/beeps'},
      showUserInfo: {type: Boolean, default: true}
    },
    watch: {
      endpoint: function(){
        this.beeps = [];
        this.getBeeps();
      }
    },
    data: function () {
      return {
        beeps: [],
        page: {},
        beepsLoading: false
      }
    },
    methods: {
      getBeeps: function (page) {
        this.beepsLoading = true;
        this.$http.get(`${this.endpoint}?page=${page}`)
          .then(function (res) {
            this.beepsLoading = false;
            this.beeps = [...this.beeps, ...res.body.data];
            this.page = {current: res.body.current_page, last: res.body.last_page};
          })
          .catch(function (res){
            this.beepsLoading = false;
          });
      },
      handleScroll: function(){
        if(document.body.scrollHeight - window.innerHeight - document.body.scrollTop === 0 ){
          if(this.page.current < this.page.last)
            this.getBeeps(this.page.current + 1);
        }
      }
    }
  }
</script>

<style scoped>
    #beepsWraper {
        margin: 0 -20px;
    }

    #beepsLoading {
        padding: 40px;
    }

    #beepsLoading i {
        font-size: 40px;
    }
</style>