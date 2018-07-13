<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive" @click="select(2,$event)" :class="{'active':tempType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive" @click="select(0,$event)" :class="{'active':tempType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative" @click="select(1,$event)" :class="{'active':tempType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" @click="toogleContent" :class="{'active':tempOnlyContent}">
      <span class="icon-check_circle"></span>
      <span>只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2 
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        } 
      }
    },
    data() {
      return {
        tempType: 2,
        tempOnlyContent: false
      }
    },
    computed: {
      // 过滤出推荐和吐槽的评价
      // 这个组件中是为了要显示他们的数量
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        })
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        })
      }
    },
    // watch: {
    //   result(val) {
    //     this.reSelectType = val;//新增result的watch，监听变更并同步到myResult上
    //   }
    // },
    methods: {
      select(type, event) {
        this.tempType = type
        // this.$emit('changeData',type)
        this.$root.eventHub.$emit('changeData',type)
        // console.log(this.selectType)
      },
      toogleContent() {
        this.tempOnlyContent = !this.tempOnlyContent
        this.$root.eventHub.$emit('changeContent',this.tempOnlyContent)
      }
    }
  }
</script>
<style lang="stylus">
  .ratingselect
    .rating-type
      padding 18px 0
      margin 0 18px // 设置margin而不是padding原因：让下面的线段一样长
      border-bottom 1px solid rgba(7,17,27,0.1)
      font-sieze 0px
      .block 
        display inline-block
        padding 8px 12px
        border-radius 2px
        margin-right 8px
        line-height 16px
        font-size 12px
        font-weight 700
        color rgb(77,85,93)
        &.active
          color #fff
        .count 
          font-size 8px
          margin-left 2px 
        &.positive           
          background-color rgba(0,160,220,0.2)
          &.active 
            background-color rgb(0,160,220)
        &.negative 
          background-color rgba(77,85,93,0.2)
          &.active
            background-color rgb(77,85,93)
    .switch
      display inline-block
      padding  12px 18px
      line-height 24px
      border-bottom 1px solid rgba(7,17,27,0.1)
      color rgb(147,153,159)
      // font-size 0px
      .icon-check_circle
        display inline-block
        vertical-align middle
        margin-right 4px
        font-size 24px
      &.active
        color rgb(0,160,220) 
      .text 
        font-size 12px  
</style>
