<template>
  <div class="pricing-tab">
    <el-row class="button-group">
      <el-col :span="8"><div class="grid-content bg-purple">
        <el-button type="primary" v-waves @click="priceTrust = true">新建计划</el-button>
        <el-button type="primary" v-waves>暂停计划</el-button>
        <el-button type="success" v-waves @click="setTrustBoole = true">启动计划</el-button>
        <el-button type="danger" v-waves @click="setTrustBoole = true">删除计划</el-button>
      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">&nbsp;</div></el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple button-group-right">
          <el-button type="primary" v-waves :plain="true">7天</el-button>
          <el-button type="primary" v-waves :plain="true">3天</el-button>
          <el-button type="primary" v-waves :plain="true">今天</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="button-group">
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <el-select v-model="trust_status_value" placeholder="请选择">
            <el-option
              v-for="item in trust_status"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="campaign_status_value" placeholder="请选择">
            <el-option
              v-for="item in campaign_status"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="trust_target_value" placeholder="请选择">
            <el-option
              v-for="item in trust_target"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="pay_type_value" placeholder="请选择">
            <el-option
              v-for="item in pay_type"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
      v-loading.body="listLoading"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="计划信息"
        show-overflow-tooltip
        width="300">
        <template scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column
        label="计划状态">
        <template scope="scope">{{ scope.row.online_status_text }}</template>
      </el-table-column>
      <el-table-column
        label="管理状态"
        sortable>
        <template scope="scope">{{ scope.row.manage_status_text }}</template>
      </el-table-column>
      <el-table-column
        label="投放时间"
        sortable
        show-overflow-tooltip
        width="170">
        <template scope="scope">起：{{ scope.row.start_time }}<br>至：{{ scope.row.end_time }}</template>
      </el-table-column>
      <el-table-column
        label="日预算"
        sortable>
        <template scope="scope">{{ scope.row.day_budget }}</template>
      </el-table-column>
      <el-table-column
        label="消耗"
        sortable>
        <template scope="scope">{{ scope.row.rtrpts.charge }}</template>
      </el-table-column>
      <el-table-column
        label="展现"
        sortable>
        <template scope="scope">{{ scope.row.rtrpts.ad_pv }}</template>
      </el-table-column>
      <el-table-column
        label="点击"
        sortable>
        <template scope="scope">{{ scope.row.rtrpts.ctr }}</template>
      </el-table-column>
      <el-table-column
        label="点击率"
        sortable>
        <template scope="scope">{{ scope.row.rtrpts.click }}</template>
      </el-table-column>
      <el-table-column
        label="千次展现成本"
        sortable>
        <template scope="scope">{{ scope.row.rtrpts.ecpm }}</template>
      </el-table-column>
      <el-table-column
        label="点击单价"
        sortable>
        <template scope="scope">{{ scope.row.rtrpts.ecpc}}</template>
      </el-table-column>
      <el-table-column label="操作" width="130">
        <template scope="scope">
          <el-button
            size="small"
            type="primary"
            v-waves
            @click="dialogShowTrust = true">查看托管日志</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改预算" size="tiny" :visible.sync="reviseBudgetBoole">
      <el-form :model="reviseBudget" ref="reviseBudget" class="form-wrapper" label-width="120px">
        <el-form-item label="实际预算">
          <el-input v-model="reviseBudget.name1"></el-input>
        </el-form-item>
        <el-form-item label="计划预算">
          <el-input v-model="reviseBudget.name2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" v-waves @click="">确定</el-button>
      </div>
    </el-dialog>
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
        <el-button type="primary" v-waves @click="">确定</el-button>
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
        <el-button type="primary" v-waves @click="">立即提交</el-button>
        <el-button type="default" v-waves @click="">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import SpreadWapper from './common/SpreadWapper.vue'
  import SelectGroup from './common/SelectGroup.vue'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import {campaignLaunchApi} from "./../../fetch/API"
  export default {
    data() {
      return {
        listLoading: true,
        /*托管日志*/
        dialogShowTrust: false,
        /*调价托管*/
        priceTrust: false,
        /*托管设置*/
        setTrustBoole: false,
        /*修改预算*/
        reviseBudgetBoole: false,
        /*计划状态*/
        online_status_list: {},
        /*修改预算*/
        reviseBudget: {
          name1:1,
          name2:2
        },
        /*列表数据*/
        lists: [],
        /*列表checkbox*/
        multipleSelection: [],
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
        trust_status: [{
          value: '-',
          label: '全部管理状态'
        },
          {
            value: '1',
            label: '调价托管'
          },
          {
            value: '2',
            label: '店主管理'
          }],
        campaign_status: [{
          value: '-',
          label: '全部计划状态'
        },
          {
            value: '0',
            label: '暂停'
          },
          {
            value: '1',
            label: '投放中'
          },
          {
            value: '9',
            label: '投放结束'
          }],
        trust_target: [{
          value: '-',
          label: '全部计划类型'
        },
          {
            value: '1',
            label: '日常托管'
          },
          {
            value: '2',
            label: '日常推荐'
          },
          {
            value: '3',
            label: '拉新托管'
          },
          {
            value: '4',
            label: '拉新推荐'
          },
          {
            value: '-1',
            label: '拉新推荐'
          }],
        pay_type: [{
          value: '-',
          label: '全部付费方式'
        },
          {
            value: '2',
            label: '按展现付费（CPM）'
          },
          {
            value: '8',
            label: '按点击付费（CPC）'
          }],
        trust_status_value: '-',
        trust_target_value: '-',
        campaign_status_value: '-',
        pay_type_value: '-',
        /*全店推广显示信息*/
        statistic:{},
        /*全店推广选项卡*/
        allShop: 'first',
        /*搜索内容*/
        planName: '',
        setTrustTabAry: ['CPC', 'ROI'],
        setTrustTab: 'CPC'
      }
    },
    components: {
      'v-spread': SpreadWapper,
      'v-select': SelectGroup
    },
    directives: {
      waves
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true;
        let params = {init: 1};
        campaignLaunchApi(params).then(res => {
          console.log(res.data);
          console.log(res.data.data.online_status_list);
          this.lists = res.data.data.list;
//          this.statistic = res.data.data.statistic;
          this.online_status_list = res.data.data.online_status_list;
          this.listLoading = false;
        })
      },
      /*列表checkbox*/
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      /*实际预算单元格编辑*/
      cellClick(row) {
        this.reviseBudgetBoole = true;
        console.log(row);
      },
      /*实际预算单元格编辑（保存）*/
      handleIconClick(scorp) {
      },
      /*计划名搜索*/
      planSerachClick(ev) {
        console.log(ev);
      },
      /*托管设置*/
      handleClickRuleForm(tab, event) {
        this.setTrustTab = tab.name;
      },
      /*托管设置radio按钮*/
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
