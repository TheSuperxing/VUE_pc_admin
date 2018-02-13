<template>
  <div class="foot">
    <div class="footerNav">
      <div class="contact">
        <span v-cloak>{{mContact}}</span>
        <span v-cloak v-html="cContact"></span>
      </div>
      <div class="contactAds">
        {{contactAds}}
      </div>
    </div>
    <div class="copyring">
      <p>Copyring &copy;2014CCDI&nbsp;&nbsp;All&nbsp;&nbsp;right&nbsp;&nbsp;reserved&nbsp;&nbsp;沪ICP备16030624号-2</p>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'foot',
    data:function() {
    	return{
        mContact:"联系手机:150-8888-9999",
        cContact:"办公室电话：020-666-8888&nbsp;&nbsp;&nbsp;&nbsp;020-8888-666",
        contactAds:"联系地址：上海市杨浦区1758号奚地国际"
    	}
    }
  }
</script>
<style scoped lang="scss">
  .footer{
    width:100%;
    min-width: 1200px;
    height: 140px;
    overflow: hidden;
    background: #F7F9FC;
    .footerNav{
      width:1200px;
      height:80px;
      padding-top:30px;
      margin: 0 auto;
      line-height: 32px;
      color: #353535;
      .contact{
        text-align: center;
        span:nth-child(1){
          padding-right:20px;
        }
      }
    }
    .copyring{
      height: 30px;
      background: #353535;
      p{
        width: 1200px;
        margin:0 auto;
        text-align: center;
        color: #FFF;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
</style>

































