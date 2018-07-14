<template>
  <transition name="move">
    <!-- better-scroll要加在父元素上，当子元素高度高于父元素时，自动滚动 -->
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image" alt="food.name">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>    
        </div>
        <div class="content">
          <div class="title">{{food.name}}</div>
          <div class="info">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评度{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now-price">{{food.price}}</span>
            <span class="old-price" v-show="food.oldPrice">{{food.oldPrice}}</span>
          </div>
          <div class="cart-wrapper">
            <cartcontrol :food=food></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count===0">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="description" v-show="food.info">
          <h1 class="title">商家详情</h1>
          <p class="text">{{food.info}}</p>
        </div> 
        <split v-show="food.info"></split>
        <div class="rating">
          <div class="title">商品评价</div>
          <ratingselect :rating-type="selectType" :only-content="onlyContent" :desc="desc " :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings&&food.ratings.length">
              <li v-show="showRating(rating.rateType,rating.text)" v-for="rating in food.ratings" :key="rating.id" class="rating-item">
                <div class="user">
                  <div class="name">{{rating.username}}</div>
                  <img :src="rating.avatar" class="avatar" alt="" width="12px" height="12px">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0, 'icon-thumb_down':rating.rateType===1}"></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>   
</template>
<script>
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import Vue from 'vue'
  import split from '../split/split.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  import {formatDate} from '../../common/js/date.js'
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2 
  export default {
    data() {
      return {
         showFlag: false,
         selectType: ALL,
         onlyContent: false,
         desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
         }
       }     
    },
    props: {
      food: {
        type: Object
      }
    },
    // created() {
    //   this.$root.eventHub.$on('changeData',this.changeData)
    // },
    methods: {
      show() {
        this.showFlag = true
        this.selectType = ALL // 再次初始化
        this.onlyContent = false
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {click: true}) // 初始化bscroll
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide() {
        this.showFlag = false
      },
      addFirst() {
        this.$root.eventHub.$emit('cart.add', event.target)
        Vue.set(this.food, 'count', 1)
      },
      showRating(type, text) {
        if (this.onlyContent && !text) {
          return false
        } 
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }

    },
    created() {
        
        this.$root.eventHub.$on('changeData', (type) => {
          this.selectType = type
          this.$nextTick(() => { // 动态更新 因为改变数据，vue的dom更新是异步的，在修改数据之后因立即使用$nextTick
            this.scroll.refresh()
          })

        })
        this.$root.eventHub.$on('changeContent', (tempOnlyContent) => {
          this.onlyContent = tempOnlyContent
          this.$nextTick(() => {
            this.scroll.refresh()
          })
        })
      },
    filters: { // 自定义过滤器
      formatDate(time) { 
        // let date = new Date(time)
        return formatDate(time, 'yyyy-MM-dd hh:mm') // 组件化 通过正则表达式来匹配到所求的格式
      }
      // formatDate(time) { // 非组件化， 只能每次拼出所要的格式
      //   var date = new Date(time);
      //   var y = date.getFullYear();
      //   var m = date.getMonth() + 1;
      //   var d = date.getDate();
      //   var h = date.getHours();
      //   var mi = date.getMinutes();
      //   m = m > 9 ? m : '0' + m;
      //   // alert("y:"+y+"m:"+m+"d:"+d+"h:"+h+"mi:"+mi);
      //   return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
      // }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>
<style lang="stylus">
  .food
    position fixed
    left 0
    top 0
    over-flow hidden
    bottom 48px
    width 100%
    z-index 30
    background-color #fff
    &.move-enter-active, &.move-leave-active
      transition all 0.5s
    &.move-enter, &.move-leave-active
      transform translate3d(100%,0,0) 
      opacity 0
    .img-header
      position relative
      width 100%
      height 0
      padding-top 100%
      img 
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 3px 
        border solid 1px rgb(147,153,159)
        background-color rgb(147,153,159)
        border-radius 50%
        &.back:hover 
          background-color rgb(0,160,220)
        .icon-arrow_lift
          display block
          padding 5px
          font-size 20px
          font-weight 500
          color #fff
    .content 
      position relative
      padding 18px
      .title 
        line-height 14px
        font-size 14px
        margin-bottom 8px
        font-weight 700
        color rgb(7,17,27)
      .info 
        amrgin-bottom 18px
        font-size 0px
        line-height 10px
        .sell-count, .rating 
          font-size 10px
          color rgb(147,153,159)
        .sell-count
          margin-right 12px 
      .price 
        font-weight 700
        line-height 24px
        .now-price
          margin-right 8px
          font-size 14px
          font-weight 700
          color rgb(240,20,20) 
        .old-price
          text-decoration line-through
          font-size 12px
          font-weight 700
          color rgb(147,153,159) 
      .cart-wrapper
        position absolute
        right 12px
        bottom 12px 
      .buy 
        position absolute
        right 18px
        bottom 18px
        z-index 10
        line-height 24px
        padding 0 12px
        box-sizing border-box
        border-radius 37px
        font-size 10px
        color #fff
        background-color rgb(0,160,220)
        &.fade-enter-active, &.fade-leave-active
          transition all 0.3s
        &.fade-enter, &.fade-leave-active
          opacity 0              
    .description 
      padding 18px
      .title 
        line-height 14px
        margin-bottom 16px
        font-size 14px
        font-weight 700
        color rgb(7,17,27)
      .text 
        line-height 24px
        padding 0 8px 
        font-size 12px
        color rgb(77,85,93)  
    .rating
      padding-top 18px
     
      .title 
        margin 0 18px 
        line-height 14px
        font-size 14px
        margin-bottom 8px
        font-weight 700
        color rgb(7,17,27)
      .rating-wrapper
        padding 0 18px
        .rating-item
          position relative
          padding 16px 0
          border-bottom 1px solid rgba(7,17,27,0.1)
          .user
            position absolute
            top 16px
            right 0
            font-size 0
            line-height 12px
            .name 
              display inline-block
              vertical-align top
              margin-right 6px
              font-size 10px
              color rgb(147,153,159) 
            .avatar
              border-radius 50% 
          .time
            margin-right 6px
            line-height 12px
            font-size 10px
            color rgb(147,153,159) 
          .text 
            line-height 16px 
            font-size 12px
            color rgb(7,17,27) 
            .icon-thumb_up, .icon-thumb_down
              line-height 16px
              margin-right 4px
              font-size 12px
            .icon-thumb_up
              color rgb(0,160,220)
            .icon-thumb_down
              color rgb(7,17,27) 
        .no-rating
          padding 16px 0
          font-size 12px
          color rgb(147,153,159)
          flex 1
          width 120px
  
</style>
