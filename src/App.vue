<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="goods" active-class="active">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="ratings" active-class="active">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="seller" active-class="active">商家</router-link>
      </div>
    </div>
    <div class="content">
      我是content
    </div>
  </div>
</template>

<script>
    import header from '@/components/header/header.vue'
    export default {
      components: {
        'v-header': header
      }
    }
</script>

<style lang="stylus">
#app
  .tab
   display: flex
   width :100%
   height :40px
   line-height :40px
   text-align :center
   .tab-item
    flex :1
</style>
