<template>
	<div class="page">
	    <div class="pagelist">
	      <span class="pre" :class="{disabled:pstart}"  @click="pageMinus"></span>
	      <span v-show="current_page>5" class="jump" @click="jumpPage(1)">1</span>
	      <span class="ellipsis"  v-show="efont">...</span>
	      <span class="jump" v-for="num in indexs" :class="{bgprimary:current_page==num}" @click="jumpPage(num)">{{num}}</span>
	      <span class="ellipsis"  v-show="ebehind">...</span>
	      <span v-show="current_page<pages-4" class="jump" @click="jumpPage(pages)">{{pages}}</span>
	      <!--<span class="jumppoint">跳转到：</span>-->
	      <span class="jumpinp"><input type="text" v-model="changePage"><em @click="jumpPage(changePage)"></em></span>
	     <!-- <span class="gobtn" >GO</span>-->
	      <span :class="{disabled:pend}" class="next" @click="pagePlus"></span>
	    </div>
	</div>
</template>

<script>
	import Vue from "vue"
	export default{
		name:"pagination",
		data:function(){
			return{
				current_page:"",
				changePage:""
			}
		},
		props:{
			current_page_parent: {
				type: String,
  				default: 1
			}, //当前页
	        pages: {
				type: String,
  				default: 10
			}, //总页数
	        change_page_parent:{
				type: Number,
  				default: 1
			},//跳转页
		},
		mounted(){
			this.current_page=this.current_page_parent
			this.changePage=this.change_page_parent
		},
		computed: {
    		show: function() {
    			return this.pages && this.pages != 1
    		},
    		pstart: function() {
    			return this.current_page == 1;
    		},
    		pend: function() {
    			return this.current_page == this.pages;
    		},
    		efont: function() {
    			if(this.pages <= 7) return false;
    			if(this.pages==8) return false;
    			return this.current_page > 5
    		},
    		ebehind: function() {
    			if(this.pages <= 7) return false;
    			if(this.pages==8) return false;
    			var nowAy = this.indexs;
    			return nowAy[nowAy.length - 1] != this.pages;
    		},
    		indexs: function() {
    			var left = 1,
    				right = this.pages,
    				ar = [];
    			if(this.pages >= 7) {
    				if(this.current_page > 5 && this.current_page < this.pages - 4) {
    					
    					left = Number(this.current_page) - 3;
    					right = Number(this.current_page) + 3;
    				} else {
    					if(this.current_page <= 5) {
    						left = 1;
    						if(this.pages==7&&this.current_page <=2){
    							right = 6;
    						}else{
    							right = 7;
    						}
    						if(this.pages==8&&(this.current_page ==4||this.current_page ==5)){
    							right = 8;
    						}
    						if(this.pages==9&&this.current_page ==5){
    							right = 9;
    						}
    					} else {
    						right = this.pages;
    						if(this.pages==7){  //正好等于7的情况
    							left = this.pages - 5;
    						}else{
    							left = this.pages - 6;
    						}

    						
    					}
    				}
    			}
    			while(left <= right) {
    				ar.push(left);
    				left++;
    			}
    			return ar;
    		},
    	},
    	updated(){
	  		this.$emit("pagePlus",this.current_page)
	  		this.$emit("pageMinus",this.current_page)
	  		this.$emit("jumppage",this.current_page)
    	},
    	methods:{
    		pagePlus() {//向上翻页
				this.current_page<this.pages?this.current_page++:this.current_page;
    		},
			pageMinus() {//向上翻页
				this.current_page>1?this.current_page--:this.current_page;
    		},
    		jumpPage(val){
//  			Vue.set(this,"current_page",val)
				this.current_page=val;
    		}
    	}
	}
</script>

<style lang="scss" scoped="scoped">
.page {
	/*min-width: 900px;*/
	text-align: center;
	color: #888888;
	/*position: absolute;
	bottom: 0;
	left: 50%;
	 transform:translateX(-50%);
	 -webkit-transform:translateX(-50%);
	-moz-transform:translateX(-50%);
	-ms-transform:translateX(-50%);
	-o-transform:translateX(-50%);*/
	 display: table;
	 margin: 30px auto 80px;
	
	.pagelist {
		font-size: 0;
		height: 34px;
		/*line-height: 50px;*/
		span {
			font-size: 14px;
			float: left;
			width: 28px;
			height: 28px;
			line-height: 28px;
			margin-right: 14px;
			
		}
		.jump {
			border: 1px solid #6d7d9b;
			width: 28px;
			height: 28px;
			line-height: 26px;
			text-align: center;
			-webkit-border-radius: 14px;
			-moz-border-radius: 14px;
			border-radius: 14px;
			cursor: pointer;
			margin-top: 3px;
			
			
		}
		.pre,.next{
			width: 34px;
			height: 34px;
			border: none;
			-webkit-border-radius: 17px;
			-moz-border-radius: 17px;
			border-radius: 17px;
			background: url(../../assets/img/connect/icon013.png) no-repeat;
		}
		.pre{
			margin-right: 50px;
			transform: rotateY(180deg);
			-webkit-transform: rotateY(180deg);    /* for Chrome || Safari */
   			-moz-transform: rotateY(180deg);       /* for Firefox */
   			-ms-transform: rotateY(180deg);        /* for IE */
            -o-transform: rotateY(180deg);         /* for Opera */
		}
		.next{
			margin-left: 50px;
		}
		.bgprimary {
			cursor: default;
			line-height: 23px;
			/*color: #fff;*/
			/*background: #337ab7;*/
			border: 3px solid #6d7d9b;
			
		}
		.jumpinp{
			margin-top: 3px;
			height:28px;
			width: 79px;
			/*border: 1px solid #ccc;*/
			
			-webkit-border-radius: 14px;
			-moz-border-radius: 14px;
			border-radius: 14px;
			padding-left: 10px;
			background: url(../../assets/img/connect/icon010.png) no-repeat center;
			overflow: hidden;
			input{
				width: 40px;
				height: 24px;
				font-size: 13px;
				text-align: center;
				margin-top: 2px;
				float: left;
			}
			em{
				width: 24px;
				height: 24px;
				float: right;
				margin-top: 2px;
				margin-right: 2px;
				background: url(../../assets/img/connect/icon001.png) no-repeat right center;
				cursor: pointer;
			}
		}
		
		
		.ellipsis {
			padding: 0px 8px;
		}
		
		.jumppoint {
			margin-left: 30px;
		}
		.gobtn {
			font-size: 12px;
		}
		.disabled {
			pointer-events: none;
			background: #ffffff;
		}
	}
}
</style>