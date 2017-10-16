<template>
  <div style="margin-top: 15px;">
    <el-input placeholder="请输入内容" v-model="input5">
      <el-button slot="append" icon="search"></el-button>
    </el-input>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input5: '',
        select: ''
      }
    }
  }
</script>

<style scoped>
</style>
