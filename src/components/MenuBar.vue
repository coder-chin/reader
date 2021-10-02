<template>
  <div>
    <transition name="slide-up">
      <div class="menu-wrapper"
        v-show="isTitleAndMenuShow"
        :class="{'hide-box-shadow': isSettingShow || !isTitleAndMenuShow}">
        <div class="icon-wrapper">
          <span class="icon-menu icon" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress icon" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright icon" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-a icon" @click="showSetting(0)">A</span>
        </div>
      </div>
    </transition>

    <transition name="slide-up">
      <div class="setting-wrapper"
      v-show="isSettingShow">
        <div class="setting-font-size" v-if="showTag==0">
          <div class="preview" :style="{fontSize: fontSizeList[0].fontSize+'px'}">A</div>
          <div class="select">
            <div class="select-wrapper" 
            v-for="(item, index) in fontSizeList" 
            :key="index"
            @click="setFontSize(item.fontSize)">
              <div class="line"></div>
              <div class="point-wrapper">
                <div class="point"
                v-show="defaultFontSize==item.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length-1].fontSize+'px'}">A</div>          
        </div>
        <div class="setting-theme" v-else-if="showTag==1">
          <div class="setting-theme-item" v-for="(item, index) of themeList" 
          :key="index"
          @click="setTheme(index)">
            <div class="preview" :style="{background: item.style.body.background}" 
            :class="{'no-border': item.style.body.background!=='#fff'}"></div>
            <div class="text" :class="{'selected': defaultTheme==index}">{{item.name}}</div>
          </div>
        </div>
        <div class="setting-progress" v-else-if="showTag==2">
          <div class="progress-wrapper">
            <input type="range" class="progress"
                  max="100"
                  min="0"
                  step="1"
                  @change="onProgressChange($event.target.value)"
                  @input="onProgressInput($event.target.value)"
                  :value="progress"
                  :disabled="!bookAvailable"
                  ref="progress"
            >
            <!-- input拖动的时候-百分比变化 -->
            <!-- change-松手的时候 -->
          </div>
          <div class="text-wrapper">
            <span>{{bookAvailable ? progress + '%' : '加载中...'}}</span>
          </div>
        </div>
      </div>
    </transition>

    <content-view
      :navigation='navigation'
      :bookAvailable='bookAvailable'
      v-show='showContent'
      @jumpTo='jumpTo'
      >
    </content-view>

    <transition name="fade">
      <div class="content-mask"
      v-show="showContent"
      @click="hideContent"></div>
    </transition>
  </div>
  
</template>

<script>
import ContentView from './Content'
  export default {
    name: 'MenuBar',
    components: {
      ContentView
    },

    props: {
      isTitleAndMenuShow: {
        type: Boolean,
        default: false
      },
      fontSizeList: Array,
      defaultFontSize: Number,
      themeList: Array,
      defaultTheme: Number,
      bookAvailable: Boolean,
      navigation: Object
    },

    data() {
      return {
        isSettingShow: false,
        showTag: 0,
        progress: 0,
        showContent: false
      }
    },

    methods: {
      showSetting(tag) {
        this.showTag = tag
        // 等于3要唤起目录面板
        if(tag==3)
        {
          this.isSettingShow = false
          this.showContent = true
        } else {
          this.isSettingShow = true
        }
      },
      setFontSize(fontSize) {
        this.$emit('setFontSize', fontSize)
      },
      setTheme(index) {
        this.$emit('setTheme', index)
      },
      // 拖动进度条时触发事件
      onProgressInput(progress) {
        this.progress = progress
        this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
      },
      // 进度条松开后触发事件，根据进度条数值跳转到指定位置
      onProgressChange(progress) {
        this.$emit('onProgressChange', progress)
      },
      jumpTo(href) {
        this.$emit('jumpTo', href)
      },
      hideSetting() {
        this.isSettingShow = false
      },
      hideContent() {
        this.showContent = false
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../assets/styles/global.scss';
.menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.28rem;
    display: flex;
    z-index: 102;
    background-color: #fff;
    box-shadow: 0 -.213333rem .213333rem rgba(0, 0, 0, .15);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: .746667rem;
      }
      .icon-bright {
        font-size: .64rem;
      }
    }
  }

.setting-wrapper {
  position: absolute;
  bottom: 1.28rem;
  left: 0;
  width: 100%;
  height: 1.6rem;
  background-color: #fff;
  box-shadow: 0 -0.213333rem .213333rem rgba(0, 0, 0, .15);
  z-index: 101;
  .setting-font-size {
    display: flex;
    height: 100%;
    .preview {
      width: px2rem(40);
      @include center;
    }
    .select {

      flex: 1;
      display: flex;
      .select-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        // 下面选择器的意思是: 其父元素的子元素的第一个select-wrapper元素
        &:first-child {
          .line {
            &:first-child {
              border-top: none;
            }
          }
        }
        &:last-child {
          .line {
            &:last-child {
              border-top: none;
            }
          }
        }
        .line {
          flex: 1;
          height: 0;
          border-top: px2rem(1) solid #ccc;
        }
        .point-wrapper {
          position: relative;
          flex: 0 0 0;
          width: 0;
          height: .186667rem;
          border-left: .026667rem solid #ccc;
          .point {
            position: absolute;
            top: -0.213333rem;
            left: -0.266667rem;
            width: .533333rem;
            height: .533333rem;
            border-radius: 50%;
            background-color: #fff;
            border: .026667rem solid #ccc;
            box-shadow: 0 .106667rem .106667rem rgba(0, 0, 0, .15);
            @include center;
            .small-point {
              width: .133333rem;
              height: .133333rem;
              background-color: #000;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: .133333rem;
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: 1px solid #ccc;
        box-sizing: border-box;  //宽度只包含width
        &.no-border {
          border: none;
        }
      }
      .text {
        flex: 0 0 .8rem;
        font-size: .373333rem;
        color: #ccc;
        @include center;
        &.selected {
          color: #333;
        }
      }
    }
  }
  .setting-progress {
    position: relative;
    width: 100%;
    height: 100%;
    .progress-wrapper {
      width: 100%;
      height: 100%;
      @include center;
      padding: 0 px2rem(30);
      box-sizing: border-box;
      .progress {
        width: 100%;
        -webkit-appearance: none;
        // 覆盖默认样式
        height: px2rem(2);
        // 实现颜色不一样
        background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
        background-size: 0 100%;
        &:focus {
          outline: none;
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: px2rem(20);
          width: px2rem(20);
          border-radius: 50%;
          background: white;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
          border: px2rem(1) solid #ddd;
        }
      }
    }
    .text-wrapper {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      color: #333;
      font-size: px2rem(12);
      text-align: center;
    }
  }
}

.content-mask {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 101;
  display: flex;
  width: 100%;
  height: 100%;
  background: rgba(51, 51, 51, .8);
}
</style>