<template>
<div>
  <el-select v-model="trust_status_value" placeholder="请选择">
    <el-option
      v-for="item in trust_status"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-select v-model="trust_target_value" placeholder="请选择">
    <el-option
      v-for="item in trust_target"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-select v-model="campaign_status_value" placeholder="请选择">
    <el-option
      v-for="item in campaign_status"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-select v-model="pay_type_value" placeholder="请选择">
    <el-option
      v-for="item in pay_type"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</div>
</template>

<script>
    export default {
      data() {
        return {
          trust_status: [{
              value: '-',
              label: '全部管理状态'
            },
            {
              value: '2',
              label: '调价托管'
            },
            {
              value: '1',
              label: '店主管理'
            }],
          trust_target: [{
            value: '-',
            label: '托管目的'
          },
            {
              value: '2',
              label: '控制ROI'
            },
            {
              value: '1',
              label: '控制CPC'
            }],
          campaign_status: [{
            value: '-',
            label: '全部状态'
          },
            {
              value: '1',
              label: '正在投放'
            },
            {
              value: '0',
              label: '暂停投放'
            },
            {
              value: '9',
              label: '结束投放'
            }],
          pay_type: [{
            value: '-',
            label: '所有付费方式'
          },
            {
              value: '8',
              label: '按点击付费（CPC）'
            },
            {
              value: '2',
              label: '按展现付费（CPM）'
            }],
          trust_status_value: '-',
          trust_target_value: '-',
          campaign_status_value: '-',
          pay_type_value: '-',
        }
      }
    }
</script>

<style>

</style>
