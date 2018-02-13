<template>
  <div class="Business">
    <h1>{{msg}}</h1>
    <div class="swiper-container  gallery-project">
			<div class="swiper-wrapper">
				<div v-for="pro in proMsg" class="swiper-slide">
					<router-link :to="{name:'projectDetail',query:{id:pro.pkid}}" target="_blank">
						<div class="img"><img :src="pro.pic" /></div>
						<div class="projectDetail">
							<h3>{{pro.projectName}}</h3>
							<p>{{pro.projectDescription}}</p>
							<span class="more"></span>
							<!--<div class="meng"></div>-->
						</div>
					</router-link>
				</div>
			
			</div>
		</div>
		<div class="pagination"></div>
		<div class="arrow-left"></div>
		<div class="arrow-right"></div>
		<div class="search">
			<router-link :to='{name:"SearchProject",query:{kw:"all"}}'>更多优质项目等你发掘>></router-link>
		</div>
  </div>
</template>

<script>
	import Swiper from "../assets/js/lib/swiper/idangerous.swiper.min.js"
	import "../assets/js/lib/swiper/idangerous.swiper.3dflow.js"
	import Vue from "vue"
	import MyAjax from "../assets/js/MyAjax.js"
  export default {
    name: 'Business',
    data:function(){
      return {
        msg:"我的交易",
        proMsg:[],
	      slidesNum:"",
      }
    },
    created(){
    	this.getData()
    },
    mounted(){
    	this.lunbo(this.slidesNum)
    },
    methods:{
    	getData(){
	    		var that = this;
	    		var url = MyAjax.urlsy + "/ediHomePage/findProjs";
	    		MyAjax.ajax({
						type: "GET",
						url:url,
						dataType: "json",
						async: false,
						ifFreeLogin:true,//是否能够进行免登录获取数据,true能够无登陆获取
					},function(data){
						console.log(data)
						//给获取的数据分组
						Vue.set(that,"proMsg",data.msg)
						Vue.set(that,"slidesNum",data.msg.length)
//						that.proMsg = data.msg.records;
//						for(var i=0,len=data.msg.records.length;i<len;i+=3){
//						   that.perMsg.push(data.msg.records.slice(i,i+3));
//						}
//					console.log(that.slidesNum)
					},function(err){
						console.log(err)
					})
	    		console.log(that.proMsg)
	    	},
	    	lunbo(slidesNum){
	    		 var mySwiper = new Swiper('.swiper-container',{
			        slidesPerView: 'auto',
			        loop:true,
			        centeredSlides : true,
							loopedSlides: slidesNum,
			        autoplay: 2000,
//			        navigation: {
//								nextEl: '.swiper-button-next',
//								prevEl: '.swiper-button-prev',
//							},
			         //Enable 3D Flow
			         tdFlow: {
                 rotate : 0,
                 stretch :340,//每个slide之间拉伸值（负值远离） 
                 depth: 500,  //值越大图片越往后退（可负值）
                 modifier : 1,
                 shadows: true
			         }
			    })
	    		$('.arrow-left').on('click', function(e){
				    e.preventDefault()
				    mySwiper.swipePrev()
				  })
				  $('.arrow-right').on('click', function(e){
				    e.preventDefault()
				    mySwiper.swipeNext()
				  })
	    	}
    }
  }
</script>
<style lang="scss" scoped="scoped">
@import url("../assets/js/lib/swiper/idangerous.swiper.css");
@import url("../assets/js/lib/swiper/idangerous.swiper.3dflow.css");

.index{
	.gallery-project{
		margin-top: 250px;
		height:500px;
		
		.swiper-slide{
			padding: 10px;
			background: #353535;
			a{
				display: block;
				width: 100%;
				height: 100%;
			}
			.img{
				width: 465px;
				height: 322px;
				float: left;
				img{
					width: 100%;
					height: 100%;
				}
			}
			
			.projectDetail{
				width: 285px;
				float: left;
				margin: 15px 7px 0 20px;
				h3{
					font-size: 18px;
					font-weight: bold;
					line-height: 24px;
					flex-wrap: wrap;
					color: #f57b21;
				}
				p{
					text-align: justify;
					font-size: 14px;
					color: #FFFFFF;
					line-height: 24px;
					height: 192px;
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 8;
					-webkit-box-orient: vertical;
					margin-bottom: 5px;
					margin-top: 20px;
				}
				/*p::after {
				    content:"...";
				    font-weight:bold;
				    position:absolute;
				    bottom:0;
				    right:0;
				    padding:0 20px 1px 45px;
				    background:url(http://newimg88.b0.upaiyun.com/newimg88/2014/09/ellipsis_bg.png) repeat-y;
				}*/
				.more{
					float:right;
					width: 102px;
					height: 34px;
					background: #F57B21;
					/*background: url(../../assets/img/header/more.png) no-repeat;*/
					margin-top: 15px;
				}
				.meng{
					width: 100%;
					height: 100%;
					background-color:#000;filter:Alpha(Opacity=60);opacity:0.6;
					position: absolute;
					top: 0;left: 0;
					z-index: 1;
					
				}
			}
		}
	}
	.search{
		height: 24px;
		line-height: 24px;
		text-align: center;
		a{
			font-size: 14px;
			color: #808080;
		}
		
	}
}
</style>