<template>
   <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
           <span class="title">服务态度</span>
           <star :size="36" :score="seller.serviceScore"></star>
           <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
           <span class="title">商品评分</span>
           <star :size="36" :score="seller.foodScore"></star>
           <span class="score">{{seller.foodScore}}</span>
          </div>
         <div class="delivery-wrapper">
           <span class="title">送达时间</span>
           <span class="delivery">{{seller.deliveryTime}}分钟</span>
         </div>
        </div>
      </div>
      <split></split>
     <ratingselect :only-content="onlyContent" :select-type="selectType" :ratings="ratings" @contentToggle="toggle" @ratingType="typechange"></ratingselect>
     <div class="rating-wrapper">
       <ul>
         <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
           <div class="avatar">
             <img width="28" height="28" :src="rating.avatar" alt="">
           </div>
           <div class="content">
             <h1 class="name">{{rating.username}}</h1>
             <div class="star-wrapper">
              <star class="star" :size="24" :score="rating.score"></star>
              <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
             </div>
             <p class="text">{{rating.text}}</p>
             <div class="recommend" v-show="rating.recommend.length">
               <span class="icon-thumb_up"></span>
               <span v-for="item in rating.recommend" class="item">{{item}}</span>
             </div>
             <div class="time">{{rating.rateTime|formatDate}}</div>
           </div>
         </li>
       </ul>
     </div>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
   </div>
</template>

<script>
  import star from '../star/star.vue';
  import split from '../split/split.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';
  import {formatDate} from '../../common/js/date.js';
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';

  const ALL = 2;
  const ERR_OK = 0;
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      };
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    created () {
//      通过ajax请求到数据
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      });
    },
    methods: {
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
      toggle (msg) {
        this.onlyContent = msg;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    components: {
      star,
      split,
      ratingselect,
      shopcart
    }
  };
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings
     position :absolute
     top: 174px
     bottom :0
     left :0
     width :100%
     overflow :hidden
     .overview
       display :flex
       padding:18px 0
       .overview-left
         flex :0 0 137px
         width :137px
         padding :6px 0
         border-right :1px solid rgba(7,17,27,0.1)
         text-align :center
         @media only screen and (max-width :320px)
           flex :0 0 120px
           width :120px
         .score
           font-size :24px
           line-height :28px
           color :rgb(255,153,0)
           margin-bottom :6px
         .title
           margin-bottom :8px
           line-height :12px
           font-size :12px
           color :rgb(7,17,27)
         .rank
           line-height :10px
           font-size :10px
           color :rgb(147,153,159)
       .overview-right
         flex :1
         padding:6px 0 6px 24px
         @media only screen and (max-width :320px)
           padding-left :4px
         .score-wrapper
           margin-bottom :8px
           font-size :0
           .title
             line-height :18px
             display :inline-block
             font-size :12px
             color :rgb(7,17,27)
           .star
             display :inline-block
             margin :0 12px
             vertical-align :top
           .score
             line-height :18px
             display :inline-block
             font-size :12px
             color :rgb(255,153,0)
         .delivery-wrapper
           font-size :0
           .title
             line-height :18px
             display :inline-block
             font-size :12px
             color :rgb(7,17,27)
           .delivery
             font-size :12px
             color :rgb(147,153,159)
             line-height :18px
             margin-left :12px
     .rating-wrapper
       padding :0 18px
       .rating-item
         display :flex
         padding :18px 0
         border-1px(rgba(7,17,27,0.1))
         .avatar
          flex :0 0 28px
          margin-right :12px
          img
            border-radius :50%
         .content
           flex :1
           position :relative
           .name
             line-height :12px
             font-size :10px
             color :rgb(7,17,27)
             margin-bottom :4px
           .star-wrapper
             margin-bottom :6px
             font-size :0
             .star
               margin-right :6px
               display :inline-block
               vertical-align :top
             .delivery
               display :inline-block
               font-size :10px
               font-weight :200
               line-height :12px
               color :rgb(147,153,159)
           .text
             font-size :12px
             line-height :18px
             color :rgb(7,17,27)
             margin-bottom :8px
           .recommend
             font-size :0
             .icon-thumb_up
               display :inline-block
               font-size :9px
               line-height :16px
               color :rgb(0,160,220)
               margin-right :8px
               margin-bottom :4px
             .item
               display :inline-block
               padding :0 6px
               font-size :9px
               line-height :16px
               color :rgb(147,153,159)
               border :1px solid rgba(7,17,27,0.1)
               background :rgb(255,255,255)
               border-radius :2px
               margin-right :8px
               margin-bottom :4px
               &.last-child
                 margin-right :0px
           .time
             position :absolute
             right :0
             top :0
             font-size :10px
             font-weight :200
             line-height :12px
             color :rgb(147,153,159)
</style>
