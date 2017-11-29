<template>
	<transition name="move">
		<div v-show="showFlag" class="food" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" alt="">
					<div class="back">
						<span @click="hideFlag"> < </span>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food"></cartcontrol>
					</div>
					<transition name="fade">
						<div @click.stop.prevent="addFirst" class="buy" v-show="!food.count||food.count===0">加入购物车</div>
					</transition>
				</div>
				<split v-show="food.info"></split>
				<div class="info">
					<h1 class="title">商品信息</h1>
					<p class="text" v-show="food.info">{{food.info}}</p>
				</div>
				<split></split>	
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.rating">
					</ratingselect>
					<split></split>	
				</div>

			</div>
		</div>
	</transition>
</template>
<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
import ratingselect from '../ratingselect/ratingselect'
import split from '../split/split'
	const POSITIVE = 0
	const NEGATIVE = 1
	const ALL = 2
	export default{
		components:{
			cartcontrol,
			ratingselect,
			split
		},
		props:{
			food:{
				type:Object
			},
			showFlag:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				selectType:ALL,
				onlyContent:true,
				desc:{
					all:'全部',
					positive:'推荐',
					negative:'吐槽'
				}
			}
		},
		methods:{
			show(){
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll=new BScroll(this.$refs.food,{
							click:true
						})
					}else{
						this.scroll.refresh()
					}
				})
				this.selectType = ALL
				this.onlyContent = true
			},
			hideFlag(){
				this.$emit('on-close')
			},
			addFirst(event){
				if(event._constructed){
					return
				}
				Vue.set(this.food,'count',1)
			}
		},
		created(){
			this.show()
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.food
	position:fixed
	width:100%
	left:0
	top:0
	bottom:48px
	z-index:30
	background:#fff
	transform:translate3d(0,0,0)
	&.move-enter-active {
		transition: all 0.2s linear;
	}
	&.move-leave-active {
		transition: all 0.2s linear;
	}
	&.move-enter {
		transform:translate3d(100%,0,0)
	}
	&.move-leave-active {
		transform:translate3d(100%,0,0)
	}
	.image-header
		position:relative
		width:100%
		height:0
		padding-bottom:100%
		img
			position:absolute
			top:0
			left:0
			width:100%
			height:100%
		.back
			position:absolute
			top:10px
			left:10px
			span
				font-size:34px
				color:#ccc
	.content
		padding:18px
		position:relative
		.title
			line-height:14px
			margin-bottom:8px
			font-size:14px
			font-weight:700
			color:rgb(7,17,27)
		.detail
			margin-bottom:18px
			line-height:10px
			height:10px
			font-size:0
			.sell-count,.rating
				font-size:10px
				color:rgb(147,153,159)
			.sell-count
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
			right:18px
			bottom:18px
		.buy
			position:absolute
			right:18px
			bottom:18px
			z-index:10
			height:24px
			line-height:24px
			padding:0 12px
			box-sizing:border-box
			font-size:10px
			border-radius:12px
			color:#fff
			background:rgb(0,160,220)
			opacity:1
			&.fade-enter-active {
				transition: all 0.2s linear;
			}
			&.fade-leave-active {
				transition: all 0.2s linear;
			}
			&.fade-enter {
				opacity:0
			}
			&.fade-leave-active {
				opacity:0
			}
	
	.info
		padding:18px
		.title
			line-height:14px
			margin-bottom:6px
			font-size:14px
			color:rgb(7,17,27)
		.text
			line-height:24px
			padding:0 8px
			font-size:12px
			color:rgb(77,85,93)
</style>