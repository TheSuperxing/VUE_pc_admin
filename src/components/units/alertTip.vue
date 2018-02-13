<template>
	<div class="alet_container">
     <p class="tip_text">{{alertText}}</p>
    </div>
</template>

<script>
	 export default {
    	data(){
            return{
                positionY: 0,
                timer: null,
            }
        },
        mounted(){
      
        },
        props: ['alertText'],
       
    }
</script>

<style lang="scss" scoped="scoped">
	.alet_container{
		position: absolute;
		bottom: 100px;
    height: 20px;
    padding-right:20px ;
    min-width: 150px;
    background: #fffbe6;
    border: 1px solid #fff4bb;
    border-radius: 5px;
    /*overflow: hidden;*/
   
        color: orangered;
        .tip_text{
        	padding-left: 15px;
   		  	background: url(./img/warn.png) no-repeat left center;
        	height: 20px;
        	line-height: 20px;
        	text-align: left;
        	margin-left: 20px;
        	margin-top: -2px;
        }
  
	}
</style>