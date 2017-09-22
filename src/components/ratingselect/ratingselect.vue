<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
    </div>
    <div class="switch" :class="{'on':onlyContent}" @click="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
    export default{
      props: {
        ratings: {
          type: Array,
          default () {
            return [];
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
          default () {
            return {
              all: '全部',
              positive: '满意',
              negative: '不满意'
            };
          }
        }
      },
      data () {
        return {};
      },
      computed: {
        positives () {
          return this.ratings.filter((rating) => {
            return rating.rateType === POSITIVE;
          });
        },
        negative () {
          return this.ratings.filter((rating) => {
            return rating.rateType === NEGATIVE;
          });
        }
      },
      methods: {
        select (type, event) {
          if (!event._constructed) { return; }
          this.$emit('ratingType', type);
        },
        toggleContent (event) {
          if (!event._constructed) { return; }
          this.$emit('contentToggle', !this.onlyContent);
        }
      }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
 .ratingselect
  .rating-type
    padding:18px 0
    margin:0 18px
    border-1px(rgba(7,17,27,0.1))
    font-size:0
    .block
      display:inline-block
      padding:8px 12px
      font-size:12px
      margin-right:8px
      border-radius: 1px
      color:rgb(77,85,93)
      line-height:16px
      &.active
        color:#fff
      .count
        font-size:8px
        margin-left:2px
      &.positive
        background:rgba(0,160,220,0.2)
        &.active
         background:rgb(0,160,220)
      &.negative
        background:rgba(77,85,93,0.2)
        &.active
         background:rgb(77,85,93)
  .switch
      padding:12px 8px
      line-height:24px
      border-bottom: 1px solid rgba(7,17,27,0.1)
      color:rgb(147,153,159)
      font-size:0
      .icon-check_circle
        display:inline-block
        font-size:24px
        margin-right:4px
        vertical-align: top
      .text
        display:inline-block
        vertical-align: top
        font-size:12px
      &.on
       .icon-check_circle
        color:#00c850
</style>
