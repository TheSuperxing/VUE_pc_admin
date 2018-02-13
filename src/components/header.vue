<template>
  <div class="header">
    <div class="headerNavBg">
      <div class="headerNav">
        <h1>Buildingshop</h1>
        <ul class="navlist">
          <li v-for="(item,_index) in nav" v-bind:class="{'active':item.active}"><router-link v-bind:to="item.rout">{{item.text}}</router-link></li>
        </ul>
        <div class="notice-wrap">
	    		<p class="notice">提醒<span>【0】</span>
	    			<ul class="noticeList">
	        		<li>
	        			<router-link to="/check/demands">待审需求<em>[0]</em></router-link>
	        		</li>
	        		<li>
	        			<router-link to="/check/deals">待审协议<em>[0]</em></router-link>
	        		</li>
	        		<li>
	        			<router-link to="/check/doc">待审文件<em>[0]</em></router-link>
	        		</li>
	        		<li>
	        			<router-link to="/check/process">待审流程<em>[0]</em></router-link>
	        		</li>
	        	</ul>
	    		</p>
	    		<p class="avator"><img src="../assets/img/company/big-man.png"/></p>
        	
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  import Vue from "vue";
  import {Row,Col} from "element-ui"
  Vue.use(Row)
  Vue.use(Col)

  /*$(function () {
    console.log(sessionStorage.getItem("navTogcolor"));
  })*/
  export default {
    name: 'hello',
    data: function () {
      return {
        top: 'CCDI 悉地国际&nbsp; &nbsp; |&nbsp; &nbsp;项目组',
        msgNum: "5",

        nav: [{
          text: "查找",
          rout: "/lookup",
        }, {
          text: "创建",
          rout: "/create",
        }, {
          text: "审核",
          rout: "/check",
        }, {
          text: "通知",
          rout: "/inform",
        },/* {
          text: "推广",
          rout: "/promote",
        }, {
          text: "权限管理",
          rout: "/permission" //推广和权限管理先不上业务
        }, */{
          text: "工作台",
          rout: "/management"
        }],
        /*导航原始数据*/

        /*导航颜色切换原始状态*/
      }
    },
    methods: {
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .header{
    width:100%;
    min-width: 1200px;
    height: 70px;
    position: fixed;
    top: 0;
    left:0;
    z-index: 100;
    box-shadow: 0 0 3px #cccccc;
    .headerTop{
      height: 39px;
      background: #323333;
      color: #e1e1e1;
      h2{
        font-size:14px;
        float: left;
        padding-left:50px;
        line-height: 40px;
      }
      .topRight{
        float: right;
        padding-right:39px;
        li{
          float: left;
          line-height: 40px;
          p{
            display: inline-block;
            span:nth-child(2){
              color: #2eb3df;
            }
          }
        }
      }
    }
    /*以上是top*/
    .headerNavBg{
      width:100%;
      height: 70px;
      background: #444444;
      .headerNav{
        height:70px;
        /*position: relative;*/
        h1{
          float: left;
          height: 70px;
          line-height: 70px;
          font-size:30px;
          text-align: center;
          color:#e4680c;
					padding: 0 40px;
        }
        .navlist{
          float: left;
          li{
            float: left;
            height:70px;
            
            border-right: 1px solid #2b2b2b;
            border-right-style:inset;
            border-left: 1px solid #555555;
            a{
            	display: inline-block;
            	padding:0 50px 0 50px;
              color: #FFFFFF;
              text-decoration: none;
              height:70px;
              line-height: 70px;
              /*border-bottom: 2px solid #f7f9fc;*/
            }
            a.router-link-active{
            	color: #e4680c;
            	background: #272727;
            	
            }
            a:hover{
					color: #E4680C;
					background: #272727;
				}
            &:last-child{
            	border-right: none;
            }
          }
          
          
        }
        .notice-wrap{
        	float: right;
        	height: 70px;
        	line-height: 70px;
        	text-align: center;
        	margin-right: 20px;
        	
        	
        	p{
        		float: left;
        		color: #FFFFFF;
        		span{
        			color: red;
        		}
        	}
        	.notice{
        		position: relative;
        		cursor: pointer; 
        		&:hover{
        			.noticeList{
        				display: block;
        			}
        		}
        	}
        	.avator{
        		width: 70px;
	    			img{
	    			width: 40px; height: 40px;
	        			border-radius: 50%;
	        		}
        	}
        	.noticeList{
        		position: absolute;
        		top: 70px;
        		left: 0;
        		display: none;
        		li{
        			width:130px;
        			height: 40px; line-height: 40px;
        			margin-bottom: 1px;
        			a{
        				width: 100%; height:100%;
        				line-height: 40px;
        				display: block;
        				background: #444444;
        				color: #FFFFFF;
        				em{
        					color: red;
        				}
        				&:hover{
        					color: #E4680C;
									background: #272727;
        				}
        			}
        		}
        	}
        }
      }
    }
  }

</style>
