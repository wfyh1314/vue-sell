<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
				<transition name="rotate">
					<span class="inner">-</span>
				</transition>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">
			{{food.count}}
		</div>
		<div class="cart-add" @click="addCart">
			+
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
export default{
	props:{
		food:{
			type:Object
		}
	},
	data(){
		return{

		}
	},
	methods:{
		addCart(event){
			if(!event._constructed){
				return;
			}
			if(!this.food.count){
				Vue.set(this.food,'count','1')
				this.food.count = 1
			}else{
				this.food.count++
			}
			this.$emit('add-cart',event.target)
		},
		decreaseCart(event){
			if(!event._constructed){
				return;
			}
			if(this.food.count){
				this.food.count--
			}
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
	font-size:0
	.move-enter-active {
		transition: all 0.4s linear;
	}
	.move-leave-active {
		transition: all 0.4s linear;
	}
	.move-enter {
	  	opacity:0
	   	transform:translate3D(24px,0,0) rotate(180deg) 
	}
	.move-leave-active {
	  	opacity:0
	   	transform:translate3D(24px,0,0) rotate(180deg) 
	}
	.cart-decrease
		display:inline-block
		.inner
			display:inline-block
			line-height:24px
			width:24px
			height:24px
			font-size:24px	
			color:#fff
			background:rgb(0,160,220)
			border-radius:50%
			text-align:center
			vertical-align:middle
			cursor:pointer

	.cart-count
		display:inline-block
		vertical-align:top
		width:24px
		line-height:24px
		text-align:center
		font-size:10px
		color:rgb(147,153,159)
	.cart-add
		display:inline-block
		line-height:24px
		width:24px
		height:24px
		font-size:24px	
		color:#fff
		background:rgb(0,160,220)
		border-radius:50%
		text-align:center
		vertical-align:middle
		cursor:pointer
</style>