<template>
  <div class="goods">
    <div class="menu-wrapper"></div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script>
  const ERR_OK = 0;
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: []
      };
    },
    created () {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          console.log(this.goods);
        }
      });
    }
  };
</script>

<style lang="stylus">
   .goods
     display :flex
     position :absolute
     top: 174px
     bottom:46px
     width :100%
     overflow :hidden
     .menu-wrapper
       flex:0 0 80px
       width :80px
       background :#f3f5f7
     .foods-wrapper
       flex :1
</style>
