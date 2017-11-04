<template>
  <div style="margin-top: 15px;">
    <el-input placeholder="请输入内容" v-model="serachProps">
      <el-button slot="append" icon="search" @click="serachHandle"></el-button>
    </el-input>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        serach: '',
      }
    },
    props:['serachProps'],
    methods: {
      serachHandle() {
        this.$emit('changeList',this.serachProps);
      }
    }
  }
</script>

<style scoped>
</style>
