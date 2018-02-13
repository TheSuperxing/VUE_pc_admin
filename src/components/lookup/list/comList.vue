<template>
	<div class="comlist">
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
						<label>团队ID：</label><input type="text" placeholder="请输入用户ID" />
					</li>
					
					<li>
						<label>团队姓名：</label><input type="text" placeholder="请输入用户昵称" />
					</li>
					<li>
						<label>登录邮箱：</label><input type="text" placeholder="请输入用户姓名" /> 
					</li>
					<li>
						<label>有无关联公司：</label><select><option>全部</option><option>有</option><option>无</option></select>
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
					<p>导出excel</p>
					<p @click="importData">导入用户账号</p>
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
							<td><span @click="goToFrontpage(item.id)" style="color: #f37b23;">{{item.companyName}}</span></td>
							<td>{{item.email}}</td>
							<td>{{item.createType}}</td>
							<td>{{item.cerState}}</td>
							<td>{{item.staff}}</td>
							<td>{{item.cerStaff}}</td>
							<td>{{item.team}}</td>
							<td>{{item.cerTeam}}</td>
							<td style="color: #f37b23;"><span @click="viewThisModal($index)" class="viewSpan">查看</span></td>
							<!--<td v-if=""><span :class="{used:item.initiate,inUsed:!item.initiate}"></span></td>-->
							<!--查看联系人模态框-->
							<div id="modal-overlay" :class="viewModal[$index]">
								<div class="view">
									<h5>团队联系人信息</h5>
									<span class="modalChaBtn" @click="closeModal($index)"></span>
									<div class="content-wrapper">
										<h3>{{item.companyName}}</h3>
										<ul>
											<li><span>联系人1：</span>{{item.contact1}}</li>
											<li><span>联系人1电话：</span>{{item.contact1Phone}}</li>
										</ul>
										<ul>
											<li><span>联系人2：</span>{{item.contact2}}</li>
											<li><span>联系人2电话：</span>{{item.contact2Phone}}</li>
										</ul>	
										
									</div>
								</div>
							</div>
							<!--查看联系人模态框-->
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
							<td v-if="!item.createType=='0'"><router-link :to="{name:'comDetail'}">编辑</router-link></td>
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
			<el-dialog title="导入" :visible.sync="dialogImportVisible" :modal-append-to-body="false" :close-on-click-modal="false" class="dialog-import">
		      <div :class="{'import-content': importFlag === 1, 'hide-dialog': importFlag !== 1}">
		        <!--<el-upload class="upload-demo"
		        	ref="upload"
		        :action="importUrl"
		        :name ="name"
		        :headers="importHeaders"
		        :on-preview="handlePreview"
		        :on-remove="handleRemove"
		        :before-upload="beforeUpload"
		        :on-error="uploadFail"
		        :on-success="uploadSuccess"
		        :file-list="fileList"
		        :with-credentials="withCredentials"
		        :auto-upload="false">
		        
		          <el-button size="trigger" type="primary" :disabled="processing">{{uploadTip}}</el-button>
		          
		          <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
		          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
		        </el-upload>-->
		        <el-upload class="upload-demo" 
		        	ref="upload" 
		        	:name ="name"
		        	:action="importUrl"
		        	:on-preview="handlePreview"
		        	:on-remove="handleRemove" 
		        	:before-upload="beforeUpload"
		        	:on-error="uploadFail"
		            :on-success="uploadSuccess"
		        	:with-credentials="withCredentials"
		        	:file-list="fileList" 
		        	:auto-upload="false">
				  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
				  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传.xls,.xlsx文件</div>
				</el-upload>
		        <div class="download-template">
		          <a class="btn-download" @click="download">
		            <i class="icon-download"></i>下载模板</a>
		        </div>
		      </div>
		      <div :class="{'import-failure': importFlag === 2, 'hide-dialog': importFlag !== 2}" >
		        <div class="failure-tips">
		          <i class="el-icon-warning"></i>导入失败</div>
		        <div class="failure-reason">
		          <h4>失败原因</h4>
		          <ul>
		            <li v-for="(error,index) in errorResults" :key="index">第{{error.rowIdx + 1}}行，错误：{{error.column}},{{error.value}},{{error.errorInfo}}</li>
		          </ul>
		        </div>
		      </div>
		    </el-dialog>
		    
		</div>
	</div>
</template>

<script>
	import Vue from "vue"
	import {Switch,Message} from 'element-ui'
	Vue.use(Switch)

	// 在调用 Vue.use 前，给 Message 添加 install 方法
	Message.install = function (Vue, options) {
	  Vue.prototype.$message = Message
	}
	// 和所有组件一样，一并进行use
	Vue.use(Message)
	import Datepicker from "../../units/Datepicker.vue"
	import pagination from "../../units/pagination.vue"
	import MyAjax from "../../../assets/js/MyAjax.js"
	import Modal from "../../../assets/js/modal.js"
	
	import * as scheduleApi from '../../../assets/js/schedule.js'
	
	export default{
		name:"comlist",
		data:function(){
			return{
				titles:["公司ID","公司名称","登录邮箱","创建类型","等级","员工数","认证员工数","团队数","认证团队数","联系人","启用状态",""],
				list:"",
				currentPage:1,
				pageCounts:10,
				changePage:1,
				viewModal:[],
				multipleSelection: [],
			      importUrl:"http://10.1.31.28:8080" +"/teamOrgaInfo/uploadPic",//后台接口config.admin_url+'rest/schedule/import/'
			      importHeaders:{
			        enctype:'multipart/form-data',
			        cityCode:''
			      },
			      name: 'import',
			      fileList: [],
			      withCredentials: true,
			      processing: false,
			      uploadTip:'浏览文件',
			      importFlag:1,
			      dialogImportVisible:false,
			      errorResults:[]
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
			pagination
		},
		methods:{
			jumpPage(data){
//				console.log(data)
			},
			toggleStatus(initiate,$index){
//				console.log(initiate)
//				console.log($index)
			},
			importData() {
		      this.importFlag = 1
		      this.fileList = []
		      this.uploadTip = '浏览文件'
		      this.processing = false
		      this.dialogImportVisible = true
		    },
		    submitUpload() {
		        this.$refs.upload.submit();
		    },
		    outportData() {
		      scheduleApi.downloadTemplate()
		    },
		     handlePreview(file) {
		      //可以通过 file.response 拿到服务端返回数据
		    },
		    handleRemove(file, fileList) {
		      //文件移除
		    },
		    beforeUpload(file){
		      //上传前配置
		      console.log(this)
		      this.importHeaders.cityCode=''//可以配置请求头
		      let excelfileExtend = ".xls,.xlsx"//设置文件格式
		      let fileExtend = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
		      if (excelfileExtend.indexOf(fileExtend) <= -1) {
		         this.$message.error('文件格式错误')
		         return false
		      }
		      this.uploadTip = '正在处理中...'
		      this.processing = true
		    },
		    //上传错误
		    uploadFail(err, file, fileList) {
		      this.uploadTip = '点击上传'
		      this.processing = false
		      this.$message.error(err)
		    },
		    //上传成功
		    uploadSuccess(response, file, fileList) {
		      this.uploadTip = '点击上传'
		      this.processing = false
		      if (response.status === -1) {
		        this.errorResults = response.data
		        if (this.errorResults) {
		          this.importFlag = 2
		        } else {
		          this.dialogImportVisible = false
		          this.$message.error(response.errorMsg)
		        }
		      } else {
		        this.importFlag = 3
		        this.dialogImportVisible = false
		        this.$message.info('导入成功')
//		        this.doSearch()
		      }
		    },
		    //下载模板
		    download() {
		      //调用后台模板方法,和导出类似
		      scheduleApi.downloadTemplate()
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
				window.open("http://10.1.31.27:8080/indexcontent/personDetail?id=" + id)
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
$themeColor:#f37b23;
	.comlist{
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