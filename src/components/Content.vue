<template>
  <transition name="slide-right">
    <div class="content">
      <div class="content-wrapper" v-if="bookAvailable">
        <div class="content-item" v-for="(item, index) in navigation.toc"
        :key="index"
        @click="jumpTo(item.href)">
          <span class="text">{{item.label}}</span>
        </div>
      </div>
      <div class="empty" v-else>加载中...</div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Content',
    props: {
      navigation: Object,
      bookAvailable: Boolean
    },
    methods: {
      jumpTo(href) {
        this.$emit('jumpTo', href)
      }
    }
  }
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 102;
  width: 80%;
  height: 100%;
  background-color: #fff;
  .content-wrapper {
    width: 100%;
    height: 100%;
    .content-item {
      padding: .533333rem .4rem;
      border-bottom: .026667rem solid #f4f4f4;
      .text {
        font-size: .373333rem;
        color: #333;
      }
    }
  }
}
</style>