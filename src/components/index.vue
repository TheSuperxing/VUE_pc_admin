<template>
  <div class="index">
  	<header-nav></header-nav>
    
    <left-nav></left-nav>
    <router-view></router-view>
  </div>
</template>

<script>
	import headerNav from "./header.vue"
	import leftNav from "./leftNav.vue"
  export default {
    name: 'index',
    data:function(){
      return {
        msg:"首页",
        
      }
    },
    components:{
      headerNav,
      leftNav
    }
  }
</script>
