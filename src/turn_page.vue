<template>
  <div class="turn-wraper"
       :style="{width: width+'px', height: height+'px', overflow: active ? 'visible' : 'hidden', zIndex: length - index}">
    <div class="turn-page-left" :style="{left: '-'+width+'px'}">
      <div class="turn-page-left-clip"
           :style="(Object.assign({}, {width: clipSize+'px', height: clipSize+'px'}, styles[3]))">
        <div class="turn-page-left-content"
             :style="(Object.assign({}, {width: width+'px', height: height+'px'}, styles[1]))">
          <div class="turn-page-left-inner">
            <div class="manual-item">
              <div class="page-count">{{index + 1}} / {{length}}</div>
              <div class="manual-page">
                <div class="page-photo">
                  <img :src="item.picture_image">
                </div>
                <slot></slot>
              </div>
            </div>
          </div>
          <div class="turn-page-left-gradient"
               :style="(Object.assign({}, {top: ('-' + (height / 2)+'px'), height: (height* 2)+'px'}, styles[4]))"></div>
        </div>
      </div>
    </div>
    <div class="turn-page-right" :style="{width: width+'px', height: height+'px'}">
      <div class="turn-page-right-gradient"
           :style="(Object.assign({}, {top: ('-' + (height / 2)+'px'), height: (height* 2)+'px'}, styles[5]))"></div>

      <div class="turn-page-right-clip"
           :style="(Object.assign({}, {width: clipSize+'px', height: clipSize+'px'}, styles[2]))">
        <div class="turn-page-right-content"
             :style="(Object.assign({}, {width: width+'px', height: height+'px'}, styles[0]))">
          <div class="manual-item">
            <div class="page-count">{{index + 1}} / {{length}}</div>
            <div class="manual-page">
              <div class="page-photo">
                <img :src="item.picture_image">
              </div>
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import turn_page_controller from "./turn_page_controller";

	export default turn_page_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .turn-wraper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    -webkit-transition: all ease 0.35s;
    transition: all ease 0.35s;
  }

  .turn-page-left {
    position: absolute;
    top: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .turn-page-left-clip {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
  }

  .turn-page-left-content {
    position: absolute;
    overflow: hidden;
    background-color: #fff;
  }

  .turn-page-left-inner {
    width: 100%;
    height: 100%;
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
    opacity: 0.3;
    -webkit-transition: width all ease 0.35s, height all ease 0.35s;
    transition: width all ease 0.35s, height all ease 0.35s;
  }

  .turn-page-left-gradient {
    position: absolute;
    z-index: 99;
    width: 100px;
    -webkit-transform: scale3d(0, 1, 1);
    transform: scale3d(0, 1, 1);
    background: -webkit-gradient(linear, 0% 0%, 100% 0%, from(rgba(0, 0, 0, 0)), color-stop(0.3, rgba(0, 0, 0, 0.2)), color-stop(0.5, rgba(0, 0, 0, 0.5)));
  }

  .turn-page-right {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    overflow: hidden;
  }

  .turn-page-right-gradient {
    position: absolute;
    z-index: 2;
    width: 100px;
    opacity: 1;
    -webkit-transform: scale3d(0, 1, 1);
    transform: scale3d(0, 1, 1);
    background: -webkit-gradient(linear, 0% 0%, 100% 0%, from(rgba(0, 0, 0, 0)), color-stop(0.2, rgba(0, 0, 0, 0.3)), color-stop(0.2, rgba(0, 0, 0, 0.4)), color-stop(0.4, rgba(0, 0, 0, 0.1)), to(rgba(0, 0, 0, 0)));
  }

  .turn-page-right-clip {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: auto;
  }

  .turn-page-right-content {
    position: absolute;
    overflow: hidden;
    z-index: 1;
    transition: width all ease 0.35s, height all ease 0.35s;
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

  .page-count {
    position: absolute;
    top: 0.8rem;
    left: 50%;
    z-index: 1;
    padding: 0 0.8rem;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 0.5rem;
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
    line-height: 1.8;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }

  .manual-page {
    position: relative;
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .manual-page.loading {
    /*background: url(/article-h5/static/img/loading.95eeac7.gif) no-repeat center center !important;*/
    /*background-size: 60px !important;*/
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

  .page-content {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 3rem;
    line-height: 1rem;
    text-align: left;
    padding: 0.6rem 0.2rem;
    background-image: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.92)), to(rgba(0, 0, 0, 0.00)));
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.00) 100%);
    pointer-events: none;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .page-content-type-1 {
    display: -webkit-box;
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
    font-size: 14px;
    color: #FFFFFF;
    line-height: 1;
  }

  .page-content .price {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #FFFFFF;
  }

  .page-content .buy-button {
    width: 35%;
    text-align: right;
  }

  .page-content .buy-button button {
    display: inline-block;
    height: 2rem;
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
    font-size: 14px;
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
    font-size: 14px;
    color: #0084BF;
    pointer-events: auto;
  }
</style>
