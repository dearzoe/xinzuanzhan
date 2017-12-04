<template>
  <div class="wrap">
    <el-row>
      <el-col :span="4">1</el-col>
      <el-col :span="20">
        <el-form ref="form" :model="form" label-width="100px">
          <h3 class="normal title"><span>&nbsp;</span>基本信息</h3>
          <el-form-item label="实际预算">
            <el-input v-model="form.actual_budget"></el-input>
          </el-form-item>
          <el-form-item label="计划预算">
            <el-input v-model="form.day_budget"></el-input>
          </el-form-item>
          <el-form-item label="付费方式">
            <el-radio-group v-model="form.campaign_type">
              <el-radio label="按展现付费"></el-radio>
              <el-radio label="按点击付费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="投放方式">
            <el-radio-group v-model="form.speed_type">
              <el-radio label="尽快投放"></el-radio>
              <el-radio label="均匀投放"></el-radio>
            </el-radio-group>
          </el-form-item>
          <h3 class="normal title"><span>&nbsp;</span>投放地区</h3>
          <el-form-item>
              <el-button type="primary" size="small">常用地区</el-button>
              <el-button type="primary" size="small">流量Top10地区</el-button>
              <el-button type="primary" size="small">ROI Top10地区</el-button>
          </el-form-item>
          <el-form-item label="常用地域">
            <el-checkbox :indeterminate="area.common.isIndeterminate" v-model="area.common.checkAll" @change="commonHandleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="area.common.checkedCities" @change="commonHandleCheckedCitiesChange">
              <el-checkbox v-for="city in area.common.cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="非常用地域">
            <el-checkbox :indeterminate="area.notCommon.isIndeterminate" v-model="area.notCommon.checkAll" @change="notCommonHandleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="area.notCommon.checkedCities" @change="notCommonHandleCheckedCitiesChange">
              <el-checkbox v-for="city in area.notCommon.cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="投放日期">
            <el-col class="line" :span="2"><el-switch on-text="自选" off-text="不限" @change="changeTimeSelect" v-model="form.showTime"></el-switch></el-col>
            <el-col :span="5" v-show="form.showTime">
              <el-date-picker
                v-model="form.date1"
                type="daterange"
                placeholder="选择日期范围">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <h3 class="normal title"><span>&nbsp;</span>投放时段</h3>
          <el-form-item label="周一至周五"><v-timeBar></v-timeBar></el-form-item>
          <el-form-item label="周六至周日"><v-timeBar></v-timeBar></el-form-item>
          <h3 class="normal title"><span>&nbsp;</span>设置定向人群</h3>
          <el-form-item :label="item" v-for="item in groupList"><el-button :crowd="item" @click="crowdClick(item)" type="text">设置<i class="fa fa-cog fa-fw"></i></el-button></el-form-item>
          <h3 class="normal title"><span>&nbsp;</span>选择投放资源位</h3>
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" size="small" :visible.sync="showDialog">
      <v-crowdTable></v-crowdTable>
    </el-dialog>
  </div>
</template>

<script>
  import TimeBar from './common/TimeBar.vue'
  import CrowdTable from './common/CrowdTable.vue'
  const commonCityOptions = ['安徽', '北京', '重庆', '福建', '广东', '广西', '贵州', '甘肃', '海南', '湖南', '湖北', '河南', '河北', '黑龙江', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山西', '陕西', '山东', '上海', '四川', '天津', '云南', '浙江'];
  const notCommonCityOptions = ['新疆', '西藏', '台湾', '香港', '澳门', '中国其他'];
  export default {
    data() {
      return {
        groupList:["高级兴趣点定向", "达摩盘定向", "群体定向", "智能定向", "营销场景定向", "相似宝贝定向", "访客定向"],
        showDialog:false,
        dialogTitle:'定向',
        form: {
          actual_budget: '',//实际预算
          day_budget: '',//计划预算
          campaign_type: '',//付费方式
          speed_type: '',//投放方式
          showTime: false,
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        area:{
          common:{
            checkAll: true,
            checkedCities: ['上海', '北京'],
            cities: commonCityOptions,
            isIndeterminate: true
          },
          notCommon:{
            checkAll: false,
            checkedCities: [],
            cities: notCommonCityOptions,
            isIndeterminate: false
          }
        }
      }
    },
    components: {
      'v-timeBar': TimeBar,
      'v-crowdTable': CrowdTable
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      commonHandleCheckAllChange(event) {
        this.area.common.checkedCities = event.target.checked ? commonCityOptions : [];
        this.area.common.isIndeterminate = false;
      },
      commonHandleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.area.common.checkAll = checkedCount === this.area.common.cities.length;
        this.area.common.isIndeterminate = checkedCount > 0 && checkedCount < this.area.common.cities.length;
      },
      notCommonHandleCheckAllChange(event) {
        this.area.notCommon.checkedCities = event.target.checked ? notCommonCityOptions : [];
        this.area.notCommon.isIndeterminate = false;
      },
      notCommonHandleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.area.notCommon.checkAll = checkedCount === this.area.notCommon.cities.length;
        this.area.notCommon.isIndeterminate = checkedCount > 0 && checkedCount < this.area.notCommon.cities.length;
      },
      changeTimeSelect(value) {
        this.form.showTime = value == true ? true : false;
        console.log(this.form.showTime)
      },
      crowdClick(item){
        this.dialogTitle = item;
        this.showDialog = true;
        console.log(item)
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  div.wrap{
    margin: 10px 10% 10px;
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    h3.title{
      color: #2D94E7;
      font-size: 17px;
      font-weight: 700;
      margin: 30px 10px;
      span{
        margin-right: 40px;
        background-color: #2D94E7;
      }
    }
    .el-form-item{
      margin: 22px 30px;
      label{
        width: 100px;
      }
      label.el-checkbox{
        margin: 0;
      }
      .center{
        text-align: center;
      }
    }
  }
</style>
