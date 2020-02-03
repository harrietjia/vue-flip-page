<template>
  <div class="turn" ref="turn" :style="{width: width+'px', height: height+'px'}">
    <template v-for="(item,index) in data">
      <turn-page  v-if="index == backPage || index == turnPage" :index="index" :width="width" :item="item" :height="height" :length="data.length"
                  :active="index == turnPage && turnActive" :styles="index === turnPage ? styles : defaultStyles">
      </turn-page>
    </template>

    <div class="turn-right-border" :style="{width: (((Math.min(data.length, 10) / data.length * (data.length - backPage))) + 'px')}"></div>
  </div>
</template>

<script>
	import turn_controller from "./turn_controller";

	export default turn_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .turn {
    position: relative;
    z-index: 0;
    -webkit-box-shadow: 0 0 0.06rem 0 rgba(0, 0, 0, 0.60);
    box-shadow: 0 0 0.06rem 0 rgba(0, 0, 0, 0.60);
    -webkit-transition: all ease 0.35s;
    transition: all ease 0.35s;
  }

  .manual-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    -webkit-transition: all ease 0.35s;
    transition: all ease 0.35s;
  }

  .manual-page {
    position: relative;
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .manual-page.loading {
    background: url(/article-h5/static/img/loading.95eeac7.gif) no-repeat center center !important;
    background-size: 60px !important;
  }

  .page-photo {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 0;
    line-height: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    -webkit-transition: opacity ease 0.2s;
    transition: opacity ease 0.2s;
  }

  .manual-page.loading .page-photo {
    opacity: 0;
  }

  .page-photo::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 2;
    pointer-events: none;
    background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.2)), color-stop(6%, rgba(255, 255, 255, 0.15)), to(rgba(255, 255, 255, 0.15)));
    background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(255, 255, 255, 0.15) 6%, rgba(255, 255, 255, 0.15) 100%);
  }

  .page-photo img {
    display: inline-block;
    max-width: 100%;
    max-height: 100%;
  }

  .turn-right-border {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 99;;
    -webkit-transform: translate(100%);;
    transform: translate(100%);
    width: 10px;
    -webkit-perspective: 500px;
    perspective: 500px;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }

  .turn-right-border::after {
    position: relative;
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: #fff url(/article-h5/static/img/book-border.3ca9453.png) repeat-y center center;
    -webkit-transform: rotateY(35deg);
    transform: rotateY(35deg);
    -webkit-transform-origin: left center;
    transform-origin: left center;
  }

  .preload {
    position: fixed;
    z-index: -999;
    left: 0;
    top: 0;
    opacity: 0;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  .page-content {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 0.96rem;
    padding: 0.46rem 0.14rem 0;
    background-image: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.92)), to(rgba(0, 0, 0, 0.00)));
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.00) 100%);
    pointer-events: none;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .page-content-type-1 {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .page-content-type-2 {
    text-align: center;
  }

  .page-content .desc {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: calc(65% - 0.14rem);
  }

  .page-content .name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: PingFangSC-Semibold;
    font-size: 0.16rem;
    color: #FFFFFF;
    line-height: 1;
  }

  .page-content .price {
    font-family: PingFangSC-Semibold;
    font-size: 0.14rem;
    color: #FFFFFF;
  }

  .page-content .buy-button {
    width: 35%;
    text-align: right;
  }

  .page-content .buy-button button {
    display: inline-block;
    height: 0.34rem;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border: none;
    padding: 0 0.16rem;
    background: #FF8D00;
    -webkit-box-shadow: 0 0.02rem 0.04rem 0 rgba(0, 0, 0, 0.20);
    box-shadow: 0 0.02rem 0.04rem 0 rgba(0, 0, 0, 0.20);
    border-radius: 0.02rem;
    font-family: PingFangSC-Semibold;
    font-size: 0.14rem;
    color: #FFFFFF;
    pointer-events: auto;
  }

  .page-content .form-button {
    height: 0.34rem;
    border: none;
    padding: 0 0.16rem;
    background: #FFFFFF;
    -webkit-box-shadow: 0 0.02rem 0.04rem 0 rgba(0, 0, 0, 0.20);
    box-shadow: 0 0.02rem 0.04rem 0 rgba(0, 0, 0, 0.20);
    border-radius: 0.02rem;
    font-family: PingFangSC-Semibold;
    font-size: 0.14rem;
    color: #0084BF;
    pointer-events: auto;
  }
</style>
