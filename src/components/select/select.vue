<template>
  <div>
    <el-select v-model="options.selected" @change="selectedValue" placeholder="请选择">
      <el-option
        v-for="item in options.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: 'select',
    data() {
      return {}
    },
    props: ['options'],
    methods: {
      selectedValue(val) {
        this.$emit('changeList',val);
      }
    }
  }
</script>

<style>

</style>
