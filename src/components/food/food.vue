<template>
    <transition name="move">
        <div v-show="showFlay" class="food" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image" alt="">
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food="food"></cartcontrol>
                    </div>
                    <transition name="fade">
                        <div @click.stop="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
                    </transition>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split v-show="food.info"></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :rating="food.rating" @ratingtypeSelect="typechange" @contentToggle="toggle"></ratingselect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img :src="rating.avatar" alt="" width="12" height="12" class="avatar">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  import Vue from 'Vue';
  import BScroll from '../../../node_modules/better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import split from '../split/split.vue';
  import bus from '../../common/js/eventBus.js';
  import ratingselect from '../ratingselect/ratingselect.vue';
  import {formatDate} from '../../common/js/date.js';

  const ALL = 2;

  export default{
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlay: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      show () {
        this.showFlay = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {click: true});
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide () {
        this.showFlay = false;
      },
      addFirst () {
        if (!event._constructed) {
          return;
        }
        console.log(event.target);
        bus.$emit('cart.add', event.target);
        Vue.set(this.food, 'count', 1);
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      typechange (type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggle (onlyContent) {
        this.selectType = onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      formatDate (time) {
         let date = new Date(time);
         return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
//    events: {
//      'ratingtypeSelect' (type) {
//        this.selectType = type;
//        this.$nextTick(() => {
//            this.scroll.refresh();
//        });
//      },
//      'contentToggle' (onlyContent) {
//        this.selectType = onlyContent;
//      }
//    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  };
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl";
  .food
      position :fixed
      left :0
      top :0
      bottom:48px
      z-index :30
      width :100%
      background :#fff
      &.move-enter-active,&.move-leave-active
        transition:all 0.3s linear
      &.move-enter,&.move-leave-active
        transform: translate3d(100%,0,0)
      .image-header
        position :relative
        width :100%
        height :0
        padding-top :100%
        img
          position :absolute
          top :0
          left :0
          width :100%
          height :100%
        .back
          position :absolute
          top: 10px
          left :0
          .icon-arrow_lift
            display :block
            padding :10px
            font-size :20px
            color :#fff
      .content
        position :relative
        padding :18px
        .title
          line-height :14px
          margin-bottom :8px
          font-size :14px
          font-weight :700
          color :rgb(7,17,27)
        .detail
          margin-bottom :18px
          height :10px
          line-height :10px
          font-size :0
          .sell-count,.rating
            font-size :10px
            color :rgb(147,153,159)
          .sell-count
            margin-right :12px
        .price
          font-weight :700
          line-height :24px
          .now
            margin-right :8px
            font-size :14px
            color :rgb(240,20,20)
          .old
            text-decoration :line-through
            font-size :10px
            color :rgb(147,153,159)
        .cartcontrol-wrapper
          position :absolute
          right :12px
          bottom :12px
        .buy
          position :absolute
          right :18px
          bottom :18px
          z-index :10
          height :24px
          line-height :24px
          font-size :10px
          padding :0 12px
          box-sizing :border-box
          border-radius :12px
          color :#fff
          background :rgb(0,160,220)
          &.fade-enter-active,&.fade-leave-active
            transition:all 0.2s
            opacity:1
          &.fade-enter,&.fade-leave-active
            opacity:0
      .info
        padding :18px
        .title
          font-size :14px
          margin-bottom :6px
          line-height :14px
          color :rgb(7,17,27)
        .text
          font-size :12px
          line-height :24px
          padding :0 12px
          color :rgb(77,85,93)
      .rating
        padding-top :18px
        .title
          font-size :14px
          margin-left :6px
          line-height :14px
          color :rgb(7,17,27)
        .rating-wrapper
          padding :0 18px
          .rating-item
            position :relative
            padding :16px 0
            border-1px(rgba(7,17,27,0.1))
            .user
              position :absolute
              right :0
              top: 16px
              line-height :12px
              font-size :0
              .name
                font-size :10px
                display :inline-block
                vertical-align :top
                margin-right :6px
                color :rgb(147,153,159)
              .avatar
                border-radius :50%
            .time
              font-size :10px
              line-height :12px
              color :rgb(147,153,159)
              margin-bottom :6px
            .text
              line-height :16px
              font-size :12px
              color :rgb(7,17,27)
              .icon-thumb_up,.icon-thumb_down
                margin-right :4px
                line-height :12px
                font-size :12px
              .icon-thumb_up
                color :rgb(0,160,220)
              .icon-thumb_down
                color :rgb(147,153,159)
          .no-rating
            padding :16px 0
            font-size :12px
            color :rgb(147,153,159)
</style>
