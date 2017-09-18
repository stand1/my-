<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-content" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%" alt="">
        </div>
        <div v-show="detailShow" class="detail">a
            <div class="detail-wapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <star :size="36" :score="2.5"></star>
                </div>
            </div>
            <div class="detail-close" @cilck="hldeDetail">
                <i class="icon-close"></i>
            </div>
        </div>
    </div>
</template>

<script>
  import star from '../star/star.vue';
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail () {
        this.detailShow = true;
      },
      hldeDetail () {
        this.detailShow = false;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    components: {
      'star': star
    }
  };
</script>

<style lang="stylus">
    @import "../../common/stylus/mixin.styl";
  .header
    color: #fff
    position :relative
    background-color :rgba(7,17,27,0.5)
    overflow :hidden
    .content-wrapper
      position :relative
      padding :24px 12px 18px 24px
      font-size :0
      .avatar
        display :inline-block
        vertical-align :top
        img
          border-radius :2px
      .content
        display :inline-block
        font-size :14px
        margin-left :16px
        .title
          margin :2px 0 8px 0
          .brand
            display :inline-block
            width :30px
            height :18px
            bg-image('brand')
            background-size :30px 18px
            background-repeat :no-repeat
            margin-right :6px
            vertical-align :top
          .name
            font-size :16px
            color :rgb(255,255,255)
            font-weight :bold
            line-height :18px
         .description
           margin :8px 0 10px
           font-size :12px
           font-weight :200
           color :rgb(255,255,255)
           line-height :12px
         .support
           margin-bottom: 2px
           vertical-align :middle
           .icon
             display :inline-block
             width :12px
             height :12px
             background-size :12px 12px
             background-repeat :no-repeat
             &.decrease
               bg-image('decrease_1')
             &.discount
               bg-image('discount_1')
             &.guarantee
               bg-image('guarantee_1')
             &.invoice
               bg-image('invoice_1')
             &.special
               bg-image('special_1')
             margin-right :4px
             vertical-align :middle
           .text
             font-size :10px
             font-weight :200
             color :rgb(255,255,255)
             line-height :12px
      .support-content
        position :absolute
        right :12px
        bottom :14px
        padding:0 8px;
        height :24px
        line-height :24px
        border-radius :14px
        background-color :rgba(0,0,0,0.2)
        text-align :center
        .count
          margin-right:2px
          font-size :10px
          font-weight :200
          vertical-align :top
        .icon-keyboard_arrow_right
          line-height :24px
          font-size :10px
    .bulletin-wrapper
      height :28px
      line-height :28px
      background-color :rgba(7,17,27,0.2)
      padding :0 22px 0 12px
      white-space :nowrap
      overflow :hidden
      text-overflow :ellipsis
      position :relative
      .bulletin-title
        display :inline-block
        width :22px
        height :12px
        bg-image('bulletin')
        background-size:22px 12px
        background-repeat :no-repeat
        vertical-align :top
        margin-top:8px
      .bulletin-text
        vertical-align :top
        font-size :10px
        line-height :28px
        margin 0 4px
      .icon-keyboard_arrow_right
        position :absolute
        right 12px
        font-size :10px
        line-height :28px

    .background
      position :absolute
      top:0
      left :0
      width :100%
      height :100%
      z-index :-1
      filter :blur(10px)
    .detail
      position :fixed
      top:0
      left :0
      z-index :100
      width :100%
      height :100%
      overflow :auto
      background-color :rgba(7,17,27,0.8)
      .detail-wapper
        min-height :100%
        width :100%
        .detail-main
          margin-top 64px
          padding-bottom :64px
          .name
            font-size :18px
            font-weight :700
            line-height :18px
            text-align :center
      .detail-close
        position :relative
        width :32px
        height :32px
        margin :-64px auto 0
        clear :both
        font-size :32px
</style>
