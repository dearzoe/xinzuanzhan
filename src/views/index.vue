<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="nav-box">
          <v-nav :class="NavMenu"></v-nav>
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import NavMenu from './../components/common/NavMenu.vue'
  export default {
    data() {
      return {
        NavMenu: false
      }
    },
    components: {
      "v-nav": NavMenu
    }
  }
</script>

<style>

</style>
