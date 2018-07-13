<template>
  <div class="ratings">
		<div class="rating-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <dvi class="rank">高于周边商家{{seller.rankRate}}</dvi>
        </div>
        <div class="overview-right"></div>
      </div>  
    </div>
  </div>
</template>

<style lang="stylus">
  .ratings
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      display flex 
      padding 18px 0
      .overview-left
        flex 0 0 137px
        width 137px
        border-right solid 1px rgba(7,17,27,0.1)
        text-align center
      .overview-right
        flex 1
        padding-left 24px 
</style>

<script>
  import VueRouter from 'vue-router'
export default {
  props: {
    seller: {
      type: Object
    }
  },

}
</script>
