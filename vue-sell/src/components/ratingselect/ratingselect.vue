<template>
	<div class="ratingselect">
		<div class="rating-type border-1px">
			<span class="block positive" :class="{'active':selectType===2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span class="block positive" :class="{'active':selectType===0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span class="block negative" :class="{'active':selectType===1}" @click="select(1,$event)">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
		</div>
		<div class="switch" :class="{'on':onlyContent}" @click="toggleContent($event)">
			<span class="icon-check">√</span>
			<span>只看内容的评价</span>
		</div>
	</div>
</template>

<script>

import Vue from 'vue'
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default{
	props:{
		ratings:{
			type:Array,
			default(){
				return []
			}
		},
		selectType:{
			type:Number,
			default:ALL
		},
		onlyContent:{
			type:Boolean,
			default:false
		},
		desc:{
			type:Object,
			default(){
				return {
					all:'全部',
					positive:'满意',
					negative:'不满意'
				}
			}
		}
	},
	data(){
		return{
			
		}
	},
	computed:{
		positives(){
			return this.ratings.filter((rating)=>{
				return rating.rateType===POSITIVE
			})
		},
		negative(){
			return this.ratings.filter((rating)=>{
				return rating.rateType===NEGATIVE
			})
		},
	},
	methods:{
		select(type,event){
			if(!event._constructed){
				return;
			}
			//子组件传参
			this.$emit('on-selected',type)
		},
		toggleContent(event){
			if(!event._constructed){
				return;
			}
			//子组件传参
			this.$emit('on-onlycontent')
		}
	}
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
.ratingselect
	.rating-type
		padding:18px 0
		margin:0 18px
		border-1px(rgb(7,17,27,0,1))
		font-size:0
		.block
			display:inline-block
			padding:8px 12px
			border-radius:2px
			margin-right:8px
			color:rgb(77,85,93)
			font-size:12px
			line-height:16px

			&.active
				color:#fff
				.count
					font-size:8px
					margin-left:2px
			&.positive
				background:rgba(0,160,220,0.2)
				&.active
					background:rgba(0,160,220,1)
			&.negative
				background:rgba(77,85,93,0.2)
				&.active
					background:rgba(77,85,93,1)

	.switch
		padding:12px 18px
		line-height:24px
		border-bottom:1px solid rgba(7,17,27,0.1)
		color:rgb(147,153,159)
		&.on
			.icon-check
				background:#00c850
		.icon-check
			display:inline-block
			width:20px
			height:20px
			border-radius:50%
			background:rgb(147,153,159)
			color:#fff
			font-weight:bold
		
				
</style>