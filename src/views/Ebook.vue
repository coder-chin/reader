<template>
  <div class="ebook">
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
   
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click="prePage"></div>
        <div class="center" @click="tiggleShowTitleAndMenu"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>

    <transition name="slide-up">
      <div class="menu-wrapper"
        v-show="isTitleAndMenuShow">
        <div class="icon-wrapper">
          <span class="icon-menu icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-a icon">A</span>
        </div>
      </div>
    </transition>
    
  </div>
</template>

<script>
import Epub from 'epubjs'
const DOWNLOAD_URL = '/books/2018_Book_AgileProcessesInSoftwareEngine.epub'

export default {
  name: 'Ebook',
  data() {
    return {
      isTitleAndMenuShow: false
    }
  },
  methods: {
    createEpub() {
      // 生成book对象
      this.book = new Epub(DOWNLOAD_URL)
      // 通过Book.renderTo生成Rendition对象
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight,
        // 兼容IOS
        method: 'default',
        manager: "continuous",
        // 新路历程，一开始渲染不出来 搜索了老半天都说还需要jszip什么的，有些答案甚至完全不好普，
        //最后无意间添加了manager属性就可以了，还在迷惑中
      })
      // 通过 Rendtion.display渲染电子书
      this.rendition.display()
    },
    prePage() {
      if(this.rendition) {
        this.rendition.prev()
      }
    },
    nextPage() {
      if(this.rendition) {
        this.rendition.next()
      }
    },
    tiggleShowTitleAndMenu() {
      console.log(111);
      this.isTitleAndMenuShow = !this.isTitleAndMenuShow;
    }
  },
  mounted() {
    // 生成电子书对象
    this.createEpub()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/global.scss';
// 原来一直以为上面这行代码是多余的，main.js不是引用过了吗，原来下面要用到混入mixin -_-
.ebook {
  position: relative;
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
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
      display: flex;
      width: 100%;
      height: 100%;
      .left {
        flex: 0 0 2.666667rem;
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 2.666667rem;
      }
    }
  }
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.306667rem;
    display: flex;
    z-index: 100;
    background-color: #fff;
    box-shadow: 0 -.213333rem .213333rem rgba(0, 0, 0, .15);
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(28);
      }
      .icon-bright {
        font-size: px2rem(24);
      }
    }
  }
}
</style>