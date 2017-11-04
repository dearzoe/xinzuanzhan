<template>
<div>
  <el-select v-model="selectGroup.trust_status_list_value" @change="trustStatusValue" placeholder="请选择">
    <el-option
      v-for="item in selectGroup.trust_status_list"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-select v-model="selectGroup.trust_target_list_value" @change="trustTargetValue" placeholder="请选择">
    <el-option
      v-for="item in selectGroup.trust_target_list"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-select v-model="selectGroup.campaign_status_list_value" @change="campaignStatusValue" placeholder="请选择">
    <el-option
      v-for="item in selectGroup.campaign_status_list"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-select v-model="selectGroup.pay_type_list_value" @change="payTypeValue" placeholder="请选择">
    <el-option
      v-for="item in selectGroup.pay_type_list"
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
        return {}
      },
      props: ['selectGroup'],
      methods: {
        trustStatusValue(val) {
          this.$emit('selectGroupClick',{trust_status_list:val});
        },
        trustTargetValue(val) {
          this.$emit('selectGroupClick',{trust_target_list:val});
        },
        campaignStatusValue(val) {
          this.$emit('selectGroupClick',{campaign_status_list:val});
        },
        payTypeValue(val) {
          this.$emit('selectGroupClick',{pay_type_list:val});
        }
      }
    }
</script>

<style>

</style>
