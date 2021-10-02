<template>
  <transition name="slide-down">
      <div class="title-wrapper"
      v-show="isTitleAndMenuShow">
        <div class="left">
          <span class="icon-back icon"></span>
        </div>
        <div class="right">
          <div class="icon-wrapper">
            <span class="icon-cart icon"></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-person icon"></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-more icon"></span>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
  export default {
    name: 'TitleBar',
    props: {
      isTitleAndMenuShow: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../assets/styles/global.scss';
.title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.306667rem;
    display: flex;
    z-index: 100;
    background-color: #fff;
    box-shadow: 0 .213333rem .213333rem rgba(0, 0, 0, .15);
    .left {
      width: 1.6rem;
      @include center;
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .icon-wrapper {
        width: 1.066667rem;
        @include center;
      }
    }
  }
</style>