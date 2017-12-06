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
				<div class="ratings">
					<h1 class="title">商品评价</h1>
					<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" @on-selected="onSelected" @on-onlycontent="onOnlycontent">
					</ratingselect>
					<split></split>	
				</div>
				
				<div class="rating-wrapper">
					<ul v-show="food.ratings&&food.ratings.length">
						<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img :src="rating.avatar" class="avatar" width="12" height="12">
							</div>
							<div class="time">{{rating.rateTime | formatDate}}</div>
							<p class="text">
								<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
							</p>
						</li>
					</ul>
					<div class="no-ratings" v-show="!food.ratings||!food.ratings.length">
						暂无评价
					</div>	
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
import Vue from 'vue'
import {formatDate} from '../../common/js/date'
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
			},
			onSelected(type){
				this.selectType = type
				this.$nextTick(()=>{
					this.scroll.refresh()
				})
			},
			onOnlycontent(){
				this.onlyContent = !this.onlyContent
			},
			needShow(type,text){
				//首先判断只看内容而没有文本
				if(this.onlyContent && !text){
					return false
				}
				//如果选择所有的
				if(this.selectType === ALL){
					return true
				}else{
					//判断当前type是否等于选中的状态
					return type === this.selectType
				}
			}
		},
		filters:{
			formatDate(time){
				let date = new Date(time)
				return formatDate(date,'yyyy-MM-dd hh:mm')
			}
		},
		created(){
			this.show()
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
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
				transition: all 0.2s linear
			}
			&.fade-leave-active {
				transition: all 0.2s linear
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
	.ratings
		padding-top:18px
		.title
			line-height:14px
			margin-bottom:6px
			font-size:14px
			color:rgb(7,17,27)
			margin-left:18px
	.rating-wrapper
		padding:0 18px
		.rating-item
			position:relative
			padding:16px 0
			border-1px(rgba(7,17,27,0.1))
			.user
				position:absolute
				right:0
				top:16px
				font-size:0
				.name
					display:inline-block
					margin-right:6px
					vertical-align:top
					font-size:10px
					color:rgb(147,153,159)
				.avatar
					border-radius:50%
			.time
				margin-bottom:6px
				line-height:12px
				font-size:10px
				color:rgb(147,153,159)
			.text
				line-height:16px
				font-size:12px
				color:rgb(7,17,27)
				.icon-thumb_up,.icon-thumb_down
					margin-right:4px
					line-height:16px
					font-size:12px
				.icon-thumb_up
					color:rgb(0,160,220)
				.icon-thumb_down
					color:rgb(147,153,159)
		.no-ratings
			padding:16px 0
			font-size:12px
			color:rgb(147,153,159)

</style>