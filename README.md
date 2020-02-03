# vue-flip-page
vue翻页组件

方法
change （改变页面）
tap  （点击）
turning  （正在翻页）
prev  （前一页）
next   （后一页）
翻到指定页面：

handleSwitchManual(index) {
      if (index === this.currentIndex) return;
      this.$refs["turn"].toPage(index);
      this.currentIndex = index;
      this.goods_id = this.manuals[this.currentIndex].goods_id;
      this.show = false;
    },

传入参数：

| 参数  | type |  example | describe   |
| ------ | ---- | -------- | ---------- |
| width  | number | 375 | 宽度 |
| height | number | 667  | 高度   |
| data | Array | [ { "picture_image": "https://dev8.yunzmall.com/static/upload/image/8a2b418254cf521ff3e668fa33ac07ee.png", }, { "picture_image": "https://dev8.yunzmall.com/static/upload/image/e7cf7880531ff9cbb91902630c808359.png", }] |传入的数据   |


npm包  npm install vue-calendar-l

在需要用到的页面中（注意 一个页面目前只能引入一次）

import flipPage from "vue-flip-page";

components: { flipPage }

例子：


效果：

