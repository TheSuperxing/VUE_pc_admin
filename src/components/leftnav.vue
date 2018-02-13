<template>
	<div class="leftNav">
		<ul>
			<li v-for="item in tabs">
				<router-link :to="item.rout">{{item.text}}</router-link>
				
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name:"leftNav",
		data:function(){
			return{
				
				lookup:[
					{
			          text: "个人", rout: "/lookup/per",
			        }, {
			          text: "团队",rout: "/lookup/team",
			        }, {
			          text: "公司",rout: "/lookup/com",
			        }, {
			          text: "网站内项目",rout: "/lookup/proj",
			        },{
			          text: "用户创建项目",rout: "/lookup/projUser",
			        }, {
			          text: "需求", rout: "/lookup/demands",
			        }, {
			          text: "文档", rout: "/lookup/docs",
			        }	
				],
				create:[
					{
						text:"公司",rout:"/create/com"
					},{
						text:"项目",rout:"/create/proj"
					}
				],
				check:[
					{
						text:"认证文件",rout:"/check/doc"
					},{
						text:"需求",rout:"/check/demands"
					},{
						text:"协议",rout:"/check/deals"
					},{
						text:"后台流程",rout:"/check/process"
					}
				],
				inform:[
					{
						text:"更换关联公司",rout:"/inform/com"
					},{
						text:"更换关联项目",rout:"/inform/demands"
					},{
						text:"推送需求",rout:"/inform/proj"
					}
				],
				promote:[
					{
						text:"banner",rout:""
					},{
						text:"个人推介",rout:""
					},{
						text:"团队推介",rout:""
					},{
						text:"公司推介",rout:""
					},{
						text:"需求推介",rout:""
					},{
						text:"项目推介",rout:""
					}
				],
				permission:[
					{
						text:"角色权限管理",rout:""
					},{
						text:"管理员列表",rout:""
					}
				],
				management:[
					{
						text:"账号设置",rout:"/management/account"
					},{
						text:"网站日志",rout:"/management/siteLog"
					},{
						text:"工作日志",rout:"/management/workLog"
					}
				],
				management2:[
					{
						text:"账号设置",rout:"/management/account"
					},{
						text:"我的流程",rout:"/management/myProcess"
					},{
						text:"工作日志",rout:"/management/workLog"
					}
				]
									
								
				
			}
		},
		computed:{
			tabs:function(){
				switch (this.$route.matched[0].name){
					case "LookUp":
						return this.lookup
						break;
					case "create":
						return this.create
						break;
					case "check":
						return this.check 
						break;
					case "inform":
						return this.inform 
						break;
					case "promote":
						return this.promote 
						break;
					case "permission":
						return this.permission 
						break;
					case "management":
						//判断一下登录者身份  来显示左侧导航的类别
						return this.management 
						break;
					default: //已经激活但是没有登录身份状态  即没有登录  那么就去登录
						break;
				}
			}
		},
		
		mounted(){
//			console.log(this.$route.matched[0].name)
		}
	}
</script>

<style lang="scss" scoped="scoped">
.leftNav{
	/*float: left;*/
	height: 100%;
	width: 200px;
	background: #444444;
	position: fixed;
	left: 0; top: 70px;
	z-index: 9;
	/*margin-right:-200px;*/
	ul{
		li{
			width: 100%;
			border-bottom: 1px solid #272727;
			height: 50px;
			line-height: 50px;
			text-align: center;
			border-top: 1px solid #2b2b2b;
            border-right-style:inset;
            border-bottom: 1px solid #555555;
            
			a{
				color: #FFFFFF;
				display: block;
				width: 100%; height: 100%;
				text-decoration: none !important;
				&.router-link-active{
					color: #E4680C;
					background: #272727;
				}
				&:hover{
					color: #E4680C;
					background: #272727;
				}
			}
			
		}
	}
}
</style>