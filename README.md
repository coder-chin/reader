# redaer 阅读器

Vue.js + epub.js 实现简单的 epub 电子书阅读器

## sass-loader 相关

该项目需要安装 Sass

`npm install  sass-loader node-sass --save`

[SCSS和Sass](https://zhuanlan.zhihu.com/p/21319396)

这个帖子不错，通俗易懂。还特别说明了 SCSS 和 Sass 的写法。

简单来说是一种东西。Sass 是一种 CSS 预处理器，由Ruby程序员开发。因此带有很强的 Ruby 风味，有些语法甚至显得很奇怪。为了更加贴合CSS，发布了后来的 SCSS。在实际开发中，我们一般使用 SCSS。文件后缀自然写成.scss就OK啦！

本demo用到的基本 Sass 语法有:

```css
声明变量: 
$fontSize: 37.5;     //tips: 在CSS中用:root{} var(--xxx) 也可以声明变量

声明混入:
@mixin center() {
  display: flex;
  justify-content: center;
  align-items: center;
}

使用混入
@include center;
```

### 踩坑

Syntax Error: TypeError: this.getOptions is not a function
https://blog.csdn.net/qq_38157825/article/details/114318772

原因是 Sass-loader 版本太高，按照博客中的版本来安装就不会出错

## epubjs

epub 本质是就是类似于HTML语言的压缩包，与pdf格式不同，epub会自适应。

用命令解压epub可以得到具体的文件

![](https://gitee.com/bjfuchin/mypic/raw/master/pic/20211001165949.png)

渲染主题，定位，目录功能

不要用最新版本epubjs，否则问题真的很多
`npm install epubjs@0.3.71`

## 项目配置

![](https://gitee.com/bjfuchin/mypic/raw/master/pic/20211004193820.png)

在`vue.config.js`中配置别名即可

```js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views'
      }
    }
  }
}
```

## Others

### 适配移动端

```js
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
```

第一次在项目中用到 Sass，本来很抗拒的，其实也不难。

发现自己的 CSS 还是很薄弱

![](https://gitee.com/bjfuchin/mypic/raw/master/pic/20211004200034.png)

换肤

![](https://gitee.com/bjfuchin/mypic/raw/master/pic/20211004200053.png)

改变字号

![](https://gitee.com/bjfuchin/mypic/raw/master/pic/20211004200115.png)

改变进度

![](https://gitee.com/bjfuchin/mypic/raw/master/pic/20211004200127.png)

目录

![](https://gitee.com/bjfuchin/mypic/raw/master/pic/20211004202616.png)

## 鸣谢

本项目原创为慕课网Sam老师

https://github.com/sam9831/free-ebook-demo
