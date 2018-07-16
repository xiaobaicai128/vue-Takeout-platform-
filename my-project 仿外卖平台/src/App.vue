<template>
  <div id="app">
    <div class="header">
      <v-header :seller="seller"></v-header>
    </div>
    <div class="tab border-1px">
      <div class="tab-item"><router-link to='/goods' tag='li'> 商品</router-link></div>
      <div class="tab-item"><router-link to='/ratings' tag='li' > 评论</router-link></div>
      <div class="tab-item"><router-link to='/sellers' tag='li' > 商家</router-link></div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view :seller="seller" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>  
    </div>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import {urlPrase} from './common/js/getUrl.js'
const ERR_OK = 0
   export default {
    data() {
      return {
        // seller: {
        //   id: (() => { // 立即执行函数得到seller的id
        //     let queryParam = urlPrase()
        //     return queryParam.id
        //   })()
        // }
        seller: {}
      }
    },
  created() {
    this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {  
      response = response.body
      if (response.errno === ERR_OK) {
        // 相当于在带有id的seller的基础上,又给seller添加了值
          // 如果直接给seller赋值为data的话，id就没有了
          // 现在selelr中已经有id了，是通过url获取到的
        // this.seller = response.data // 如果不需要id的话
        this.seller = Object.assign({}, this.seller, response.data)
      }
    })
  },
  components: {
    'v-header': header
  }
  
}
</script>

<!--  eslint-disable  -->
<style lang='stylus', rel='sheetstyle/stylus' >
@import './common/stylus/mixin.styl'
.tab
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom:1px solid rgba(7,17,27,0.1)
  border-1px(red) 
  .tab-item
    flex: 1;
    text-align: center;
    & > li
      cursor:pointer;
      display:black;
      color: rgb(77,85,93)
    & > .router-link-active 
      color:red
      
</style>
