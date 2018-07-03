<template>
  <div id="app">
    <div class="header">
      <v-header :seller="seller"></v-header>
    </div>
    <div class="tab border-1px">
      <div class="tab-item"><router-link to='/goods' tag='li' > 商品</router-link></div>
      <div class="tab-item"><router-link to='/ratings' tag='li' > 评论</router-link></div>
      <div class="tab-item"><router-link to='/sellers' tag='li' > 商家</router-link></div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import header from './components/header/header.vue'

const ERR_OK = 0
   export default {
    data() {
      return {
        seller: {
        }
      }
    },
  created() {
    this.$http.get('/api/seller').then((response) => {  
      response = response.body
      if (response.errno === ERR_OK) {
        this.seller = response.data
        console.log(this.seller)  
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
