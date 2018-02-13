<template>
	<div class="projlist">
		<div class="content-wrap">
			<h1 class="titleLocation">您的位置：<router-link :to="{name:'comList'}">公司列表</router-link></h1>
			<div class="search-content">
				<h1>筛选查询 :</h1>
				<div class="search-wrap">
					<input type="text" placeholder=" 请输入资质名称 / 职称名称 / 公司名称 / 项目名称 / 学校名称 / 奖项名称 " />
					<button>搜索</button>
				</div>
				<ul class="option-wrap">
					
					<li>
						<label>项目名称：</label><input type="text" placeholder="请输入用户昵称" />
					</li>
					<li>
						<label>项目地点：</label>
						<provinces-city :accptProvince="searchOptions.projectPlaceObj" v-on:accpt-province-change="changeProjectAds"></provinces-city>
					</li>
					<li>
						<label>图片展示：</label><select><option>全部</option><option>有</option><option>无</option></select>
					</li>
					
					
				</ul>
				<div class="lookup">查询</div>
			</div>
			<div class="list-wrap">
				<h2>
					<p>共<em>12323</em>条记录 <span>刷新</span></p>
					<p >导出excel</p>
					<p @click="overlay">导入用户账号</p>
				</h2>
				<table>
					<thead>
						<tr>
							<th v-for="item in titles">{{item}}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,$index) in list">
							<td>{{item.id}}</td>
							<td><span @click="goToFrontpage(item.id)" style="color: #f37b23;">{{item.projectName}}</span></td>
							<td>{{item.projectPlaceObj.province}}</td>
							<td>{{item.projectPlaceObj.city}}</td>
							<td>{{item.projectPlaceObj.county}}</td>
							<td>{{item.projectPlaceObj.street}}</td>
							<td>{{item.relatedPer}}</td>
							<td v-if="item.havePic">有</td>
							<td v-else>无</td>
							<td>
								<el-switch
								  v-model="item.initiate"
								  on-color="#42B983"
								  off-color="#d7d7d7"
								  on-text="" off-text=""
								  :change="toggleStatus(item.initiate,$index)"
								  >
								</el-switch>
							</td>
							<td><router-link :to="{name:'comDetail'}">详情</router-link></td>
						</tr>
					</tbody>
				</table>
			</div>
			
			<pagination :current_page_parent="currentPage" :pages="pageCounts" :changePage="changePage"
				v-on:jumppage = "jumpPage"></pagination>
				
			<!--导入模态框-->
			<div id="modal-overlay" class="import-modal">
				<div class="import">
					<h5>导入用户账号</h5>
					<span class="modalChaBtn" @click="closeModal()"></span>
					<div class="content-wrapper">
						<p>
							<input type="text" placeholder=""  />
							<button>浏览文件</button>
						</p>
							
						<div class="btnBox">
							<span class="cancelBtn" @click="cancleDele()">取消</span>
							<span class="confirmBtn" @click="saveDele()">确认</span>
						</div>
					</div>
				</div>
			</div>
			<!--导入模态框-->
			
		</div>
	</div>
</template>

<script>
	import Vue from "vue"
	import {Switch} from 'element-ui'
	Vue.use(Switch)
	import Datepicker from "../../units/Datepicker.vue"
	import pagination from "../../units/pagination.vue"
	import ProvincesCity from "../../units/province-city-county.vue"
	import MyAjax from "../../../assets/js/MyAjax.js"
	import Modal from "../../../assets/js/modal.js"
	export default{
		name:"projList",
		data:function(){
			return{
				titles:["项目ID","项目名称","省","市","区","路","关联用户数","图片展示","启用状态",""],
				list:"",
				currentPage:1,
				pageCounts:10,
				changePage:1,
				viewModal:[],
				searchOptions:{
					projectPlaceObj:{
						city:"北京市",
						county:"东城区",
						province:"北京市",
						street:"",
					},//项目地址
				}
			}
		},
		created(){
			console.log(this.$route)
			var that = this;
			var url="../../../../static/datajson/project.json";
			MyAjax.ajax({
				type: "GET",
				url: url,
				dataType: "json",
				async:false,
			},function(data){
				console.log(data)
				Vue.set(that,"list",data.msg.list)
				Vue.set(that,"currentPage",data.msg.currentPage)
				Vue.set(that,"pageCounts",data.msg.pageConts)
				that.viewModal = [];
				for(var i =0;i<that.list.length;i++){
					that.viewModal.push("view_modal"+i)
					switch (that.list[i].createType){
						case "0":
							Vue.set(that.list[i],"createType","用户创建")
							break;
						case "1":
							Vue.set(that.list[i],"createType","用户注册")
							break;
						case "2":
							Vue.set(that.list[i],"createType","管理员创建")
							break;
						default:
							break;
					}
					switch (that.list[i].cerState){
						case "0":
							Vue.set(that.list[i],"cerState","未认证")
							break;
						case "1":
							Vue.set(that.list[i],"cerState","普通认证")
							break;
						case "2":
							Vue.set(that.list[i],"cerState","高级认证")
							break;
						default:
							break;
					}
				}
				console.log(that.viewModal)
			},function(err){
				console.log(err)
			})
		},
		components:{
			Datepicker,
			pagination,
			ProvincesCity
		},
		methods:{
			changeProjectAds(val){//通过事件同步子组件信息
		        this.projectInfo.projectPlaceObj=val;
		        //console.log(this.projectInfo.projectPlaceObj)
		    },
			jumpPage(data){
				console.log(data)
			},
			toggleStatus(initiate,$index){
				console.log(initiate)
				console.log($index)
			},
			overlay(){
				Modal.makeText($('.import-modal'))
			},
			viewThisModal(index){
				let aa = "view_modal"+index;
				console.log(index)
				Modal.makeText($('.'+aa))
			},
			closeModal(index){
				Modal.closeModal($('.import-modal'))
    			let aa = "view_modal"+index;
				Modal.closeModal($('.'+aa))
			},
			goToFrontpage(id){
				window.open("http://10.1.31.27:8080/indexcontent/projectDetail?id=" + id)
			},
			
		}
	}
</script>

<style lang="scss" scoped="scoped">
$themeColor:#f37b23;
.projlist{
	width: 100%;
	position: absolute;
	top: 70px; left: 0;
	height: 100%;
	padding-left: 200px;
	.content-wrap{
		height: 100%;
		padding: 0 30px;
		.titleLocation{
			height: 40px; line-height: 40px;
			text-align: left;
			a{
				color: #999999;
				&.router-link-active,&:hover{
					color: #353535;
				}
			}
		}
		.search-content{
			border: 1px solid #333333;
			padding: 10px 20px;
			h1{
				height: 30px;
				line-height: 30px;
				text-align: left;
				color: #353535;
				font-size: 18px;
				font-weight: bold;
			}
			.search-wrap{
				width: 80%;
				text-align: left;
				border: 1px solid #999999;
				&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
				input{
					border: none;
					width: 85%;
					height: 40px; line-height: 40px;
					float: left;
					
				}
				button{
					width: 15%;
					height: 40px;
					border: none;
					float: right;
					background: $themeColor;
					cursor: pointer;
					color: #FFFFFF;
					&:hover{
						box-shadow: 0 0 8px #f89e5c;
					}
				}
			}
			.option-wrap{
				margin: 20px 0;
				&:after {  content: "."; display: block; height: 0; clear: both; visibility: hidden;  }
				li{
					float: left;
					margin-bottom: 14px;
					input,select{
						height: 35px; line-height: 35px;
						font-size: 14px;
						border: 1px solid #999999;
					}
					
					.datePicker{
						display: inline-block;
						width: 150px; margin-left: 15px;
						border: 1px solid #999999 !important;
						.input-wrapper{
							border: none !important;
							height: 30px; line-height: 30px;
						}
					}
					&:nth-child(2){
						width: 60%;
						margin-left: 30px;
						label{
							float: left;
							margin-top: 8px;
						}
					}
					&:last-child{
						label{
							float: left;
							margin-top: 8px;
						}
					}
				}
				
			}
			.lookup{
				width: 80px; height: 30px; line-height: 30px;
				background: $themeColor; text-align: center;
				color: #FFFFFF; border-radius: 5px;
				margin: 0 auto 10px; cursor: pointer;
				box-shadow: 0 0 3px #e4680c inset;
				&:hover{
					box-shadow: 0 0 8px #f89e5c;
				}
			}
		}
		.list-wrap{
			h2{
				height: 30px;
				margin: 10px 0;
				p{
					&:nth-child(1){
						float: left;
						em{
							color:#e4680c;
							margin: 0 5px;
						}
						span{
							display: inline-block;
							width: 50px; cursor: pointer;
							height: 30px; line-height: 30px;
							background: $themeColor;border-radius: 5px;
							color: #FFFFFF; text-align: center;
							box-shadow: 0 0 3px #e4680c inset;
							&:hover{
								box-shadow: 0 0 8px #f89e5c;
							}
						}
					}
					&:nth-child(2),&:nth-child(3){
						float: right;
						width:130px; cursor: pointer;
						height: 30px; line-height: 30px;
						background: $themeColor;border-radius: 5px;
						color: #FFFFFF; text-align: center;
						box-shadow: 0 0 3px #e4680c inset;
						margin-right: 10px;
						&:hover{
							box-shadow: 0 0 8px #f89e5c;
						}
					}
					
				}
			}
			table{
				width: 100%;
				border-radius: 5px; overflow: hidden;
				thead{
					background: #d7d7d7;
					color: #333333;
					th{
						height: 38px;
						text-align: center;
						&:nth-child(3){
							width: 150px;
						}
						&:nth-child(4){
							width: 150px;
						}
					}
					
				}
				tbody{
					background: #f7f7f7;
					tr{
						border-bottom: 1px dotted #e0e0e0;
						td{
							height: 35px; line-height: 35px;
							text-align: center;
							a{
								color: $themeColor;
							}
							span{
								display: inline-block;
								vertical-align: middle;
								margin-bottom: 1px; cursor: pointer;
								width: 50px; height: 25px; line-height: 25px;
								border-radius: 8px; cursor: pointer;
								color: $themeColor;
							}
							
						}
					}
					
				}
			}
		}
	}
	.import,.view{
		width: 549px;
		overflow: hidden;
	    position:absolute;top:50%;left:50%; 
		transform:translate(-50%,-50%);
		-webkit-transform:translate(-50%,-50%);
		-moz-transform:translate(-50%,-50%);
		-ms-transform:translate(-50%,-50%);
		-o-transform:translate(-50%,-50%);
	    background: #FFFFFF;
	    border-radius: 10px;
	    text-align: center;
	    .content-wrapper{
	    	padding: 30px;
	    }
	    p{
	    	height: 40px; line-height: 40px;
	    	input{
	    		width: 280px;
	    		height: 40px; line-height: 40px;
	    		text-align: left;
	    		border: 1px solid #e0e0e0;
	    		margin-right: -8px;
	    	}
	    	button{
	    		border: none;
	    		background: url(../../../assets/img/connect/btn_save_normal.png.png) no-repeat;
	    		background-size: 100% 100%;
	    		width: 100px; height: 40px;
	    		
	    	}
	    }
	    h3{
	    	height: 30px;line-height: 30px;
	    	font-size: 20px; text-align: left;
	    	padding-left: 80px;
	    	margin-bottom:20px;
	    }
	    ul{
	    	padding-left: 80px;
	    	margin-bottom: 15px;
	    	li{
	    		height: 30px; line-height: 30px;
	    		text-align: left;
	    		
	    		span{
	    			display: inline-block;
	    			width: 100px;
	    			margin-right: 20px;
	    			text-align: left;
	    		}
	    	}
	    }
	}
}	
</style>