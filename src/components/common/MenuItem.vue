<!--
<template>
  <header class="MenuItem  dark-blue">
    <div class="pull-left">
      <el-menu theme="dark" :default-active="activeIndex" :default-openeds="openedsIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
        <el-menu-item :index="item.router" v-for="item in MenuItem">{{item}}</el-menu-item>
      </el-menu>
    </div>
    &lt;!&ndash;<MenuItem :navMsg="MenuItemName"></MenuItem>&ndash;&gt;
    &lt;!&ndash;<router-view></router-view>&ndash;&gt;
  </header>
</template>

<script>
  export default {
    name: 'MenuItem',
    props: ['MenuItem'],
    data () {
      return {}
    },
    computed: {
      activeIndex() {console.log('activeIndex',this.$route.path)
        return this.$route.path;
      },
      openedsIndex() {console.log(this)

      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>

</style>
-->
