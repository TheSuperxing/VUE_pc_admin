<template>
	<div class="perlist">
		<div class="content-wrap">
			<h1 class="titleLocation">您的位置：<router-link :to="{name:'comList'}">个人列表</router-link></h1>
			<div class="search-content">
				<h1>筛选查询 :</h1>
				<div class="search-wrap">
					<input type="text" placeholder=" 请输入资质名称 / 职称名称 / 公司名称 / 项目名称 / 学校名称 / 奖项名称 " />
					<button>搜索</button>
				</div>
				<ul class="option-wrap">
					<li>
						<label>用户ID：</label><input type="text" placeholder="请输入用户ID" />
					</li>
					<li>
						<label>用户姓名：</label><input type="text" placeholder="请输入用户姓名" />
					</li>
					<li>
						<label>用户昵称：</label><input type="text" placeholder="请输入用户昵称" />
					</li>
					<li>
						<label>用户手机号：</label><input type="text" placeholder="请输入用户手机号" />
					</li>
					<li>
						<label>性&nbsp;&nbsp;&nbsp;别：</label><select><option>男</option><option>女</option></select>
					</li>
					<li>
						<label>认证状态：</label><select><option>全部</option><option>已认证</option><option>未认证</option></select>
					</li>
					<li>
						<label>创建类型：</label><select><option>全部</option><option>用户注册</option><option>管理员导入</option></select>
					</li>
					<li>
						<label>创建时间：</label><datepicker class="datePicker" ></datepicker>
					</li>
					
				</ul>
				<div class="lookup">查询</div>
			</div>
			<div class="list-wrap">
				<h2>
					<p>共<em>12323</em>条记录 <span>刷新</span></p>
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
							<td>{{item.phone}}</td>
							<td><router-link :to="{path:'localhost:8000/indexcontent/personDetail',query:{id:item.id}}">{{item.nickName}}</router-link></td>
							<td>{{item.psnName}}</td>
							<td>{{item.sex}}</td>
							<td v-if="item.ifCer">已认证</td>
							<td v-else>未认证</td>
							<td>{{item.createType}}</td>
							<!--<td v-if=""><span :class="{used:item.initiate,inUsed:!item.initiate}"></span></td>-->
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
					<div class="content-wrap">
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
		</div>
	</div>
</template>

<script>
	import Vue from "vue"
	import {Switch} from 'element-ui'
	Vue.use(Switch)
	import Datepicker from "../../units/Datepicker.vue"
	import pagination from "../../units/pagination.vue"
	import MyAjax from "../../../assets/js/MyAjax.js"
	import Modal from "../../../assets/js/modal.js"
	
	export default{
		name:"perlist",
		data:function(){
			return{
				titles:["用户ID","登录手机号","昵称","姓名","性别","认证状态","创建类型","启用状态"],
				list:"",
				currentPage:1,
				pageCounts:10,
				changePage:1
			}
		},
		created(){
			var that = this;
			var url="../../../../static/datajson/person.json";
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
				console.log(that.list)
			},function(err){
				console.log(err)
			})
		},
		components:{
			Datepicker,
			pagination
		},
		methods:{
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
			closeModal(index){
				Modal.closeModal($('.import-modal'))
    		
			},
		}
		
	}
</script>

<style lang="scss" scoped="scoped">
 $themeColor:#f37b23;
.perlist{
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
				color: #666666;
				&.router-link-active{
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
					width: 25%;
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
					&:first-child{
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
					&:last-child{
						float: right;
						width:130px; cursor: pointer;
						height: 30px; line-height: 30px;
						background: $themeColor;border-radius: 5px;
						color: #FFFFFF; text-align: center;
						box-shadow: 0 0 3px #e4680c inset;
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
					}
					
				}
				tbody{
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
								margin-bottom: 1px;
								width: 50px; height: 25px;
								border-radius: 8px;
								&.used{
									background: #42B983;
								}
								&.inUsed{
									background: #EEEEEE;
								}
							}
						}
					}
					
				}
			}
		}
	}
	.import{
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
	}
}	
</style>