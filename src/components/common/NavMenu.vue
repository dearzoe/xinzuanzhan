<template>
  <header class="NavMenu  dark-blue">
    <div class="logo"></div>
    <div class="pull-left">
      <el-menu theme="dark" :default-active="activeIndex" :default-openeds="openedsIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
        <el-submenu index="1">
          <template slot="title">新建管理</template>
          <el-menu-item index="/new/addPlan">新建计划</el-menu-item>
          <el-menu-item index="/new/dmpCrowd">DMP人群</el-menu-item>
          <el-menu-item index="/new/visitorDirection">访客定向</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">投放管理</template>
          <el-menu-item index="/index/pricing">智能调价</el-menu-item>
          <el-menu-item index="/index/intellDel">智能删除</el-menu-item>
          <el-menu-item index="/index/campaignLaunch">投放管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">创意管理</template>
          <el-menu-item index="/creativity/creativityMan">创意管理</el-menu-item>
          <el-menu-item index="/creativity/creativityCharts">创意排行榜</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">报表管理</template>
          <el-menu-item index="/report/reportMan">报表管理</el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="line"></div>
    </div>
    <div class="loguser pull-right text-right">
      <span class="user" @click="userNameHandle"><i class="fa fa-user-o user-icon"></i>{{username}}</span>
      <el-button type="text" @click="exitBtnHandle" class="text-white">退出</el-button>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'NavMenu',
    data () {
      return {

      }
    },
    computed: {
      activeIndex() {console.log('activeIndex',this.$route.path)
        return this.$route.path;
      },
      openedsIndex() {console.log(this)

      }
    },
    props: {
      username:null
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      userNameHandle() {
        console.log("userClick");
      },
      exitBtnHandle() {
        sessionStorage.removeItem("username");
        this.$router.push({name: "login"});
      }
    }
  }
</script>

<style>
  header {
    height: 60px;
    line-height: 60px;
  }
  .logo{
    float: left;
    margin-left: 10%;
    margin-right: 30px;
    width: 242px;
    height: 100%;
    background: url("../../assets/img/logo.png");
    background-repeat: no-repeat;
  }
  .loguser{
    margin-right: 10%;
  }
  .el-menu--dark{
    background-color: #1f74f2;
  }
  .el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title{
    color: #fff;
  }
  .el-menu--horizontal.el-menu--dark .el-menu-item:hover, .el-menu--horizontal.el-menu--dark .el-submenu__title:hover {
    background-color: #1f74f2;
  }
  .el-menu--horizontal>.el-menu-item:hover, .el-menu--horizontal>.el-submenu.is-active .el-submenu__title, .el-menu--horizontal>.el-submenu:hover .el-submenu__title{
    border-bottom: 5px solid #fff;
  }
  .el-icon-caret-bottom:before {
    content: "\E604";
    color: #fff;
  }
</style>
