<template>
 <transition name="move">
   <div class="food" v-show="showFlag" ref="food">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
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
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <transition name="fade">
          <div @click.stop="addFirst(food,$event)" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
        </transition>
      </div>
      <splic v-show="food.info"></splic>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <splic v-show="food.info"></splic>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect :only-content="onlyContent" :select-type="selectType" :desc="desc" :ratings="food.ratings" @contentToggle="toggle" @ratingType="typechange"></ratingselect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.lengtg!=0">
            <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img class="avatar" :src="rating.avatar" width="12" height="12">
              </div>
              <div class="time">{{rating.rateTime|formatDate}}</div>
              <p class="text">
                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                {{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.lengtg">暂无评价</div>
        </div>
      </div>
    </div>
   </div>
 </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
  import {formatDate} from '../../common/js/date.js';
  import splic from '../../components/split/split.vue';
  import ratingselect from '../../components/ratingselect/ratingselect.vue';

//    const POSITIVE = 0
//   const NEGATIVE = 1
  const ALL = 2;
    export default{
      props: {
        food: {
          type: Object
        }
      },
      created () {
      },
      data () {
        return {
          showFlag: false,
          selectType: ALL,
          onlyContent: true,
          desc: {
            all: '全部',
            positive: '推荐',
            negative: '吐槽'
          }
        };
      },
      components: {
        cartcontrol,
        splic,
        ratingselect
      },
      filters: {
        formatDate (time) {
          let date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      },
      methods: {
        show () {
          this.showFlag = true;
          this.selectType = ALL;
          this.onlyContent = true;
          this.$nextTick(() => {
           if (!this.scroll) {
             console.log(this.food.ratings);
             this.scroll = new BScroll(this.$refs.food, {
               click: true
             });
           } else {
             this.scroll.refresh();
           }
          });
        },
        typechange (type) {
          this.selectType = type;
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        },
        toggle (msg) {
          this.onlyContent = msg;
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        },
        addFirst () {
          if (!event._constructed) { return; }
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
        hide () {
          this.showFlag = false;
        }
      }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .food
    position:fixed
    top:0
    left:0
    bottom:48px
    z-index:30
    width:100%
    background:#fff
    &.move-enter-active,&.move-leave-active
      transition:all 0.3s linear
    &.move-enter,&.move-leave-active
      transform: translate3d(100%,0,0)
    .image-header
      position:relative
      width:100%
      height:0
      padding-top:100%
      img
        position: absolute
        top:0
        left:0
        width:100%
        height:100%
      .back
        position:absolute
        top:10px
        left:0
        .icon-arrow_lift
          display:block
          padding:10px
          font-size:20px
          color:#fff
    .content
      position:relative
      padding:18px
      .title
        line-height:14px
        margin-bottom:8px
        font-size:14px
        font-weight:700
        color:rgb(7,17,27)
      .detail
        margin-bottom:18px
        line-height:10px
        font-size:0
        height:10px
        .sell-count,.rating
          font-size:10px
          color:rgb(147,153,159)
        .sell-count
          margin-right:12px
      .price
        font-weight:700
        line-height:24px
        .now
          margin-right:8px
          font-size:14px
          color:rgb(240,20,20)
        .old
          text-decoration:line-through
          font-size:10px
      .cartcontrol-wrapper
        position:absolute
        right: 12px
        bottom: 12px
      .buy
          position:absolute
          right:18px
          bottom:18px
          z-index:10
          height:24px
          line-height:24px
          padding:0 12px
          font-size:10px
          border-radius:12px
          box-sizing: border-box
          color:#fff
          background:rgb(0,160,220)
          &.fade-enter-active,&.fade-leave-active
            transition:all 0.2s
          opacity:1
          &.fade-enter,&.fade-leave-active
            opacity:0
    .info
      padding:18px
      .title
        line-height:14px
        margin-bottom:6px
        font-size:14px
        color:rgb(7,17,27)
      .text
        line-height:24px
        padding:0 8px
        font-size:12px
        color:rgb(77,85,93)
    .rating
      padding-top:18px
      .title
        line-height:14px
        margin-left:18  px
        font-size:14px
        color:rgb(7,17,27)
      .rating-wrapper
        padding:0 18px
        .rating-item
          position:relative
          padding:16px 0
          border-1px(rgba(7,17,27,0.1))
          .user
            position:absolute
            right:0
            top:16px
            font-size:0
            line-height:12px
            .name
              display:inline-block
              margin-right:6px
              vertcal-align:top
              font-size:10px
              color:rgb(147,153,159)
            .avatar
              border-radius:50%
          .time
            margin-bottom:6px
            font-size:10px
            color:rgb(147,153,159)
            line-height:12px
          .text
            line-height:16px
            font-size:12px
            color:rgb(7,17,27)
            .icon-thumb_up,.icon-thumb_down
              line-height:16px
              margin-right:4px
              font-size:12px
            .icon-thumb_up
              color:rgb(0,160,220)
            .icon-thumb_down
              color:rgb(147,153,159)
        .no-rating
          padding:16px 0
          font-size:12px
          color:rgb(147,153,159)
</style>
