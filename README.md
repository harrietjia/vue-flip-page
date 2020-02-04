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
| data | Array | [ { "picture_image": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2600216442,2384386498&fm=15&gp=0.jpg", }, { "picture_image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580807703833&di=0ab054549c3ea050dc0bd49e146b20e9&imgtype=0&src=http%3A%2F%2Fwww.thatsmags.com%2Fimage%2Fview%2F201703%2Fvue-cover.jpg", }] |传入的数据   |


npm包  npm install vue-flip-page

在需要用到的页面中（注意 一个页面目前只能引入一次）

import flipPage from "vue-flip-page";

components: { flipPage }

例子：

![图片说明](https://img-blog.csdnimg.cn/20200204142239148.png)

效果：

![图片说明](https://img-blog.csdnimg.cn/20200204142234872.gif)

