<template>
   <div class="cartcontrol">
       <transition name="move">
       <div class="cart-decrease" v-show="food.count>0" @click.stop="removeCart" transition="move">
           <span class="inner icon-remove_circle_outline"></span>
       </div>
       </transition>
       <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
       <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
   </div>
</template>

<script>
  import Vue from 'vue';
  import bus from '../../common/js/eventBus.js';
  export default{
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        bus.$emit('cart.add', event.target);
      },
      removeCart (event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus">
  .cartcontrol
    font-size :0
    .cart-decrease
      display :inline-block
      padding :6px
      transition :all 0.4s linear
      &.move-transition-active
        opacity :1
        transform :tanslate3D(0,0,0)
      .inner
        display :inline-block
        font-size :24px
        line-height :24px
        color :rgb(0, 160, 220)
        transition :all 0.4s liner
        transform :rotate(0)
      &.move-enter-active, &.move-leave-active
        opacity :0
        transform :tanslate3D(24px, 0, 0)
        .inner
          transform :rotate(180deg)
    .cart-count
      display :inline-block
      vertical-align :top
      width :12px
      padding-top :6px
      line-height :24px
      text-align :center
      font-size :10px
      color :rgb(147,153,159)
    .cart-add
      display :inline-block
      padding :6px
      font-size :24px
      line-height :24px
      color :rgb(0, 160, 220)
</style>
