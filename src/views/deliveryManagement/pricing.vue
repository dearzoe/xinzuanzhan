<template>
  <div class="pricing-tab">
    <el-table
      ref="multipleTable"
      :data="lists"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="计划信息"
        width="300">
        <template scope="scope">{{ scope.row.campaign_name }}</template>
      </el-table-column>
      <el-table-column
        label="计划状态">
        <template scope="scope">{{ scope.row.online_status }}</template>
      </el-table-column>
      <el-table-column
        label="管理状态"
        sortable>
        <template scope="scope">{{ scope.row.trust_target }}</template>
      </el-table-column>
      <el-table-column
        label="投放时间"
        sortable
        width="170">
        <template scope="scope">{{ scope.row.start_time }}</template>
      </el-table-column>
      <el-table-column
        label="计划预算"
        sortable>
        <template scope="scope">{{ scope.row.shop_day_budget }}</template>
      </el-table-column>
      <el-table-column
        label="实际预算"
        sortable>
        <template scope="scope">{{ scope.row.day_budget }}</template>
      </el-table-column>
      <el-table-column
        label="消耗（元）"
        sortable>
        <template scope="scope">{{ scope.row.charge }}</template>
      </el-table-column>
      <el-table-column
        label="展现"
        sortable>
        <template scope="scope">{{ scope.row.ad_pv }}</template>
      </el-table-column>
      <el-table-column
        label="点击"
        sortable>
        <template scope="scope">{{ scope.row.ctr }}</template>
      </el-table-column>
      <el-table-column
        label="点击率"
        sortable>
        <template scope="scope">{{ scope.row.click }}</template>
      </el-table-column>
      <el-table-column
        label="千次展现成本"
        sortable>
        <template scope="scope">{{ scope.row.ecpm }}</template>
      </el-table-column>
      <el-table-column
        label="点击单价"
        sortable>
        <template scope="scope">{{ scope.row.ecpc}}</template>
      </el-table-column>
      <el-table-column label="操作" width="130">
        <template scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="hiddenButton(scope.$index, scope.row)">是否开通系统</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {pricingApi} from "./../../fetch/API"
  export default {
    data() {
      return {
        lists: [{
          actual_budget:"5000",
          ad_pv:1,
          campaign_id:"216017017",
          campaign_name:"0819_cpc核心人群_其他展位测试",
          charge:1,
          click:1,
          ctr:1,
          day_budget:"5000",
          ecpc:1,
          ecpm:1,
          end_time:"2199-01-01 00:00:00",
          nick:"英语二油条",
          online_status:"9",
          rule_id:1,
          start_time:"2016-12-30 00:00:00",
          trust_target:1,
          type:"8"
        }],
        multipleSelection: []
      }
    },
    created() {
      let params = {nick: "英语二油条"};
      pricingApi(params).then(res => {
        this.lists = res.data.data.lists.lists;
      })
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      hiddenButton(index, row) {
        this.$confirm('将要操作系统入口设置?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          row.btnHidden = !row.btnHidden;
          this.$notify({
            message: '修改成功!',
            type: 'success',
            duration: 1000
          });
        }).catch(() => {
          row.btnHidden = row.btnHidden
          this.$notify.info({
            message: '已取消修改!',
            duration: 1000
          });
        });
      }
    }
  }
</script>
