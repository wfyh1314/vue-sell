<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" 
			:ratings="ratings" @on-selected="onSelected" @on-onlycontent="onOnlycontent">
			</ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item border-1px">
						<div class="avatar">
							<img :src="rating.avatar" width="28px" height="28px">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">
									{{rating.deliveryTime}}分钟送达
								</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend.length">
								<span class='icon-thumb_up'></span>
								<span v-for="item in rating.recommend" class="item">{{item}}</span>
							</div>
							<div class="time">
								{{rating.rateTime | formatDate}}
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import star from '../star/star'
import BScroll from 'better-scroll'
import {formatDate} from '../../common/js/date'
import ratingselect from '../ratingselect/ratingselect'
import split from '../split/split'

const ALL = 2;
const ERR_OK = 0;
export default{
	props:{
		seller:{
			type:Object
		}
	},
	components:{
		star,
		split,
		ratingselect
	},
	data(){
		return{
			ratings:[],
			showFlag:false,
			selectType:ALL,
			onlyContent:true,
			desc:{
					all:'全部',
					positive:'满意',
					negative:'不满意'
				}
		}
	},
	created(){
		this.$http.get('/api/ratings').then((res)=>{
			res = res.body
			if(res.errno === ERR_OK){
				this.ratings = res.data
				this.$nextTick(()=>{
					this.scroll=new BScroll(this.$refs.ratings,{
						click:true
					})
				})
			}
		})
	},
	filters:{
		formatDate(time){
			let date = new Date(time)
			return formatDate(date,'yyyy-MM-dd hh:mm')
		}
	},
	methods:{
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
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin"
.ratings
	position:absolute
	top:174px
	bottom:0
	left:0
	width:100%
	overflow:hidden
	.overview
		display:flex
		.overview-left
			flex:0 0 137px
			padding:6px 0
			width:137px
			border-right:1px solid rgba(7,17,27,0.2)
			text-align:center
			@media only screen and (max-width:320px)
				flex:0 0 120px
				width:120px
			.score
				margin-bottom:6px
				line-height:28px
				font-size:24px
				color:rgb(255,153,0)
			.title
				margin-bottom:8px
				line-height:12px
				font-size:12px
				color:rgb(7,17,27)
			.rank
				line-height:10px
				font-size:10px
				color:rgb(147,153,159)
		.overview-right
			flex:1
			padding:6px 0 6px 24px
			@media only screen and (max-width:320px)
				padding-left:6px
			.score-wrapper
				margin-bottom:8px
				font-size:0
				.title
					display:inline-block
					line-height:18px
					font-size:12px
					color:rgb(7,17,27)
				.star
					display:inline-block
					margin:0 12px
					vertical-align:top
				.score
					display:inline-block
					line-height:18px
					vertical-align:top
					font-size:12px
					color:rgb(255,153,0)
			.delivery-wrapper
				font-size:0
				.title
					line-height:18px
					font-size:12px
					color:rgb(7,17,27)
				.delivery
					margin-left:12px
					font-size:12px
					color:rgb(147,153,159)
		

	.rating-wrapper
		padding:0 18px
		.rating-item
			display:flex
			padding:18px 0
			border-1px(rgba(7,17,27,0.1))
			.avatar
				flex:0 0 28px
				width:28px
				margin-right:12px
				img
					border-radius:50%
			.content
				position:relative
				flex:1
				.name
					margin-bottom:4px
					line-height:12px
					font-size:10px
					color:rgb(7,17,27)
				.star-wrapper
					margin-bottom:6px
					font-size:0
					.star
						display:inline-block
						margin-right:6px
						vertical-align:top
					.delivery
						display:inline-block
						vertical-align:top
						font-size:20px
						font-weight:200
						color:rgb(147,153,159)
						line-height:24px
				.text
					line-height:18px
					color:rgb(147,153,159)
					font-size:12px
					margin-bottom:8px
				.recommend
					line-height:16px
					font-size:0
					.icon-thumb_up,.item
						display: inline-block
						margin: 0 8px 4px 0
						font-size: 9px
					.icon-thumb_up
						color: rgb(0,160,220)
					.item
						padding:0 6px
						border:1px solid rgba(7,17,27,0.1)
						border-radius:1px
						color:rgb(147,153,159)
						background:#fff
				.time
					position:absolute
					top:0
					right:10px
					line-height:12px
					font-size:10px
					color:rgb(147,153,159)










</style>
