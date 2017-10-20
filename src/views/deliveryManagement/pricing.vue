<template>
  <div class="pricing-tab">
    <el-tabs v-model="allShop" type="card" @tab-click="">
      <el-tab-pane label="全店推广" name="first">
        <v-spread :spreadMessage="statistic"></v-spread>
      </el-tab-pane>
    </el-tabs>
    <el-row class="button-group">
      <el-col :span="8"><div class="grid-content bg-purple">
        <el-button type="primary" @click="priceTrust = true">调价托管</el-button>
        <el-button type="primary">取消托管</el-button>
        <el-button type="primary" @click="setTrustBoole = true">托管设置</el-button>
      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">&nbsp;</div></el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple button-group-right">
          <el-button type="primary" :plain="true">7天</el-button>
          <el-button type="primary" :plain="true">3天</el-button>
          <el-button type="primary" :plain="true">今天</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="button-group">
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <v-select></v-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple button-group-right">
          <el-input
            placeholder="计划名"
            icon="search"
            v-model="planName"
            :on-icon-click="planSerachClick">
          </el-input>
        </div>
      </el-col>
    </el-row>
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
        sortable
        width="100">
        <template scope="scope">
          <el-input v-show="scope.row.sellShow" v-model="scope.row.day_budget" @keyup.enter="saveCellValue"></el-input>
          <span v-show="!scope.row.sellShow"><i class="el-icon-edit" @click="cellClick(scope.row)"></i>&nbsp;{{ scope.row.day_budget }}</span>
        </template>
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
    <el-dialog title="调价托管" size="tiny" :visible.sync="priceTrust">
          <el-form :model="priceTrustForm" ref="priceTrustForm" class="form-wrapper" label-width="120px">
            <el-form-item label="选择托管规则：" prop="radios">
              <el-radio-group v-model="priceTrustForm.radios" @change="handleRadio">
                <el-radio label="cpc">控制CPC</el-radio>
                <el-radio label="roi">控制ROI</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
      <div slot="footer">
        <el-button type="primary" @click="">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="托管设置" size="tiny" :visible.sync="setTrustBoole">
      <el-tabs v-model="setTrustTab" type="card" @tab-click="handleClickRuleForm">
        <el-tab-pane label="控制CPC" name="CPC">
          <el-form :model="ruleFormCPC" ref="ruleFormCPC" class="form-wrapper" label-width="250px">
          <el-form-item label="目的集合预算（元）" prop="budget">
            <el-input v-model="ruleFormCPC.budget" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="凌晨、早、午、晚预算比例">
            <div class="margin-bottom-5"><el-input v-model="ruleFormCPC.dawn_ratio" placeholder=""></el-input></div>
            <div class="margin-bottom-5"><el-input v-model="ruleFormCPC.morning_ratio" placeholder=""></el-input></div>
            <div class="margin-bottom-5"><el-input v-model="ruleFormCPC.noor_ratio" placeholder=""></el-input></div>
            <div class="margin-bottom-5"><el-input v-model="ruleFormCPC.night_ratio" placeholder=""></el-input></div>
          </el-form-item>
          <el-form-item label="单次调整最大增幅（%）" prop="max_incre">
            <el-input v-model="ruleFormCPC.max_incre" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="执行时间间隔（H）" prop="time_space">
            <el-input v-model="ruleFormCPC.time_space" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="实时观察间隔（H）" prop="real_time_space">
            <el-input v-model="ruleFormCPC.real_time_space" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="历史观察间隔（天）" prop="history_watch">
            <el-input v-model="ruleFormCPC.history_watch" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="调整数据依据" prop="effect_type">
            <el-radio-group v-model="ruleFormCPC.effect_type" @change="handleRadio">
              <el-radio label="1">点击效果</el-radio>
              <el-radio label="2">展现效果</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="CPC计划所属资源位最高出价（元）" prop="cpc_max_price">
            <el-input v-model="ruleFormCPC.cpc_max_price" placeholder=""></el-input>
          </el-form-item>
            <el-form-item label="CPC计划所属资源位最低出价（元）" prop="cpc_min_price">
              <el-input v-model="ruleFormCPC.cpc_min_price" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="CPM计划所属资源位最高出价（元）" prop="cpm_max_price">
              <el-input v-model="ruleFormCPC.cpm_max_price" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="CPM计划所属资源位最低出价（元）" prop="cpm_min_price">
              <el-input v-model="ruleFormCPC.cpm_min_price" placeholder=""></el-input>
            </el-form-item>
        </el-form>
        </el-tab-pane>
        <el-tab-pane label="控制ROI" name="ROI">
          <el-form :model="ruleFormROI" ref="ruleFormROI" class="form-wrapper" label-width="250px">
            <el-form-item label="目的集合预算（元）" prop="budget">
              <el-input v-model="ruleFormROI.budget" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="凌晨、早、午、晚预算比例">
              <div class="margin-bottom-5"><el-input v-model="ruleFormROI.dawn_ratio" placeholder=""></el-input></div>
              <div class="margin-bottom-5"><el-input v-model="ruleFormROI.morning_ratio" placeholder=""></el-input></div>
              <div class="margin-bottom-5"><el-input v-model="ruleFormROI.noor_ratio" placeholder=""></el-input></div>
              <div class="margin-bottom-5"><el-input v-model="ruleFormROI.night_ratio" placeholder=""></el-input></div>
            </el-form-item>
            <el-form-item label="单次调整最大增幅（%）" prop="max_incre">
              <el-input v-model="ruleFormROI.max_incre" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="执行时间间隔（H）" prop="time_space">
              <el-input v-model="ruleFormROI.time_space" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="实时观察间隔（H）" prop="real_time_space">
              <el-input v-model="ruleFormROI.real_time_space" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="历史观察间隔（天）" prop="history_watch">
              <el-input v-model="ruleFormROI.history_watch" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="调整数据依据" prop="effect_type">
              <el-radio-group v-model="ruleFormROI.effect_type" @change="handleRadio">
                <el-radio label="1">点击效果</el-radio>
                <el-radio label="2">展现效果</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="CPC计划所属资源位最高出价（元）" prop="cpc_max_price">
              <el-input v-model="ruleFormROI.cpc_max_price" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="CPC计划所属资源位最低出价（元）" prop="cpc_min_price">
              <el-input v-model="ruleFormROI.cpc_min_price" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="CPM计划所属资源位最高出价（元）" prop="cpm_max_price">
              <el-input v-model="ruleFormROI.cpm_max_price" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="CPM计划所属资源位最低出价（元）" prop="cpm_min_price">
              <el-input v-model="ruleFormROI.cpm_min_price" placeholder=""></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer">
        <el-button type="primary" @click="">立即提交</el-button>
        <el-button type="default" @click="">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import SpreadWapper from './common/SpreadWapper.vue'
  import SelectGroup from './common/SelectGroup.vue'
  import {pricingApi} from "./../../fetch/API"
  export default {
    data() {
      return {
        dialogShowTrust: false, //托管日志
        priceTrust: false, //调价托管
        setTrustBoole: false, //托管设置
        sellShow: false, //托管设置
        lists: [], //列表数据
        multipleSelection: [], //列表checkbox
        priceTrustForm: {
          radios:'cpc'
        },
        ruleFormCPC: {
          budget: 0,
          dawn_ratio: 0.1,
          morning_ratio: 0.3,
          noor_ratio: 0.3,
          night_ratio: 0.3,
          max_incre: 20,
          time_space: 1,
          real_time_space: 5,
          history_watch: 7,
          effect_type: 1,
          cpc_max_price: 3,
          cpc_min_price: 0.2,
          cpm_max_price: 300,
          cpm_min_price: 10
        },
        ruleFormROI: {
          budget: 300,
          dawn_ratio: 0.1,
          morning_ratio: 0.3,
          noor_ratio: 0.3,
          night_ratio: 0.3,
          max_incre: 20,
          time_space: 1,
          real_time_space: 5,
          history_watch: 7,
          effect_type: 2,
          cpc_max_price: 3,
          cpc_min_price: 0.2,
          cpm_max_price: 300,
          cpm_min_price: 10
        },
        statistic:{}, //全店推广显示信息
        allShop: 'first', //全店推广选项卡
        planName: '', //搜索内容
        setTrustTabAry: ['CPC', 'ROI'],
        setTrustTab: 'CPC'
      }
    },
    components: {
      'v-spread': SpreadWapper,
      'v-select': SelectGroup
    },
    created() {
      let params = {nick: "英语二油条",init: 1};
      pricingApi(params).then(res => {
        this.lists = res.data.data.lists.lists;
        this.statistic = res.data.data.statistic
      })
    },
    methods: {
      //列表checkbox
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      cellClick(row) {
        console.log(100000);
        row.charge = 1000000;
        console.log(row);
        row.sellShow = !row.sellShow
//        this.sellShow[index] = !this.sellShow;
      },
      saveCellValue() {

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
      },
      //计划名搜索
      planSerachClick(ev) {
        console.log(ev);
      },
      //托管设置
      handleClickRuleForm(tab, event) {
        this.setTrustTab = tab.name;
      },
      //托管设置radio按钮
      handleRadio(v) {
        console.log(v);
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  .pricing-tab{
    margin: 10px 10% 10px;
    .button-group{
      margin: 10px 0 5px;
      height: 36px;
      .button-group-right{
        button{
          margin-left: 10px;
          float: right;
        }
      }
    }
  }
  .margin-bottom-5{
    margin-bottom: 5px;
  }
</style>
