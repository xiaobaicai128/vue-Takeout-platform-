<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :key="itemClass.id" :class="itemClass" class="item-class"></span>
  </div>
</template>
<script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OUT = 'out'
  export default {
    props: {
      size: {
        type: Number
        },
        score: {
          type: Number
        }
    },
    computed: {
      starType() {
        return 'star-' + this.size
      },
      itemClasses() {
        let result = []
        let score = Math.floor(this.score * 2) / 2 // 向下取 尾数为0 或者 5
        let hasDecimal = score % 1 !== 0 // 出现小数
        let integer = Math.floor(score) // 得到整数个星星
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (hasDecimal) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLS_OUT)
        }
        return result
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.star
  
  .item-class
    display inline-block
    background-repeat no-repeat 
  &.star-24
    .item-class
      display inline-block  
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on 
        background-image url('./star24_on@2x.png')
      &.half 
        background-image url('./star24_half@2x.png')
      &.out 
        background-image url('./star24_off@2x.png') 
  &.star-36
    .item-class
      display inline-block  
      width 15px
      height 15px
      margin-right 16px
      background-size 15px 15px
      &.last-child
        margin-right 0
      &.on 
        background-image url('./star36_on@2x.png')
      &.half 
        background-image url('./star36_half@2x.png')
      &.out 
        background-image url('./star36_off@2x.png')  
  &.star-48
    .item-class
      display inline-block 
      width 20px
      height 20px
      margin-right 20px
      background-size 20px 20px
      &.last-child
        margin-right 0
      &.on 
        background-image url('./star48_on@2x.png')
      &.half 
        background-image url('./star48_half@2x.png')
      &.out 
        background-image url('./star48_off@2x.png')   
</style>
