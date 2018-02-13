// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios';

import Swiper from "./assets/js/lib/swiper/idangerous.swiper.min.js"
import "./assets/js/lib/swiper/idangerous.swiper.3dflow.js"
	
import './assets/scss/main.scss'

import './assets/js/common.js'
import { Row, Col,Upload,Dialog,Button,Switch,Message} from 'element-ui'

Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Message) 
//Vue.prototype.$message = Message


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
