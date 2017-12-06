<template>
  <div class="wrap">
    <el-row>
      <el-col :span="4">1</el-col>
      <el-col :span="20">
        <el-form ref="form" :model="form" label-width="110px">
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
              <el-button v-waves type="primary" size="small">常用地区</el-button>
              <el-button v-waves type="primary" size="small">流量Top10地区</el-button>
              <el-button v-waves type="primary" size="small">ROI Top10地区</el-button>
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
          <el-form-item label="周一至周五"><v-timeBar :time="timeBarData1"></v-timeBar></el-form-item>
          <el-form-item label="周六至周日"><v-timeBar :time="timeBarData2"></v-timeBar></el-form-item>
          <h3 class="normal title"><span>&nbsp;</span>设置定向人群</h3>
          <el-form-item :label="item.name" v-for="item in groupList"><el-button v-waves :crowd="item.interface" @click="crowdClick(item.interface)" type="text">设置<i class="fa fa-cog fa-fw"></i></el-button></el-form-item>
          <h3 class="normal title"><span>&nbsp;</span>选择投放资源位</h3>
          <el-form-item label="">
            <el-row>
              <el-col :span="17">
                <el-radio-group v-model="form.campaign_type">
                  <el-radio :label="item" v-for="item in resourceLocation"></el-radio>
                </el-radio-group>
              </el-col>
              <el-col :span="4">
                <el-input v-model="batchPrice" placeholder="出价"></el-input>
              </el-col>
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="2">
                <el-button v-waves type="primary" @click="changeBatchPrice">修改</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="">
            <el-table
              ref="multipleTable"
              :data="adzonesItem"
              border
              tooltip-effect="dark"
              style="width: 100%"
              v-if="key == 'taoBaoAdzones'"
              v-for="(adzonesItem, key) in adzones"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                align="center"
                width="55">
              </el-table-column>
              <el-table-column
                align="center"
                prop="is_inside"
                label="站内外">
              </el-table-column>
              <el-table-column
                align="center"
                prop="adzone_name"
                show-overflow-tooltip
                label="资源位名称">
              </el-table-column>
              <el-table-column
                align="center"
                label="出价（元）"
                show-overflow-tooltip>
                <template scope="scope"><el-input v-model="scope.row.adzone_price" size="small" :disabled="scope.row.disabled" placeholder="出价"></el-input></template>
              </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
              <el-button v-waves @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
              <el-button v-waves @click="toggleSelection(tableData3)">取消选择</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button v-waves type="primary" @click="onSubmit">立即创建</el-button>
            <el-button v-waves>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" size="small" :visible.sync="showDialog" :before-close="handleClose">
      <v-crowdTable :dataAry="dataAryCrowd"></v-crowdTable>
    </el-dialog>
  </div>
</template>

<script>
  import TimeBar from './common/TimeBar.vue'
  import CrowdTable from './common/CrowdTable.vue'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import {intellCrowdApi, marketingCrowdApi, dmpCrowdApi, visitorCrowdApi, similarCrowdApi, groupCrowdApi, advancedInterestCrowdApi, industryShopCrowdApi, allCrowdApi, adZoneApi} from "./../../fetch/API"
  const commonCityOptions = ['安徽', '北京', '重庆', '福建', '广东', '广西', '贵州', '甘肃', '海南', '湖南', '湖北', '河南', '河北', '黑龙江', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山西', '陕西', '山东', '上海', '四川', '天津', '云南', '浙江'];
  const notCommonCityOptions = ['新疆', '西藏', '台湾', '香港', '澳门', '中国其他'];
  export default {
    data() {
      return {
        dataAryCrowd:[],
        groupList:[
          {name:'智能定向',interface:'intellCrowdApi',isShow:'true'},
          {name:'营销场景定向',interface:'marketingCrowdApi',isShow:'true'},
          {name:'达摩盘定向',interface:'dmpCrowdApi',isShow:'true'},
          {name:'访客定向',interface:'visitorCrowdApi',isShow:'true'},
          {name:'相似宝贝定向',interface:'similarCrowdApi',isShow:'true'},
          {name:'群体定向',interface:'groupCrowdApi',isShow:'true'},
          {name:'高级兴趣点定向',interface:'advancedInterestCrowdApi',isShow:'true'},
          {name:'行业店铺定向',interface:'industryShopCrowdApi',isShow:'true'},
          {name:'通投定向',interface:'allCrowdApi',isShow:'true'}
          ],
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
        },
        timeBarData1:[
          {name:1, checked:true},
          {name:2, checked:true},
          {name:3, checked:true},
          {name:4, checked:true},
          {name:5, checked:true},
          {name:6, checked:true},
          {name:7, checked:true},
          {name:8, checked:true},
          {name:9, checked:true},
          {name:10, checked:true},
          {name:11, checked:true},
          {name:12, checked:true},
          {name:13, checked:true},
          {name:14, checked:true},
          {name:15, checked:true},
          {name:16, checked:true},
          {name:17, checked:true},
          {name:18, checked:true},
          {name:19, checked:true},
          {name:20, checked:true},
          {name:21, checked:true},
          {name:22, checked:true},
          {name:23, checked:true},
          {name:24, checked:true}
        ],
        timeBarData2:[
          {name:1, checked:true},
          {name:2, checked:true},
          {name:3, checked:true},
          {name:4, checked:true},
          {name:5, checked:true},
          {name:6, checked:true},
          {name:7, checked:true},
          {name:8, checked:true},
          {name:9, checked:true},
          {name:10, checked:true},
          {name:11, checked:true},
          {name:12, checked:true},
          {name:13, checked:true},
          {name:14, checked:true},
          {name:15, checked:true},
          {name:16, checked:true},
          {name:17, checked:true},
          {name:18, checked:true},
          {name:19, checked:true},
          {name:20, checked:true},
          {name:21, checked:true},
          {name:22, checked:true},
          {name:23, checked:true},
          {name:24, checked:true}
        ],
        selectCrowds:{intellCrowds: [],marketingCrowds: [],dmpCrowds: [],visitorCrowds: [],similarCrowds: [],groupCrowds: [],interestCrowds: [],},
        resourceLocation:["常用资源位","淘宝店资源位","天猫店资源位"],
        adzones: {
          defaultAdzones:[{
            is_inside: '1',
            adzone_name: '王小虎',
            adzone_price: '1',
            disabled: true
          }],
          taoBaoAdzones:[{
            is_inside: '1',
            adzone_name: '王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎',
            adzone_price: '2',
            disabled: true
          },{
            is_inside: '1',
            adzone_name: '王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎',
            adzone_price: '2',
            disabled: true
          }]
        },
        multipleSelection: [],
        batchPrice:'123'
      }
    },
    components: {
      'v-timeBar': TimeBar,
      'v-crowdTable': CrowdTable
    },
    directives: {
      waves
    },
    created() {
      let params = {settle_type:1};
      adZoneApi(params).then(function(res){console.log(res);
//        let code = res.data.code;
//        if(code == 0){
//          if(_this.lists.length < res.data.data.lists.total){
//            _this.lists.push.apply(_this.lists, res.data.data.lists.lists);
//            // 数据更新完毕，将开关打开
//            sw = true;
//            _this.$notify.success("下拉加载数据完毕");
//          }else{
//            _this.$notify.success("没有更多数据");
//            sw = false;
//          }
//
//        }else{
//          _this.$notify.error(res.data.msg);
//        }

      }).catch(function(error){
        console.log(error);
      });
    },
    methods: {
      /*表单提交*/
      onSubmit() {
        console.log('submit!');
      },
      /*常用区域全选*/
      commonHandleCheckAllChange(event) {
        this.area.common.checkedCities = event.target.checked ? commonCityOptions : [];
        this.area.common.isIndeterminate = false;
      },
      /*常用区域单选*/
      commonHandleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.area.common.checkAll = checkedCount === this.area.common.cities.length;
        this.area.common.isIndeterminate = checkedCount > 0 && checkedCount < this.area.common.cities.length;
      },
      /*非常用区域全选*/
      notCommonHandleCheckAllChange(event) {
        this.area.notCommon.checkedCities = event.target.checked ? notCommonCityOptions : [];
        this.area.notCommon.isIndeterminate = false;
      },
      /*非常用区域单选*/
      notCommonHandleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.area.notCommon.checkAll = checkedCount === this.area.notCommon.cities.length;
        this.area.notCommon.isIndeterminate = checkedCount > 0 && checkedCount < this.area.notCommon.cities.length;
      },
      /*投放日期选择*/
      changeTimeSelect(value) {
        this.form.showTime = value == true ? true : false;
        console.log(this.form.showTime)
      },
      /*设置定向人群*/
      crowdClick(item){
        // 缓存指针
        let _this = this;
        this.dialogTitle = item.name;
        this.showDialog = true;
        console.log(item);
        let params = {campaign_type: 2};
        /*智能定向*/
        if(item == 'intellCrowdApi'){
          intellCrowdApi(params).then(function(res){console.log(res);
            let code = res.data.code;
            if(code == 0){

            }else{

            }
          }).catch(function(error){
            console.log(error);
          });
          /*营销场景定向*/
        }else if(item == 'marketingCrowdApi'){
          marketingCrowdApi(params).then(function(res){console.log(res);
            let code = res.data.code;
            if(code == 0){

            }else{

            }
          }).catch(function(error){
            console.log(error);
          });
          /*达摩盘定向*/
        }else if(item == 'dmpCrowdApi'){
          dmpCrowdApi(params).then(function(res){console.log(res);
            let code = res.data.code;
            if(code == 0){

            }else{

            }
          }).catch(function(error){
            console.log(error);
          });
          /*访客定向*/
        }else if(item == 'visitorCrowdApi'){
          visitorCrowdApi(params).then(function(res){console.log(res);
            let code = res.data.code;
            if(code == 0){

            }else{

            }
          }).catch(function(error){
            console.log(error);
          });
          /*相似宝贝定向*/
        }else if(item == 'similarCrowdApi'){
          similarCrowdApi(params).then(function(res){console.log(res);
            let code = res.data.code;
            if(code == 0){
              _this.dataAryCrowd.push.apply(_this.dataAryCrowd, res.data.data);
              console.log(_this.dataAryCrowd)
            }else{

            }
          }).catch(function(error){
            console.log(error);
          });
          /*群体定向*/
        }else if(item == 'groupCrowdApi'){
          groupCrowdApi(params).then(function(res){console.log(res);
            let code = res.data.code;
            if(code == 0){

            }else{

            }
          }).catch(function(error){
            console.log(error);
          });
          /*高级兴趣点定向*/
        }else if(item == 'advancedInterestCrowdApi'){
          advancedInterestCrowdApi(params).then(function(res){console.log(res);
            let code = res.data.code;
            if(code == 0){

            }else{

            }
          }).catch(function(error){
            console.log(error);
          });
          /*行业店铺定向*/
        }else if(item == 'industryShopCrowdApi'){
          industryShopCrowdApi(params).then(function(res){console.log(res);
            let code = res.data.code;
            if(code == 0){

            }else{

            }
          }).catch(function(error){
            console.log(error);
          });
          /*通投定向*/
        }else if(item == 'allCrowdApi'){
          allCrowdApi(params).then(function(res){console.log(res);
            let code = res.data.code;
            if(code == 0){

            }else{

            }
          }).catch(function(error){
            console.log(error);
          });
        }
      },
      /*关闭弹窗*/
      handleClose(done) {
        this.dataAryCrowd = [];
        done();
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        val[0].disabled = false;
        this.multipleSelection = val;
      },
      changeBatchPrice() {
        console.log(this.multipleSelection)
        for(var item of this.multipleSelection){
            console.log(item)
          item.adzone_price = this.batchPrice
        }
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
