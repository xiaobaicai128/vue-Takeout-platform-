<template>
  <div class="cart-control">
    <transition name="move">  
      <div class="decrease" v-show="food.count>0" @touchstart="startDecrease($event)" @touchend.stop.prevent="stopDecrease($event)">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="count" v-show="food.count>0">{{food.count}}</div>
    <div class="increase icon-add_circle" @touchstart="startAdd($event)" @touchend.stop.prevent="stopAdd($event)"></div>

  </div>
</template>
<script>  
  import Vue from 'vue'
  // let Tap = document.getelementByClass
  // element.addEventListener('tap', console.log(22), false)
  export default {
    props: {
      food: {
        type: Object
      }
    },
    created() {
      // console.log(this.food)
    },
    methods: {
      // addCount(event) { 
      //   if (!event._constructed) { // 去掉自带的click事件点击，即pc端直接返回
      //     return
      //   }
      //   console.log(1)
      //   if (!this.food.count) {
      //     Vue.set(this.food, 'count', 1) // vue.set 创建新的内容，给food添加count属性
      //     this.food.count++
      //   }
      // },
      // decreaseCount(event) {
      //   if (!event._constructed) {
      //     return
      //   }
      //   if (this.food.count) {
      //     this.food.count--
      //   }
      // },
      // 用tachstart 和tarchend 模拟click 以防止出现重复点击
      startAdd ($event) {
        this.startY = $event.touches[0].pageY
      },
      stopAdd ($event) {
        const moving = Math.abs($event.changedTouches[0].pageY - this.startY)
        if (moving > 20) return
        this.startY = 0
        console.log('click')
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1) // vue.set 创建新的内容，给food添加count属性
          this.food.count = 1
          this.$root.eventHub.$emit('cart.add', event.target)
        } else {
          this.food.count++ 
          this.$root.eventHub.$emit('cart.add', event.target)
        }           
      },    
      startDecrease ($event) {
        this.startY = $event.touches[0].pageY
      },
      stopDecrease ($event) {
        const moving = Math.abs($event.changedTouches[0].pageY - this.startY)
        if (moving > 20) return
        this.startY = 0
        console.log('click')
        if (this.food.count) {
          this.food.count--
        } 
      }
      
    }
  }
</script>
<style lang="stylus">
  .cart-control
    font-size: 0
    .decrease
      display: inline-block
      padding: 6px
      transition: all 0.4s linear
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0,160,220)
        transition: all 0.5s linear
      // 只需写进入时的状态和离开完成后的状态
      &.move-enter,&.move-leave-active
        opacity: 0
        transform: translate3d(24px,0,0)
        .inner
          transform: rotate(180deg)  
    .count
      display inline-block
      vertical-align top 
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 12px
      color rgb(147,153,159)
      
    .increase
      display inline-block 
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0,160,220)
</style>
