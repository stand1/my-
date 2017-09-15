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
                    <span class="icon"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
        </div>
        <div class="bulletin-wrapper"></div>
    </div>
</template>

<script>
  export default{
    props: {
      seller: {
        type: Object
      }
    }
  };
</script>

<style lang="stylus">
  .header
    color #ffffff
    background :#000000
    color :#ffffff
    .content-wrapper
      padding :24px 12px 18px 24px
      font-size :0px
      .avatar
       display :inline-block
      .content
       display :inline-block

</style>
