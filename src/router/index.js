import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/index.vue"
import DiscoveryRequirements from "../components/fxxq.vue"
import PublishingRequirements from "../components/fbxq.vue"
import Business from "../components/wdjy.vue"

import LookUp from "../components/lookup/lookup.vue"
import comIndex from "../components/lookup/comIndex.vue"
import teamList from "../components/lookup/list/teamList.vue"
import perList from "../components/lookup/list/perList.vue"
import comList from "../components/lookup/list/comList.vue"
import projList from "../components/lookup/list/projList.vue"
import projUserList from "../components/lookup/list/projUserList.vue"
import demandsList from "../components/lookup/list/demandsList.vue"
import docList from "../components/lookup/list/docList.vue"
import comDetail from "../components/lookup/detail/comDetail.vue"
import uploadDoc from "../components/lookup/detail/uploadDoc.vue"

import create from "../components/create/create.vue"
import createCom from "../components/create/createCom.vue"
import createProj from "../components/create/createProj.vue"

import check from "../components/check/check.vue"
import checkDoc from "../components/check/checkDoc.vue"
import checkDemands from "../components/check/checkDemands.vue"
import checkDeals from "../components/check/checkDeals.vue"
import checkProcess from "../components/check/checkProcess.vue"


import inform from "../components/inform/inform.vue"
import informCom from "../components/inform/informCom.vue"
import informDemands from "../components/inform/informDemands.vue"
import informProj from "../components/inform/informProj.vue"

import promote from "../components/promote/promote.vue"/*暂时不上业务*/
import permission from "../components/permission/permission.vue"/*暂时不上业务*/

import management from "../components/management/management.vue"
import accountSet from "../components/management/accountSet.vue"
import myProcess from "../components/management/myProcess.vue"
import workLog from "../components/management/workLog.vue"
import siteLog from "../components/management/siteLog.vue"

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path:"/",
      redirect:"/lookup",
    }, 
    {
      path:'/index',
      name:'Index',
      component:Index
    },
    {
      path:'/fxxq',
      name:"DiscoveryRequirements",
      component:DiscoveryRequirements
    },
    {
      path:'/fbxq',
      name:"PublishingRequirements",
      component:PublishingRequirements
    },
    {
      path:'/wdjy',
      name:"Business",
      component:Business
    },
    {
    	path:"/lookup",
    	name:"LookUp",
    	component:LookUp, redirect:"/lookup/per",
    	children:[
    		{
    			path:"/lookup/per",component:perList,name:"perList"
    		},{
    			path:"/lookup/team",component:teamList,name:"teamList"
    		},{
    			path:"/lookup/com",component:comIndex,redirect:"/lookup/com/list",
    			children:[
    				{
    					path:"/lookup/com/list",component:comList,name:"comList"
    				},{
		    			path:"/lookup/com/detail",component:comDetail,name:"comDetail"
		    		},{
		    			path:"/lookup/com/editDoc",component:uploadDoc,name:"uploadDoc"
		    		}
    			]
    			
    		},{
    			path:"/lookup/proj",component:projList,name:"projList"
    		},{
    			path:"/lookup/projUser",component:projUserList,name:"projUserList"
    		},{
    			path:"/lookup/demands",component:demandsList,name:"demandsList"
    		},{
    			path:"/lookup/docs",component:docList,name:"docList"
    		}
    	]
    },{
    	path:"/create",
    	name:"create",
    	component:create, redirect:"/create/com",
    	children:[
    		{
    			path:"/create/com",component:createCom,name:"createCom",
    				
    		},{
    			path:"/create/proj",component:createProj,name:"createProj"
    		}
    	]
    },{
    	path:"/check",
    	name:"check",
    	component:check, redirect:"/check/doc",
    	children:[
    		{
    			path:"/check/doc",component:checkDoc,name:"checkDoc",
    		},{
    			path:"/check/demands",component:checkDemands,name:"checkDemands"
    		},{
    			path:"/check/deals",component:checkDemands,name:"checkDeals"
    		},{
    			path:"/check/process",component:checkDemands,name:"checkProcess"
    		}
    	]
    },{
    	path:"/inform",
    	name:"inform",
    	component:inform, redirect:"/inform/com",
    	children:[
    		{
    			path:"/inform/com",component:informCom,name:"informCom",
    		},{
    			path:"/inform/demands",component:informDemands,name:"informDemands"
    		},{
    			path:"/inform/proj",component:informProj,name:"informProj"
    		}
    	]
    },,{
    	path:"/promote",
    	name:"promote",
    	component:promote, redirect:"",
    },,{
    	path:"/permission",
    	name:"permission",
    	component:permission, redirect:"",
    },,{
    	path:"/management",
    	name:"management",
    	component:management, redirect:"/management/account",
    	children:[
    		{
    			path:"/management/account",component:accountSet,name:"accountSet"
    		},{
    			path:"/management/myProcess",component:myProcess,name:"myProcess"
    		},{
    			path:"/management/workLog",component:workLog,name:"workLog"
    		},{
    			path:"/management/siteLog",component:siteLog,name:"siteLog"
    		}
    	]
    },
   
   
  ]
})
