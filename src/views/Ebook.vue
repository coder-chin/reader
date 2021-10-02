<template>
  <div class="ebook">
    <title-bar 
    :isTitleAndMenuShow='isTitleAndMenuShow'></title-bar>

    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click="prePage"></div>
        <div class="center" @click="tiggleShowTitleAndMenu"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>

    <menu-bar 
    :isTitleAndMenuShow='isTitleAndMenuShow'
    :fontSizeList='fontSizeList'
    :defaultFontSize='defaultFontSize'
    @setFontSize='setFontSize'
    :themeList='themeList'
    :defaultTheme='defaultTheme'
    @setTheme='setTheme'
    :bookAvailable='bookAvailable'
    @onProgressChange="onProgressChange"
    @jumpTo='jumpTo'
    :navigation='navigation'
    ref="menubar">
    </menu-bar>
  </div>
</template>

<script>
import Epub from 'epubjs'
const DOWNLOAD_URL = '/books/2018_Book_AgileProcessesInSoftwareEngine.epub'

import TitleBar from 'components/TitleBar'
import MenuBar from 'components/MenuBar'

export default {
  name: 'Ebook',
  components: {
    TitleBar,
    MenuBar
  },
  data() {
    return {
      isTitleAndMenuShow: false,
      fontSizeList: [
        { fontSize: 12},
        { fontSize: 14},
        { fontSize: 16},
        { fontSize: 18},
        { fontSize: 20},
        { fontSize: 22},
        { fontSize: 24}
      ],
      defaultFontSize: 16,
      themeList: [
        {
          name: "default",
          style: {
            body: {
              'color': '#000', 'background':'#fff'
            }
          }
        },
        {
          name: "eye",
          style: {
            body: {
              'color': '#000', 'background':'#ceeaba'
            }
          }
        },
        {
          name: "night",
          style: {
            body: {
              'color': '#fff', 'background':'#000'
            }
          }
        },
        {
          name: "gold",
          style: {
            body: {
              'color': '#000', 'background':'rgb(241, 236, 226)'
            }
          }
        },
      ],
      defaultTheme: 0,
      bookAvailable: false,
      navigation: {},
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
        method: 'default'
        //注意epubjs版本，太重要了....
      })
      // 通过 Rendtion.display渲染电子书
      this.rendition.display()
      // 获取theme对象
      this.themes = this.rendition.themes
      //设置字体
      this.setFontSize(this.defaultFontSize)
      //this.themes.register(name, style)  注册主题
      //this.themes.select(name)     主题切换
      this.registerTheme()
      this.setTheme(this.defaultTheme)
      //获取locations对象
      //console.log(this.book.locations)
      this.book.ready.then(() => {
        this.navigation = this.book.navigation
        return this.book.locations.generate()
      }).then(result => {
        this.locations = this.book.locations
        // 标记电子书为解析完毕状态
        this.bookAvailable = true
        this.onProgressChange(0)
      })
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
      this.isTitleAndMenuShow = !this.isTitleAndMenuShow
      if(!this.isTitleAndMenuShow) {
        this.$refs.menubar.isSettingShow = false
      }
    },
    setFontSize(fontSize) {
      this.defaultFontSize = fontSize
      if(this.themes) {
        this.themes.fontSize(fontSize + 'px')
      }
    },
    registerTheme() {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style)
      })
    },
    setTheme(index) {
      this.defaultTheme = index
      this.themes.select(this.themeList[index].name)
    },
    // 进度条数值0-100
    onProgressChange(progress) {
      const percentage = progress / 100
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
      this.rendition.display(location)
    },
    // 跳转
    jumpTo(href) {
      this.rendition.display(href)
      this.hideTitleAndMenu()
    },
    hideTitleAndMenu() {
      this.isTitleAndMenuShow = false
      this.$refs.menubar.hideSetting()
      this.$refs.menubar.hideContent()
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
}
</style>