<!-- eslint-disable  -->
<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="24" :score="seller.score" class="star"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送费</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite">
          <span class="icon-favorite" :class="{'active':favorite}" @click="toggleFavorite"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告活动</h1>
        <div class="content-wrapper">
          <div class="content">{{seller.bulletin}}</div>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li v-for="(item, index) in seller.supports" :key="item.id" class="support-item border-1px">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pic">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li v-for="pic in seller.pics" :key="pic.id" class="pic-item">
              <img :src="pic" alt="" width="120px" height="90px">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable  -->
<style lang="stylus" rel="stylesheet/stylus">
// @import '../../common/stylus/index.styl' 
// @import '../../common/stylus/minin.styl'
  .seller 
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview 
      position relative
      padding 18px 
      .title 
        margin 8px 0 
        line-height 14px  
        color rgb(7,17,27)
        font-size 14px
        font-weight 700
      .desc
        padding-bottom 18px
        font-size: 0
        border-bottom 1px solid rgba(7,17,27,0.1)
        .star 
          display inline-block
          vertical-align top
          font-size 14px
        .text 
          display block
          vertical-align top
          line-height: 18px
          margin-right: 12px
          color: rgb(77, 85, 93)
          font-size: 10px
      .remark 
        display flex 
        text-align center 
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border: none
          h2
            margin-bottom: 4px
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .content
            line-height: 24px
            font-size: 10px
            color: rgb(7, 17, 27)
            .stress
              font-size: 24px 
      .favorite 
        position absolute
        width: 50px   //为了限制点击后心形的位置不变
        right: 11px   //因为宽度50,三个字36
        top 18px
        text-align center
        .icon-favorite
          display block
          margin-bottom 4px
          line-height 24px
          font-size 24px
          color #d4d6d9
          &.active 
            color rgb(240,20,20)
        .text 
          line-height 10px 
          font-size 10px
          color rgb(77,55,93)  
    .bulletin 
      padding 18px 6px 0 18px 
      .title 
        margin-bottom 8px 
        line-height 14px
        color rgb(7,17,27)
        font-size 14px 
        font-weight 700
      .content-wrapper 
        padding 0 12px 16px 12px 
        border-bottom 1px solid rgba(7,17,27,0.1)  
        .content 
          line-height 24px 
          font-size 12px 
          color rgb(240,20,20)
      .supports 
        .support-item
          padding 16px 12px 
          font-size 0px 
          border-bottom 1px solid rgba(7, 17, 27, 0.1)
          &:last-child 
            border none
          .icon
            display: inline-block
            vertical-align: top
            width: 16px
            height: 16px
            margin-right: 6px
            background-size: 16px
            background-repeat: no-repeat
          .decrease
            background-image url('decrease_4@2x.png')
          .discount 
            background-image url('discount_4@2x.png')
          .guarantee
            background-image url('guarantee_4@2x.png') 
          .invoice
            background-image url('invoice_4@2x.png') 
          .special
            background-image url('special_4@2x.png') 
          .text 
            line-height 12px
            font-size 12px 
            color rgb(7,17,27)  
    .pic
      padding 18px
      .title 
        margin-bottom 12px
        font-size 14px 
        line-height 14px
        color rgb(7,17,27)
      .pic-wrapper
        width 100%
        overflow hidden
        white-space nowrap // 超过部分不折行  
        .pic-list
          font-size 0
          .pic-item
            display inline-block //实现横向排列 仅此一行代码即可 
            margin-right 6px
            width 120px
            height 90px
            &:last-child
              margin-right none   
    .info 
      padding 18px 18px 0 18px
      .title 
        padding-bottom 12px
        font-size 14px 
        line-height 14px
        color rgb(7,17,27)
        border-bottom solid 1px rgba(7,17,27,0.1)
      .info-item
        padding 16px 12px
        line-height 16px 
        color rgb(7,17,27)
        font-size 12px 
        border-bottom solid 1px rgba(7,17,27,0.1)
        &:last-child
          border: none
</style>
<!-- eslint-disable  -->
<script>
import BSrcoll from 'better-scroll';
import star from '../../components/star/star.vue'
import split from '../../components/split/split.vue'
import {saveToLocal,loadFromLocal} from "../../common/js/store.js"
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      favorite: false
    }
    // return{
    //   favorite: function(){
    //     return loadFromLocal(this.seller.id, 'favorite', false)
    //   }
    // }
  },
  computed: {
    favoriteText() {
      return this.favorite? '收藏': '未收藏'
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
    //created 执行于实例创建完 而mounted 执行于dom加载  bscroll 要在dom刷新后初始化才能生效
    //seller是异步获取，最开始的seller中什么也没有 所以要用whtch监视dom变化
  watch: {
    // 'seller'() { // seller发生变化时执行此方法 顺序在mounted之后
    //   this._initScroll()
    //   this._initPic()
    // }
    'seller': function(){
        this._initScroll();
        this._initPic();
      }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll() // 执行初始化 顺序为 最先 此时seller没有东西 
      this._initPic()
    })
  },
  methods: {
    toggleFavorite(event) {
      if(!event._constructed){ // 去掉bscroll 中的点击事件
          return
      }
      this.favorite = !this.favorite
    },
    _initScroll() {
      this.$nextTick(() => {
        if(!this.scroll) {
          this.scroll = new BSrcoll(this.$refs.seller, {click: true}) // 初始化函数
        } else {
          this.scroll.refresh()
        }
      })
    },
    _initPic() {
      if (this.seller.pics) {        
        let picWidth = 120 // 一张图片宽度
        let margin = 6 // 图片 margin
        let ulWidth = (picWidth + margin) * this.seller.pics.length - margin 
        this.$refs.picList.style.width = ulWidth + "px" // 手动给子元素 ul加上宽度
        // 初始化
        this.$nextTick(() => {
          if(!this.Picscroll) {
            this.Picscroll = new BSrcoll(this.$refs.picWrapper, {
              scrollX: true, // 横向反动
              eventPassthrough: "vitical" // 同时可以竖向滚动
            })
          } else {
            this.Picscroll.refresh()
          }
        })
      }
    }
  },
  components: {
    star,
    split
  }
}
</script>