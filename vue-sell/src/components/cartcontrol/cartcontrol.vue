<template>
	<div class="cartcontrol">
		<div class="cart-decrease" v-show="food.count>0">
			-
		</div>
		<div class="cart-count" v-show="food.count>0">
			{{food.count}}
		</div>
		<div class="cart-add" @click="addCart">
			+
		</div>
	</div>
</template>
<script>
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
	created(){
		
	},
	methods:{
		
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
	font-size:0
	.cart-decrease
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