<template>
  <div class="footer">
    <div class="footer-top"></div>
    <div class="footer-content" @click="toggleList">
      <div class="shopcar" :class="{'highlight': totalCount>0}">
      <span class="icon icon-shopping_cart" :class="{'highlight': totalCount>0}"></span>
      <div class="number" v-show="totalCount>0">{{totalCount}}</div>
      </div>
      <div class="sell-price" :class="{'highlight': totalPrice>0}">￥{{totalPrice}}元</div>
      <div class="line"></div>
      <div class="author-info">另需配送费￥{{seller.deliveryPrice}}元</div>
      <!-- 阻止冒泡，默认行为 -->
      <div class="real-price" :class="payClass" @click.stop.prevent="pay">{{payDesc}}</div> 
    </div>
    <div class="ball-container">
      <!-- <transition-group @befoer-enter="beforeEnter($el)" @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-for="(ball, index) in balls" :key="index" ball-show="ball.show" >
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>  -->
      <div v-for="ball in balls" :key="ball.id">
        <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div v-show="ball.show" class="ball">
            <div class="inner inner-hook">
            </div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="flod"> 
      <div class="shop-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>       
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods" :key="food.id">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>        
      </div>
    </transition>
    <!--背景模糊图-->
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hidelist"></div>
    </transition>
    <!-- 支付 -->
    <div class="pay-wrapper" v-show="payShow">
      <div class="pay-mask" >{{`支付${this.totalPrice}元`}}</div>
      <span @click.stop.prevent="cancel">取消</span>
      <span @click.stop.prevent="sure">确定</span>
    </div>
  </div>
</template>
<script>
  import cartcontrol from '../cartcontrol/cartcontrol.vue' 
  import BScroll from 'better-scroll'
  export default {
    props: {
      selectFoods: {
        type: Array
      },
      seller: {
        type: Object
      }
    },
    created() {  
      this.$root.eventHub.$on('cart.add', this.drop)
    },
      methods: {
        drop(el) {
          // console.log(el)
          for (let i = 0; i < this.balls.length; i++) { // 遍历小球 使小球显示出来 放到dropball数组中
            let ball = this.balls[i]
            if (!ball.show) {
              ball.show = true
              ball.el = el
              this.dropball.push(ball)
              return
            }
          }
        },
        beforeEnter(el) {
          // console.log(el)
          let count = this.balls.length
          while (count--) {
            let ball = this.balls[count]
           // 获得小球初始位置即 商品加号对应的坐标（相对于视口） 
            if (ball.show === true) {
  // 返回值类型：TextRectangle对象，每个矩形具有四个整数性质（ 上， 右 ， 下，和左 )表示的坐标的矩形，以像素为单位。
              let rect = ball.el.getBoundingClientRect()
              // 小球起始点x,y与终点(购物车)的差值
              let x = rect.left - 32
              let y = -(window.innerHeight - rect.top - 22)
              el.style.display = ''
              // 外层做一个纵向动画
              el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
              el.style.transform = `translate3d(0, ${y}px, 0)`
              // 内部元素做一个横向动画
              // 用class-hook 作为筛选器的通用标称
              let inner = el.getElementsByClassName('inner-hook')[0]
              inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
              inner.style.transform = `translate3d(${x}px, 0, 0)`
            }
          }
        },
        enter(el) {
          // console.log(el)
          // 重绘
          /* eslint-disable no-unused-vars */ 
           let rf = el.offsetHeight
           this.$nextTick(() => {
             el.style.display = ''
             // 外层元素做一个纵向的动画
             el.style.webkitTransform = 'translate3d(0, 0, 0)'
             el.style.transform = 'translate3d(0, 0, 0)'
             // 内部元素做一个横向动画
             let inner = el.getElementsByClassName('inner-hook')[0]
             inner.style.webkitTransform = 'translate3d(0, 0, 0)'
             inner.style.transform = 'translate3d(0, 0, 0)'
           })
        },
        afterEnter(el) {
          // 重置。小球又能重新用了  将前一步选中的小球放进dropball中 再拿出来 并隐藏
          let ball = this.dropball.shift()
          if (ball) {
            ball.show = false
            el.style.display = 'none'
          }
        },
        toggleList() {
          if (!this.totalCount) {
            return
          }
          this.flod = !this.flod // 取反
          // console.log(555)
        },
        empty() { // 清空
          this.selectFoods.forEach((food) => {
            food.count = 0
          })
        },
        pay() {
          if (this.totalPrice < this.seller.minPrice) {
            return
          } 
          this.payShow = true
        },
        hidelist() {
          this.flod = !this.flod
        },
        cancel() {
          this.payShow = false
        },
        sure() {
          window.alert('跳转到支付页面')
        }
      },
      data() {
        return {
          balls: [
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            }
          ],
          dropball: [],
          flod: true, // 折叠
          payShow: false
        }
      },
      selectFoods: {
        type: Array,
        dafault() { // data必须是一个函数,这是默认值data的写法
          return [{}]
        } 
      },
    computed: {
      totalPrice() { // 计算总价
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count // 这个count就是在goods组件里面添加的
        })
        return total
      },
      totalCount() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.count
        })
        return total // 计算购物车一共买了多少件商品
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.seller.minPrice}元起送`
        } else if (this.totalPrice < this.seller.minPrice) {
          let dif = this.seller.minPrice - this.totalPrice
          return `还差￥${dif}起送`
        } else {
          return `去结算`
        }
      },
      payClass() {
        if (this.totalPrice < this.seller.minPrice) {
          return 'not-enought'
        } else {
          return 'enought'
        }
      },
      listShow() {
        if (!this.totalCount) { // 当没有选商时候 
          this.flod = true
          return false
        }
        let show = !this.flod 
        if (show) {
          this.$nextTick(() => { // dom发生变化后会随之发生变化
            if (!this.scroll) { // 没有scroll时 new生成
              this.scroll = new BScroll(this.$refs.listContent, {click: true}) // 当列表被打开时候初始化better-scroll
            } else {
              this.scroll.refresh() // 有了的话就刷新
            }
          })
        }
        return show
      }

      // listShow() {
      //   get() {
      //     return this.fold
      //   },
      //   set() {
      //     if (!this.totalCount) {
      //       this.fold = true
      //       return false
      //     }
      //     let show = !this.fold
      //     return show
      //   }
      // }
    },
    components: {
      cartcontrol
    }
 }
</script>
<style lang="stylus">
.footer
  position: fixed
  left: 0
  bottom: 0
  z-index: 50
  width: 100%
  height: 48px
.footer-top
  background-color rgba(0,0,0,0)
  width 100%
  height 12px
  position fixed
  bottom 52px
.footer-content
  position fixed
  display flex
  margin-top 0
  bottom 0px
  width 100%
  height 52px
  background-color #141d27
  .shopcar
    display inline-block
    position relative
    width 44px
    height 44px
    background-color rgba(0,0,0,0.2)
    border-radius 50%
    margin-left 15px
    margin-bottom 8px
    top -5px
    border 6px solid #141d27
    &.highlight
      background-color rgb(0,160,220)
  .icon
      display inline-block
      position absolute 
      margin 10px 10px 
      line-height 24px
      font-size 24px
      color rgba(255,255,255,0.4)
      &.highlight
        color #fff
  .number
    position absolute
    right 0px
    top 0px
    width 24px
    height 16px
    border-radius 16px
    text-align center
    line-height 16px
    font-size 7px
    font-weight 700
    background-color red
    box-shadow  0 4px 8px 0 rgba(0,0,0,0.4)
    color #fff
  .sell-price
    font-size 16px
    font-weight 700
    color rgba(255,255,255,0.4)
    line-height 54px 
    &.highlight
      color #fff
  .line 
    border-left solid 1px rgba(255,255,255,0.1)
    height 28px
    margin 12px
  .author-info
    flex 1
    font-size 12px
    color rgba(255,255,255,0.4)
    line-height 56px 
    line-weight 700
  .real-price
    flex 0 0 105px
    position fixed
    right 0px
    height 100%
    width 100px
    background-color #2b333b
    color rgba(255,255,255,0.4)
    text-align center
    font-size 16px
    font-weight 700
    line-height 54px
    &.not-enought
      background-color #2b333b
    &.enought
      background-color #00b43c
      color #fff  
.ball-container
  .ball // 最终落点
    position fixed
    left 32px
    bottom 22px
    z-index 200
    transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.4)
    .inner
      width 16px
      height 16px
      border-radius 50%
      background rgb(0,160,220)
      transition all 0.4s linear
.shop-list
  position absolute
  width 100%
  top 0
  left 0
  z-index -1
  transform: translate3d(0, -100%, 0)  //相对于当前自身高度做偏移
  &.flod-enter-active, &.flod-leave-active
    transition: all 0.5s
  &.flod-enter, &.flod-leave-active
    opacity: 0
    transform: translate3d(0, 0, 0) 
  .list-header
    height 40px
    line-height 40px
    padding 0 18px
    z-index 300
    background-color #f3f5f7
    border-bottom 1px solid rgba(7,17,27,0.1)
    .title
      float left
      font-size 17px
      color rgb(7,17,27)
      width 239
    .empty 
      float right 
      font-size 12px
      color rgb(0,160,220) 
  .list-content
    padding 0 18px
    max-height 217px
    overflow hidden
    background-color #fff 
    .food 
      position relative
      padding 12px 0
      box-sizing border-box 
      .name
       font-size 16px
       font-weight 700
       line-height 24px
       color rgb(7,17,27)
      .price 
        position absolute
        right 90px
        bottom 12px
        line-height 24px
        font-size 14px
        font-weight 700 
        color rgb(240,22,22)
      .cartcontrol-wrapper
        position absolute
        right 0
        bottom 5px
.list-mask
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: -10
  background-color: rgba(7, 17, 27, 0.6)
  backdrop-filter: blur(10px)
  &.fade-enter-active, &.fade-leave-active
    transition: all 0.5s
  &.fade-enter, &.fade-leave-active
    opacity: 0
    background-color: rgba(7, 17, 27, 0) 
.pay-wrapper
  position absolute
  width 60%
  height 190%
  top -700%
  left 50%
  font-size 20px
  font-weight 700
  line-height 190%
  text-align center
  background-color #00a0dc
  border solid 1px #00a0dc
  border-radius 5%
  z-index 500
  transform translate(-50%, -50%)
  span  
    margin 0 20px 
    padding 5px
    background-color white 
    font-size 16px
    text-align center
    line-height 16px
    border-radius 5px             
</style>
