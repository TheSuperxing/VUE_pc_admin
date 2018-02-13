<template>
	<div class="uploadDoc">
		<div class="content-wrap clear">
			<h1 class="titleLocation">您的位置：<router-link :to="{name:'comList'}">公司列表</router-link>
				> <router-link :to="{name:'comDetail'}">公司详情</router-link>
				> <router-link :to="{name:'uploadDoc'}">上传认证文件</router-link>
			</h1>
			<div  v-if="!editDone">
				
				<div class="img-wrap clear">
					<div class="imgContainer">
						<a data-magnify="gallery" data-caption="预览文件（可缩放窗口以便查看）" :href="docInfo.img"  v-if="haveImg">
					        <img :src="docInfo.img" id="imageFullScreen"/>
					    </a>
						<!--<img :src="docInfo.img" id="imageFullScreen"/>-->
						<span  v-if="!haveImg">点击上传文件图片</span>
						<input type="file" class="" v-if="!haveImg" name="upload-file" id="upload-file" multiple/>
					</div>
					<p><label>文件名：</label><input type="text" v-model="docInfo.fileName"/></p> 
				</div>
				<table>
					<tr>
						<td>企业名称</td>
						<td>
							<input type="text" v-model="docInfo.companyName"/>
						</td>
					</tr>
					<tr>
						<td>类型</td>
						<td><input type="text" v-model="docInfo.type"/></td>
					</tr>
					<tr>
						<td>住所</td>
						<td><input type="text" v-model="docInfo.address"/></td>
					</tr>
					<tr>
						<td>注册号</td>
						<td><input type="text" v-model="docInfo.registrationNum"/></td>
					</tr>
					<tr>
						<td>法定代表人</td>
						<td><input type="text" v-model="docInfo.legalPer"/></td>
					</tr>
					<tr>
						<td>注册资本</td>
						<td><input type="text" v-model="docInfo.registeredAssets"/></td>
					</tr>
					<tr>
						<td>成立日期</td>
						<td>
							<datepicker class="datePicker" v-model="docInfo.establishmentDate"></datepicker>
						</td>
					</tr>
					<tr class="">
						<td>营业期限</td>
						<td>
							<datepicker class="datePicker" v-model="docInfo.operateTimeUp"></datepicker>
							<span>——</span>
							<datepicker class="datePicker"  v-model="docInfo.operateTimeDown" :min="docInfo.operateTimeUp" :today="true"></datepicker>
						</td>
					</tr>
					<tr>
						<td>经营范围</td>
						<td><input type="text" v-model="docInfo.registeredAssets"/></td>
					</tr>
					<tr>
						<td>登记机关</td>
						<td><input type="text" v-model="docInfo.registeredAssets"/></td>
					</tr>
					<tr>
						<td>统一社会信用代码</td>
						<td><input type="text" v-model="docInfo.registeredAssets"/></td>
					</tr>
					<tr>
						<td>组织机构代码证号</td>
						<td><input type="text" v-model="docInfo.registeredAssets"/></td>
					</tr>
					<tr>
						<td>税务登记证号</td>
						<td><input type="text" v-model="docInfo.registeredAssets"/></td>
					</tr>
					<tr>
						<td>统计证证号</td>
						<td><input type="text" v-model="docInfo.registeredAssets"/></td>
					</tr>
					<tr>
						<td>社保登记证号</td>
						<td><input type="text" v-model="docInfo.registeredAssets"/></td>
					</tr>
					<tr>
						<td>发证日期</td>
						<td><datepicker class="datePicker" ></datepicker></td>
					</tr>
					<tr>
						<td>实收资本</td>
						<td><input type="text" v-model="docInfo.registeredAssets"/></td>
					</tr>
					<tr>
						<td>经营者姓名</td>
						<td><input type="text" v-model="docInfo.registeredAssets"/></td>
					</tr>
					<tr>
						<td>组成形式</td>
						<td><input type="text" v-model="docInfo.registeredAssets"/></td>
					</tr>
					<tr>
						<td>执照有效期</td>
						<td>
							<datepicker class="datePicker" ></datepicker>
							<span>——</span>
							<datepicker class="datePicker" ></datepicker>
						</td>
					</tr>
					<tr>
						<td>投资人姓名</td>
						<td><input type="text" v-model="docInfo.registeredAssets"/></td>
					</tr>
					<tr>
						<td>执行事务合伙人</td>
						<td><input type="text" v-model="docInfo.registeredAssets"/></td>
					</tr>
					<tr>
						<td>等级</td>
						<td>
							<span><input type="radio" name="level"/><label>普通认证</label></span>
							<span><input type="radio" name="level"/><label>高级认证</label></span>
						</td>
					</tr>
				</table>
				<div class="btnBox">
					<span class="cancelBtn" @click="cancelEdit()">取消</span>
					<span class="confirmBtn" @click="saveEdit()">确认</span>
				</div>
			</div>
			<div class="editDone-wrap" v-if="editDone">
				<div>
					<p>已成功提交，进入审核流程</p>
					<p @click="cancelEdit()">返回<em>公司详情</em></p>
				</div>
				
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import Datepicker from "../../units/Datepicker.vue"
	import "../../../assets/js/lib/corpbox/cropbox.js"
	import Modal from "../../../assets/js/modal.js"
	import MyAjax from "../../../assets/js/MyAjax.js"
	import "../../../assets/js/lib/zoom/jquery.magnify.js"
	import router from "../../../router"
	export default{
		name:"uploadDoc",
		data:function(){
			return{
				docInfo:{
					fileName:"",
					img:"",
//					img:require("../../../assets/logo.png"),
					companyName:"sudsh",
					type:"sdfd",//类型
					address:"四平路",
					registrationNum:"6256463535",
					legalPer:"peter",
					registeredAssets:"80000000",
					establishmentDate:"2004.10.1",
					
				},
				haveImg:false, //有无上传过图片  上传过那么就不可以再次上传
				editDone:false,//提交成功进入审核
			}
		},
		components:{
			Datepicker,
		},
		updated(){
			if(this.docInfo.img != ""){
				this.haveImg = true;
			}else{
				this.haveImg = false;
			}
		},
		mounted(){
			var that = this;
			$('#upload-file').on('change', function(){
				var reader = new FileReader();
				reader.onload = function(e){
					console.log(e.target.result)
					that.docInfo.img = e.target.result
					that.haveImg = true;
				}
				var files=document.getElementById("upload-file").files[0];
				reader.readAsDataURL(files);
				console.log(files)
				that.docInfo.fileName = files.name;
				
			})
			$('[data-magnify]').magnify({
			    headToolbar: [
			      'close'
			    ],
			    footToolbar: [
			      'maximize',
			      'zoomIn',
			      'zoomOut',
			      'prev',
			      'fullscreen',
			      'next',
			      'actualSize',
			      'rotateLeft',
			      'rotateRight'
			    ],
			    modalWidth: 400,
			    modalHeight: 400
			  });
		},
		methods:{
			croperShow(){
				Modal.makeText($('.corpbox'))
			},
			croperClose(){
	    		Modal.closeModal($('.corpbox'))
   			},
   			cancelEdit(){
   				router.push(-1)
   			},
   			saveEdit(){
   				router.go(-1)
   			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
@import url("../../../assets/js/lib/zoom/jquery.magnify.css");
$themeColor:#f37b23;
	.uploadDoc{
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
			.img-wrap{
				float: left;
				width: 300px; height: 450px;
				
				.imgContainer{
					width: 300px; height: 350px;
					border:1px solid #999999;
					position:relative; cursor: pointer;
					overflow:hidden;
					img{
						width: 100%; height: 100%;
					}
					input[type=file]{
						position: absolute;
						left: 0; top: 0;
						width: 100%; height: 100%;
						z-index: 9;
						opacity: 0;
    					filter: alpha(opacity=0);
					}
					>span{
						position: absolute;
						left: 0; top: 0;
						width: 100%; height: 100%;
						line-height: 350px; text-align: center;
						z-index: 1;
					}
				}
				p{
					height: 35px; line-height: 35px;
					margin-top: 10px;
					input{
						height: 35px; width: 240px;
						border:1px solid #999999;
						
					}
				}
				
			}
			table{
				float: left;
				border:1px solid #999999;
				width: 940px; margin-left: 30px;
				margin-bottom:40px;
				td{
					border:1px solid #999999;
					line-height: 38px; min-height: 38px;
					&:nth-child(1){
						text-align: center;
						width: 20%;
					}
					&:nth-child(2){
						padding-left: 12px;
					}
					.date-picker{
						width: 300px; float: left; margin: 5px 0;
						.input-wrapper{
							border: 1px solid #CCCCCC !important;
						}
						.date-panel{
							left: 0 !important;
						}
					}
					span{ float: left;margin: 0 10px;}
					label{ margin-left: 10px;}
					>input[type=text]{width: 100%;}
				}
			}
			.editDone-wrap{
				>div{
					width: 549px;
					overflow: hidden;
				    position:absolute;top:50%;left:50%; 
					transform:translate(-50%,-50%);
					-webkit-transform:translate(-50%,-50%);
					-moz-transform:translate(-50%,-50%);
					-ms-transform:translate(-50%,-50%);
					-o-transform:translate(-50%,-50%);
					p{
						height: 50px; line-height: 50px;
						text-align: center; font-size: 20px;
						&:last-child{cursor: pointer;}
						em{
							color: #E4680C;
						}
					}
				}
			}
		}
	}
</style>