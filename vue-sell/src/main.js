// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
//引用组件路径
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'
import './common/stylus/index.styl'
Vue.config.productionTip = false

//注册路由
Vue.use(VueRouter)
Vue.use(VueResource)
VueRouter.prototype.goBack = function () { 
　　this.isBack = true
　　window.history.go(-1)
}


let router = new VueRouter({
	//配置active状态
	linkActiveClass:'active',
	//mode:'history',
	routes:[
		{
	        path: '/goods',
	        component: goods
	    },
	    {
	        path: '/ratings',
	        component: ratings
	    },
	    {
	        path: '/seller',
	        component: seller
	    }
	]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
