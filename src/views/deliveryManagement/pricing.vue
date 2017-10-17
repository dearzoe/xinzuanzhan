<template>
  <div class="pricing-tab">
    <SpreadWapper :spreadMessage="1"></SpreadWapper>
    <el-table
      ref="multipleTable"
      :data="lists"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="计划信息"
        width="300">
        <template scope="scope">{{ scope.row.campaign_name }}</template>
      </el-table-column>
      <el-table-column
        label="计划状态">
        <template scope="scope">{{ scope.row.online_status }}</template>
      </el-table-column>
      <el-table-column
        label="管理状态"
        sortable>
        <template scope="scope">{{ scope.row.trust_target }}</template>
      </el-table-column>
      <el-table-column
        label="投放时间"
        sortable
        width="170">
        <template scope="scope">{{ scope.row.start_time }}</template>
      </el-table-column>
      <el-table-column
        label="计划预算"
        sortable>
        <template scope="scope">{{ scope.row.shop_day_budget }}</template>
      </el-table-column>
      <el-table-column
        label="实际预算"
        sortable>
        <template scope="scope">{{ scope.row.day_budget }}</template>
      </el-table-column>
      <el-table-column
        label="消耗（元）"
        sortable>
        <template scope="scope">{{ scope.row.charge }}</template>
      </el-table-column>
      <el-table-column
        label="展现"
        sortable>
        <template scope="scope">{{ scope.row.ad_pv }}</template>
      </el-table-column>
      <el-table-column
        label="点击"
        sortable>
        <template scope="scope">{{ scope.row.ctr }}</template>
      </el-table-column>
      <el-table-column
        label="点击率"
        sortable>
        <template scope="scope">{{ scope.row.click }}</template>
      </el-table-column>
      <el-table-column
        label="千次展现成本"
        sortable>
        <template scope="scope">{{ scope.row.ecpm }}</template>
      </el-table-column>
      <el-table-column
        label="点击单价"
        sortable>
        <template scope="scope">{{ scope.row.ecpc}}</template>
      </el-table-column>
      <el-table-column label="操作" width="130">
        <template scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="dialogShowTrust = true">查看托管日志</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加店铺" :visible.sync="dialogShowTrust">
      <el-form :model="newShop" ref="newShop" class="form-wrapper" label-width="120px">
        <el-form-item label="店铺淘宝ID" prop="tao_bao_nick">
          <el-input v-model="newShop.tao_bao_nick" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="店铺名" prop="shop_name">
          <el-input v-model="newShop.shop_name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="店铺URL地址" prop="shop_url">
          <el-input v-model="newShop.shop_url" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="主营类目" prop="main_categories">
          <el-input v-model="newShop.main_categories" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="principal">
          <el-input v-model="newShop.principal" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="apartment">
          <el-input v-model="newShop.apartment" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="服务时间" prop="server_time">
          <el-input v-model="newShop.server_time" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="店铺状态" prop="shop_status">
          <el-input v-model="newShop.shop_status" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="操作" prop="operation">
          <el-select v-model="newShop.operation" placeholder="" class="full-width">
            <el-option key="启用" label="启用" value="启用"></el-option>
            <el-option key="禁用" label="禁用" value="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统登录账号" prop="sys_account">
          <el-input v-model="newShop.sys_account" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="系统登录密码" prop="sys_secret">
          <el-input v-model="newShop.sys_secret" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="">保存添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import SpreadWapper from './common/SpreadWapper.vue'
  import {pricingApi} from "./../../fetch/API"
  export default {
    data() {
      return {
        dialogShowTrust: false,
        lists: [],
        multipleSelection: [],
        newShop: {
          tao_bao_nick: "",
          shop_name: "",
          main_categories: "",
          principal: "",
          apartment: "",
          server_time: "",
          shop_status: "",
          sys_account: "",
          sys_secret: "",
          operation: "启用"
        },
      }
    },
    components: {
      SpreadWapper
    },
    created() {
      let params = {nick: "英语二油条"};
      pricingApi(params).then(res => {
        this.lists = res.data.data.lists.lists;
      })
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      hiddenButton(index, row) {
        this.$confirm('将要操作系统入口设置?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          row.btnHidden = !row.btnHidden;
          this.$notify({
            message: '修改成功!',
            type: 'success',
            duration: 1000
          });
        }).catch(() => {
          row.btnHidden = row.btnHidden
          this.$notify.info({
            message: '已取消修改!',
            duration: 1000
          });
        });
      }
    }
  }
</script>

<style scoped>
  .pricing-tab{
    margin: 10px 10% 10px;
  }
</style>
