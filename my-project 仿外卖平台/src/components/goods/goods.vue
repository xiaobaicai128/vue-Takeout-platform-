 <!-- eslint-disable  -->
<template>
<div>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="item.id" class="menu-item"  :class="{'current':currentIndex === index}"
            @click="selectMenu(index,$event)">
            <span class="text"><span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" :key="item.id" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul> 
            <li @touchstart="startSelectFood(food,$event)" @touchend.stop.prevent="stopSelectFood(food,$event)" v-for="food in item.foods" :key="food.id" class="food-item border-1px()">
              <div class="icon">
                <img :src="food.icon" width="57px" height="57px">
              </div>
              <div class="content">
                <h1 class="name">{{food.name}}</h1>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="sellCount">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" ></cartcontrol>  
                  </div>
                </div>
                <div class="price">
                  <span>￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                </div>
                
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <shopcar :seller="seller" :selectFoods="selectFoods"></shopcar>
  
  <!-- <div class="footer ">
    <div class="footer-top"></div>
    <div class="footer-content">
      <div class="shopcar">
      <span class="icon icon-shopping_cart"></span>
      </div>
      <div class="sell-price">￥{{}}元</div>
      <div class="line"></div>
      <div class="author-info">另需配送费￥{{seller.deliveryPrice}}元</div>
      <div class="real-price">￥{{seller.minPrice}}起送</div>
    </div>
  </div> -->
  <food :food="selectedFood" ref="food"></food>  
</div>
</template>
<!-- eslint-disable  -->
<style lang="stylus">
.goods
  display flex
  position absolute
  top 174px
  bottom 64px
  width 100%
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background-color #f3f5f7
    .menu-item
      display table 
      height 54px
      width 56px
      line-height 14px
      margin-right 12px 
      margin-left 12px
      font-size 14px
      .icon
        display inline-block
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        vertical-align top 
        background-repeat no-repeat
        &.decrease
          background-image url('decrease_3@2x.png')
        &.discount 
          background-image url('discount_3@2x.png')
        &.guarantee
          background-image url('guarantee_3@2x.png') 
        &.invoice
          background-image url('invoice_3@2x.png') 
        &.special
          background-image url('special_3@2x.png')
      .text 
        display table-cell
        vertical-align middle
        width 56px

  .foods-wrapper
    flex 1
  .title 
    height 26px
    line-height 26px
    padding-left 14px
    border-left 2px solid #d9dde1
    font-size 12px
    color rgb(147,153,149)
    background-color #f3f5f7 
  .food-item
    display flex
    margin 18px
    border-bottom 1px solid rgba(7,17,27,0.1)
    padding-bottom 18px
    // border-1px(rgba(7,17,27,0.1))
    &:last-child
      border-bottom 0px solid white
      margin-bottom 0
    .icon 
      flex 0 0 57px
      margin-right 10px
    .content 
      flex 1
      font-weight 700
      .name
        margin 2px 0 8px 10px 
        color rgb(7,17,27)
        font-size 14px
        font-weight 700
        line-height 14px
      .desc 
        margin-left 10px
        color rgb(147,153,159)
        font-size 10px
        line-height 10px
      .extra 
        margin 8px 0 8px 10px
        color rgb(147,153,159)
        font-size 10px
        line-height 10px
        .sellCount
          margin-right 12px
        .cartcontrol-wrapper
          position absolute
          right 0px
      .price
        margin 0px 8px 18px 10px
        font-size 14px
        line-height 24px
        font-weight 700
        color red
      .oldPrice
        font-size 10px
        line-height 24px
        font-weight 700
        color rgb(147,153,159)
        text-decoration line-through
      
                    
</style>
<!-- eslint-disable  -->
<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import shopcar from '../shopcar/shopcar.vue'
  import cartcontrol from '../cartcontrol/cartcontrol.vue' 
  import Vue from 'vue'
  import food from '../food/food.vue'
const ERR_OK = 0
export default {
  data() {
    return {
      goods : [],
      slectFoods: {},
      selectedFood: {},
      listHeight: [], //用来储存foods区域的各个区块的高度(clientHeight)
      scrollY: 0,//用来存储foods区域的滚动的Y坐标
      seller: {},
      // totalPrice: Number
      bus: new Vue()
      }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
    this.$http.get('/api/goods').then((response) => {
      response = response.body
      if(response.errno === ERR_OK) {
        this.goods = response.data
        // console.log(this.goods)
        this.$nextTick(() => {
          this._initSCroll()
        })
      }
    }),
    this.$nextTick(() => {
           //调用scroll函数，实现滚动
          this._initSCroll();//绑定滚动dom
          this._calculateHeight(); //计算foods区域的各个区域的高度
        })
    this.$http.get('/api/seller').then((response) => {
        response = response.body
        if(response.errno === ERR_OK) {
            this.seller = response.data
            // console.log(this.seller)
        }
    })
  },
  methods: {
    _initSCroll() {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, { click: true}) //阻止默认，允许点击
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, { click: true, tap: true, probeType: 3}) //BScroll滚动时，能实时告诉我们滚动的位置，类似探针的效果
      //foodsScroll监听事件,在scroll滚动时能见位置实时暴露出来
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y)); //取正值
      })
    },
    startSelectFood (food,$event) {
      this.startY = $event.touches[0].pageY
    },
    stopSelectFood (food,$event) {
      const moving = Math.abs($event.changedTouches[0].pageY - this.startY)
      if (moving > 20) return
      this.startY = 0
      console.log('click')
      this.selectedFood = food; //写入当前选择的food
      this.$refs.food.show(); //显示当前选择的food的详情页调用food。vue子组件的方法            
    },
    // selectFood(food, event){
    //   if (!event._constructed) {//忽略掉BScroll的事件
    //     return
    //   }
    //     this.selectedFood = food; //写入当前选择的food
    //     this.$refs.food.show(); //显示当前选择的food的详情页 调用food。vue子组件的方法
    // },
    selectMenu(index, event){
        if (!event._constructed) { //忽略掉BScroll的事件
          return
        }
        let foodsList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodsList[index];
        //类似jump to的功能,通过这个方法,跳转到指定的dom
        this.foodsScroll.scrollToElement(el, 300);
    },
    //计算foods内部块的高度
    _calculateHeight(){
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook'); //获取每一个food的dom对象
      let height = 0;
      this.listHeight.push(height); //初始化第一个高度为0
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]; //每一个item都是刚才获取的food的每一个dom
        height += item.clientHeight; //主要是为了获取每一个foods内部块的高度
        this.listHeight.push(height);
      }
    }
  },
  computed: {
    currentIndex(){ //计算到达哪个区域的区间的时候的对应的索引值
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]; //当前menu子块的高度
        let height2 = this.listHeight[i + 1]; //下一个menu子块的高度
          //滚动到底部的时候,height2为undefined,需要考虑这种情况
          //需要确定是在两个menu子块的高度区间
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i; //返回这个menu子块的索引
        }
      }
      return 0;
    },
    selectFoods() { //cartcontrol组件将选中的goods.food添加一个count属性,方便做数量运算
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
    
    components: {
        shopcar,
        cartcontrol,
        food
    }
  
}
</script>