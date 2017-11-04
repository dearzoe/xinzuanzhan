<template>
  <div style="margin-top: 15px;">
    <el-input placeholder="请输入内容" v-model="serach">
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
    props:['serach'],
    methods: {
      serachHandle() {
        this.$emit('changeList',this.serach);
      }
    }
  }
</script>

<style scoped>
</style>
