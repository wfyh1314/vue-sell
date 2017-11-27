<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item border-1px" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
					<span class="text">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
					{{item.name}}
					</span>
				</li>
			</ul>
		</div>

		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-1px">
							<div class="icon">
								<img :src="food.icon" width="57px" height="57px">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart :delivery-price="seller.deliveryPrice" 
		:min-price="seller.minPrice"></shopcart>
	</div>
</template>
<script>
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import BScroll from 'better-scroll'

//import star from '../star/star'
const ERR_OK = 0;
export default {
	components:{
		shopcart,
		cartcontrol
	},
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return{
			goods:[],
			//区间高度数组
			listHeight:[],
			scrollY:0
		}
	},
	computed:{
		currentIndex(){
			for(let i = 0;i < this.listHeight.length;i++){
				let height1 = this.listHeight[i];
				let height2 = this.listHeight[i+1];
				//判断是否在这个区间
				if(!height2||(this.scrollY >= height1 && this.scrollY < height2)){
					return i
				}
				
			}
			return 0
		}
	},
	created(){
		this.classMap = ['decrease','discount','invoice','special']
		this.$http.get('/api/goods').then((res)=>{
			res=res.body
			if(res.errno === ERR_OK){
				this.goods = res.data
				this.$nextTick(()=>{
					//调用初始化方法
					this._initScroll()
					//计算高度
					this._calculateHeight()
				})
			}
		})
	},
	methods:{
		//初始化
		_initScroll(){
			this.menuScroll = new BScroll(this.$refs.menuWrapper,{
				click:true
			});
			this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
				click:true,
				//滚动的时候能实时告诉滚动的位置
				probeType:3
			});
			//foodsScroll滚动
			this.foodsScroll.on('scroll',(pos)=>{
				//获得右侧scrollY,取正数,better插件提供实时检测滚动高度pos.y
				this.scrollY = Math.abs(Math.round(pos.y));
			})
		},
		//计算每个榜单内容区高度
		_calculateHeight(){
			let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
			let height = 0;
			//递增的区间数组,第一个高度0
			this.listHeight.push(height);
			for (let i = 0; i < foodList.length; i++){
				let item = foodList[i];
				//clienHeight获得内容区高度
				height += item.clientHeight;
				this.listHeight.push(height);
			}
		},
		selectMenu(index,event){
			 //自己默认派发事件时候(BScroll),_constructed被置为true,但是浏览器原生并没有这个属性
			if(!event._constructed){
				return;
			}
			//获得元素
			let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
			let el = foodList[index]
			this.foodsScroll.scrollToElement(el,300)
		}
	}
	
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
.goods
	display:flex
	position:absolute
	top:174px
	bottom:46px
	width:100%
	overflow:hidden
	.menu-wrapper
		flex:0 0 80px 
		width:80px
		background:#f3f5f7
		.menu-item
			display:table
			height:54px
			width:56px
			line-height:14px
			padding:0 12px
			&.current
				background:#fff
				position:relative
				margin-top:-1px
				z-index:10
				font-weight:700
				.text
					border-none()
			.icon
				display:inline-block
				vertical-align:top
				width:12px 
				height:12px
				margin-right:2px
				background-size:12px 12px 
				background-repeat:no-repeat
				&.decrease
					bg-image('decrease_3')
				&.discount
					bg-image('discount_3')
				&.guarantee
					bg-image('guarantee_3')
				&.invoice
					bg-image('invoice_3')
				&.special
					bg-image('special_3')
			.text
				display:table-cell
				width:56px
				vertical-align:middle
				font-size:12px
				border-1px(rgba(7,17,27,0.1))
	.foods-wrapper
		flex:1
		.title
			padding-left:14px
			height:25px
			line-height:26px
			border-left:2px solid #d9dde1
			font-size:12px
			color:rgb(147,153,159)
			background:#f3f5f7
		.food-item
			display:flex
			margin:18px
			padding-bottom:18px
			border-1px(rgba(7,17,27,0.1))
			&:last-child
				border-none()
				margin-bottom:0
			.icon
				flex:0 0 57px
				margin-right:10px
			.content
				flex:1
				.name
					margin:2px 0 8px 0
					height:14px
					line-height:14px
					font-size:14px
					color:rgb(7,17,27)
				.desc
					margin-bottom:8px
					line-height:12px
					font-size:10px
					color:rgb(147,153,159)
				.extra
					line-height:12px
					font-size:10px
					count
						margin-right:12px
				.price
					font-weight:700
					line-height:24px
					.now
						color:rgb(240,20,20)
						margin-right:18px
						font-size:14px
					.old
						text-decoration:line-through
						font-size:10px
						color:rgba(7,17,27,0.4)
				.cartcontrol-wrapper
					position:absolute
					right:0
					bottom:12px
</style>