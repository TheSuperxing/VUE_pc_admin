<template>
  <div id="app">
    <!--<header-nav></header-nav>-->
    <div id="center-content">
      <router-view></router-view>
    </div>

    <!--<footer-nav></footer-nav>-->
  </div>
</template>

<script>
//import FooterNav from "./components/footer.vue";
//import HeaderNav from "./components/header.vue";
export default {
  name: 'app',
  components:{
//  HeaderNav,
//  FooterNav
  }
}

</script>

