//Wrapper componets
<template>
  <div id="dashWrap">
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-sm-12 sideView">
          <sidebar></sidebar>
        </div>
        <div class="col-md-7 col-sm-12 col-md-offset-1 mainView">
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from './Sidebar';
  export default {
    name: 'dash',
    components: {
      sidebar: Sidebar
    }
  }
</script>

<style scoped>
  #dashWrap {
    min.height: 100%;
    padding-top: 50px;
    background: #42275a;
    background: -webkit-linear-gradient(to left, #42275a, #734b6d);
    background: linear-gradient(to left, #42275a, #734b6d);
  }

 .sideView {
    background: #fff;
    border-radius: 6px;
    
  }

  .mainView {
    background: #fff;
    border-radius: 6px;
    padding: 20px;
  }
</style>