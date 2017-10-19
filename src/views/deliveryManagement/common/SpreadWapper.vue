<template>
  <div id="spreadMessage">
    <div class="tg-radio">
      <span id="num_shop_budget">{{spreadMessage.shop_day_budget}}</span>
      <span class="tg-radio-bottom">全店预算</span>
    </div>
    <div class="tg-radio">
      <span id="num_actual_budget">{{spreadMessage.actual_budget}}</span>
      <span class="tg-radio-bottom">实际预算</span>
    </div>
    <div class="tg-radio">
      <span id="num_day_budget">{{spreadMessage.day_budget}}</span>
      <span class="tg-radio-bottom">计划预算</span>
    </div>
    <div class="tg">
      <span id="num_trust_num">{{spreadMessage.trust_num}}</span>
      <span class="tg-bottom">已托管数</span>
    </div>
    <div class="tg">
      <span id="num_charge">{{spreadMessage.charge}}</span>
      <span class="tg-bottom">消耗（元）</span>
    </div>
    <div class="tg">
      <span id="num_ad_pv">{{spreadMessage.ad_pv}}</span>
      <span class="tg-bottom">展现数</span>
    </div>
    <div class="tg">
      <span id="num_click">{{spreadMessage.click}}</span>
      <span class="tg-bottom">点击</span>
    </div>
    <div class="tg">
      <span id="num_ctr">{{spreadMessage.ctr}}</span>
      <span class="tg-bottom">点击率%</span>
    </div>
    <div class="tg">
      <span id="num_ecpm">{{spreadMessage.ecpm}}</span>
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
  @import "../../../assets/css/spreadWapper.less";
</style>
