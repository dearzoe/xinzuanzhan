<template>
  <div>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
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
      return {
        options: [{
          value: '选项1',
          label: '刘婷婷'
        }, {
          value: '选项2',
          label: '刘小月'
        }, {
          value: '选项3',
          label: '屈子翔'
        }, {
          value: '选项4',
          label: '林坚恋'
        }, {
          value: '选项5',
          label: '欧阳泽川'
        }, {
          value: '选项6',
          label: '郭荟怡'
        }, {
          value: '选项7',
          label: '陈文俊'
        }, {
          value: '选项8',
          label: '雷富成'
        }, {
          value: '选项9',
          label: '颜暮烟'
        }, {
          value: '选项10',
          label: '颜暮烟1'
        }, {
          value: '选项11',
          label: '黄桂豪'
        }],
        value: ''
      }
    }
  }
</script>

<style>

</style>
