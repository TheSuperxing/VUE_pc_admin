<template>
	<div class="comDetail">
		<div class="content-wrap">
			<h1 class="titleLocation">您的位置：<router-link :to="{name:'comList'}">公司列表</router-link>
				> <router-link :to="{name:'comDetail'}">公司详情</router-link></h1>
			<div class="info-wrap">
				<h1>
					<p>基本信息</p>
					<p v-if="editShow" @click="editInfo">编辑</p>
				</h1>
				<table border="1" v-if="editShow"> <!--展示表格-->
					<tr v-for="item in titles">
						<td>{{item.text}}</td>
						<td>{{comInfo[item.key]}}</td>
					</tr>
				</table>
				<table border="1" v-if="!editShow" style="color: #999999;"> <!--编辑表格-->
					<tr v-for="item in titles">
						<td>{{item.text}}</td>
						<td v-if="item.key!='email'&&item.key!='password'">{{comInfo[item.key]}}</td>
						<td v-else-if="item.key=='email'"><input type="text" placeholder="请输入公司邮箱" v-model="comInfo[item.key]"/></td>
						<td v-else-if="item.key=='password'"><input type="text" placeholder="请输入公司密码"  v-model="comInfo[item.key]"/></td>
						<td v-else>{{comInfo[item.key]}}</td>
					</tr>
				</table>
				<div class="btnBox"  v-if="!editShow">
					<span class="cancelBtn" @click="cancleEdit()">取消</span>
					<span class="confirmBtn" @click="saveEdit()">确认</span>
				</div>
				<div class="docslist">
					<div class="paper">
						<h3>证照文件<button @click="goToUploadDoc">上传</button></h3>
						<table border="1">
							<thead>
								<tr>
									<th v-for="item in docTitles">{{item}}</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,$index) in paperInfo">
									<td>{{item.name}}</td>
									<td>{{item.img}}</td>
									<td>{{item.cerState}}</td>
									<td><router-link :to="{name:'uploadDoc',query:{id:item.id}}">查看</router-link></td>
									<td class="radioGroup" v-if="item.state!==2">
										<p><input type="radio" :name="$index" :checked="item.state==1" :value="1" @click="stateRadio($index)"/>显示</p>
										<p><input type="radio" :name="$index" :checked="item.state==0" :value="0" @click="stateRadio($index)"/>隐藏</p>
									</td>
									<td v-else>待审核</td>
								</tr>
							</tbody>
							
						</table>
						
					</div>
					<div class="qua">
						<h3>证照文件<button @click="goToUploadDoc">上传</button></h3>
						<table border="1">
							<tr>
								<th v-for="item in docTitles">{{item}}</th>
							</tr> 
						</table>
						
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import Vue from "vue"
	import Datepicker from "../../units/Datepicker.vue"
	import pagination from "../../units/pagination.vue"
	import MyAjax from "../../../assets/js/MyAjax.js"
	import Modal from "../../../assets/js/modal.js"
	import router from "../../../router"
	export default{
		name:"comDetail",
		data:function(){
			return{
				titles:[
				{
					"key":"id",text:"公司ID"
				},{
					"key":"createType",text:"创建类型"
				},{
					"key":"companyName",text:"公司名称"
				},{
					"key":"email",text:"登录邮箱"
				},{
					"key":"password",text:"登录密码"
				},{
					"key":"companyPlace",text:"公司地址"
				},{
					"key":"companyProfile",text:"公司简介"
				},{
					"key":"cerState",text:"公司等级"
				}],
				docTitles:["图片名称","图片","等级","文档","状态"],
				paperInfo:[
					{id:"1",name:"营业执照",img:"",cerState:1,state:0},//stste为0表示隐藏 1表示显示  2表示待审
					{id:"1",name:"三证合一",img:"",cerState:0,state:1},
					{id:"1",name:"税务登记",img:"",cerState:0,state:2},
					
				],
				quaInfo:[
					{name:"营业执照",img:"",cerState:0,state:1},//stste为0表示隐藏 1表示显示  2表示待审
					{name:"营业执照",img:"",cerState:0,state:0},
				
				],
				comInfo:{},
				editShow:true, //true是高级管理员 可对基本信息进行编辑 还有文件的状态更改
				manaType:1 //0是普通管理员  1是超级管理员
			}
		},
		created(){
			console.log(this.$route)
			var that = this;
			var url="../../../../static/datajson/company.json";
			MyAjax.ajax({
				type: "GET",
				url: url,
				dataType: "json",
				async:false,
			},function(data){
				console.log(data)
				Vue.set(that,"comInfo",data.msg.list[0])
//				for(var i =0;i<that.comInfo.length;i++){
//					that.viewModal.push("view_modal"+i)
					switch (that.comInfo.createType){
						case "0":
							Vue.set(that.comInfo,"createType","用户创建")
							break;
						case "1":
							Vue.set(that.comInfo,"createType","用户注册")
							break;
						case "2":
							Vue.set(that.comInfo,"createType","管理员创建")
							break;
						default:
							break;
					}
					switch (that.comInfo.cerState){
						case "0":
							Vue.set(that.comInfo,"cerState","未认证")
							break;
						case "1":
							Vue.set(that.comInfo,"cerState","普通认证")
							break;
						case "2":
							Vue.set(that.comInfo,"cerState","高级认证")
							break;
						default:
							break;
					}
//				}
				console.log(that.comInfo)
			},function(err){
				console.log(err)
			})
			for(let i=0;i<that.paperInfo.length;i++){
				switch (that.paperInfo[i].cerState){ //文件的认证等级
					case 0:
						that.paperInfo[i].cerState = "普通认证"
						break;
					case 1:
						that.paperInfo[i].cerState = "高级认证"
						break;
					default:
						break;
				}
				
				
				
			}
		},
		mounted(){
			for(let i=0;i<this.paperInfo.length;i++){
				console.log($("input[name='"+i+"']:checked").val())
			}
			if(this.manaType==1){ //判断管理员的等级 来控制编辑按钮的显示
				this.editShow = true;
			}else{
				this.editShow = false;
			}
		},
		methods:{
			stateRadio($index){ //控制单选按钮的值
				
				console.log($("input[name='"+$index+"']:checked").val())
				Vue.set(this.paperInfo[$index],"state",$("input[name='"+$index+"']:checked").val()) // 把显隐状态值赋值给info里面的state 以后续传给后端
			},
			editInfo(){
				Vue.set(this,"editShow",false)
			},
			cancleEdit(){
				Vue.set(this,"editShow",true)
			},
			saveEdit(){
				Vue.set(this,"editShow",true)
			},
			goToUploadDoc(){
				router.push("/lookup/com/editDoc")
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
$themeColor:#f37b23;
	.comDetail{
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
			.info-wrap{
				h1{
					height: 40px; line-height: 40px;
					p{
						height: 30px;
						line-height: 30px;
						text-align: left;
						color: #353535;
						font-size: 18px;
						font-weight: bold;
					}
					p:nth-child(1){
						float: left;
					}
					p:nth-child(2){
						float: right; width: 80px;
						text-align: center; cursor: pointer;
						border-radius: 5px; font-weight: 100;
						background: url(../../../assets/img/connect/btn_save_normal.png.png) no-repeat;
						color: #FFFFFF;
						&:hover{
							box-shadow: 0 0 8px #f89e5c;
						}
					}
				}
				>table{
					width: 100%;
					border: 1px solid #333333;
					tr{
						height: 38px;
						td{
							min-height: 38px; line-height: 38px;
							input{
								color: #353535;
								height: 30px; line-height: 30px;
								border-bottom: 1px solid #444444;
							}
						}
						td:nth-child(1){
							width: 20%;
							text-align: center;
						}
						td:nth-child(2){
							text-indent: 15px;
						}
					}
					
				}
				.docslist{
					margin-top: 30px;
					.paper,.qua{
						min-height: 100px;
						margin-bottom: 30px;
						h3{
							height: 40px;
							position: relative;
							font-size: 18px; font-weight: bold;
							button{
								position: absolute;
								right: 0; top: 0; border: none;
								width: 80px; height: 30px; line-height: 30px;
								border-radius: 5px; cursor: pointer; 
								background: url(../../../assets/img/connect/btn_save_normal.png.png) no-repeat;
								color: #FFFFFF;
								&:hover{
									box-shadow: 0 0 8px #f89e5c;
								}
							}
						}
						>table{
							width: 100%;
							th{
								height: 30px; line-height: 30px;
								text-align: center;
							}
							td{
								height: 35px; line-height: 35px;
								text-align: center;
							}
						}
					}
				}
			}
		}
	}
</style>