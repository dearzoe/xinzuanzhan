<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="nav-box">
          <v-nav :class="NavMenu" :username="username"></v-nav>
          <router-view></router-view>
          <footer></footer>
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
    },
    computed: {
      username() {
        return sessionStorage.getItem("username");
      }
    }
  }
</script>

<style scope>
  footer{
    height: 50px;
  }
</style>
