<template>
  <div id="spreadMessage">
    <div class="tg-radio">
      <span id="num_shop_budget">{{spreadMessage}}</span>
      <span class="tg-radio-bottom">全店预算</span>
    </div>
    <div class="tg-radio">
      <span id="num_actual_budget">{{spreadMessage}}</span>
      <span class="tg-radio-bottom">实际预算</span>
    </div>
    <div class="tg-radio">
      <span id="num_day_budget">{{spreadMessage}}</span>
      <span class="tg-radio-bottom">计划预算</span>
    </div>
    <div class="tg">
      <span id="num_trust_num">{{spreadMessage}}</span>
      <span class="tg-bottom">已托管数</span>
    </div>
    <div class="tg">
      <span id="num_charge">{{spreadMessage}}</span>
      <span class="tg-bottom">消耗（元）</span>
    </div>
    <div class="tg">
      <span id="num_ad_pv">{{spreadMessage}}</span>
      <span class="tg-bottom">展现数</span>
    </div>
    <div class="tg">
      <span id="num_click">{{spreadMessage}}</span>
      <span class="tg-bottom">点击</span>
    </div>
    <div class="tg">
      <span id="num_ctr">{{spreadMessage}}</span>
      <span class="tg-bottom">点击率%</span>
    </div>
    <div class="tg">
      <span id="num_ecpm">{{spreadMessage}}</span>
      <span class="tg-bottom">千次展现成本（元）</span>
    </div>
  </div>
</template>

<script>
    export default {
      props: ['spreadMessage']
    }
</script>

<style scoped lang="less" type="text/less">
  #spreadMessage{
    width: 100%;
    height: 150px;
    >div{
      float: left;
      margin: 5px 0.55%;
      width: 10%;
      height: 100%;
      span{
        display: block;
      }
      span:nth-child(1){
        height: 80px;
        line-height: 100px;
        text-align: center;
        font-size: 33px;
      }
      span:nth-child(2){
        height: 66px;
        line-height: 66px;
        text-align: center;
      }
    }
    >div.tg-radio{
      border-radius: 50%;
      width: 142px;
      height: 140px;
      border: 5px solid #f76c4f;
      overflow: hidden;
      span:nth-child(1){
        color: #f76c4f;
      }
      span:nth-child(2){
        font-size: 18px;
        line-height: 60px;
        background: #fad0c7;
        color: #fff;
      }
    }
    >div.tg{
      border-radius: 5px;
      span:nth-child(1){
        height: 100px;
        color: #fff;
      }
      .tg-bottom{
        height: 50px;
        line-height: 50px;
        border-radius: 5px;
        background: rgba(0,0,0,0.3);
        color: #fff;
      }
    }
    >div.tg:nth-child(4){
      background: #3499DC;
    }
    >div.tg:nth-child(5){
      background: #1ABC9D;
    }
    >div.tg:nth-child(6){
      background: #9479D9;
    }
    >div.tg:nth-child(7){
      background: #2FCD71;
    }
    >div.tg:nth-child(8){
      background: #E76B7A;
    }
    >div.tg:nth-child(9){
      background: #79D6D9;
    }
  }
</style>
