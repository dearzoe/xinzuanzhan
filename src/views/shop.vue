<template>
  <div class="shop-tab">
    <div class="select">
      <v-select :options="selects.consultants" @changeList="selectAjaxConsultants"></v-select>
    </div>
    <div class="select">
      <v-select :options="selects.selectOptions" @changeList="selectAjaxSelectOptions"></v-select>
    </div>
    <div class="serach">
      <v-serach :serach="selects.serachValue"  @changeList="serachValueAjax"></v-serach>
    </div>
    <el-table
      :data="tableData"
      v-loading.body="listLoading"
      stripe
      border
      style="width: 100%">
      <el-table-column
        width="300"
        label="卖家昵称">
        <template scope="scope">
          <span style="margin-left: 10px">
            <span class="remind">
              <el-badge :value="scope.row.count" class="item">
              <el-button type="primary" size="small" @click="remindBoole(scope.$index, scope.row)">提醒</el-button>
            </el-badge>
            </span>
            {{ scope.row.nick }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="顾问">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.consultant }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否允许使用系统">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="投放中的计划">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.put_on_campaign_num }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="投放中计划调价托管数">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.trust_num }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="投放中计划创意删除托管数">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.intell_del_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="400">
        <template scope="scope">
          <span v-show="scope.row.status == '允许' ? true : false">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row.nick)">进入系统</el-button>
            <el-button
              size="small"
              type="primary"
              @click="handleQianniu(scope.$index, scope.row)">千牛PC端</el-button>
          </span>
          <el-button
            size="small"
            type="primary"
            @click="hiddenButton(scope.$index, scope.row)">是否开通系统</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        @current-change="pageChange"
        :page-size="tablePageInfo.perPage"
        :current-page.sync="tablePageInfo.curPage"
        :page-count="tablePageInfo.pageNum">
      </el-pagination>
    </div>
    <el-dialog title="提醒" :visible.sync="remind.remindBoole">
      <el-tabs v-model="remind.activeName" v-loading.body="remind.listLoading" @tab-click="">
        <el-tab-pane label="未处理" name="first">
          <el-table
            :data="remind.data.unprocessed"
            border
            style="width: 100%">
            <el-table-column
              align="center"
              label="时间">
              <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="计划">
              <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.campaign_name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="单元">
              <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.adgroup_name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="信息">
              <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.info }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template scope="scope">
                <el-button
                  size="small"
                  type="primary"
                  @click="clickRemindButton(scope.$index, scope.row)">处理</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已处理" name="second">
          <el-table
            :data="remind.data.processed"
            v-loading.body="remind.listLoading"
            border
            style="width: 100%">
            <el-table-column
              align="center"
              label="时间">
              <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="计划">
              <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.campaign_name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="单元">
              <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.adgroup_name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="信息">
              <template scope="scope">
                <span style="margin-left: 10px">{{ scope.row.info }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
  import select from '../components/select/select.vue'
  import serach from '../components/serach/serach.vue'
  import {shopListApi, shopLoginApi, shopLimitsApi, remindMessageApi} from './../fetch/API'

  export default {
    data() {
      return {
        selects:{
          selectOptions: {
            selected:2,
            options:[
              {value: 2, label: "使用系统（全部）"},
              {value: 1, label: "允许"},
              {value: 0, label: "不允许"}]
          },
          consultants:{
            selected:'all',
            options:[
              {value:'all', label:'所有'}
              ]
          },
          //搜索值
          serachValue:''
        },
        remind: {
          listLoading: true,
          /*查看提醒*/
          remindBoole: false,
          /*提醒选项卡默认显示页*/
          activeName: 'first',
          /*数据列表*/
          data: {
            processed: [],
            unprocessed: []
          }
        },
        tableData: [],
        tablePageInfo: {
          pageNum: '',
          curPage: 1,
          perPage: 18
        }
      }
    },
    created() {
      this.getList()
    },
    components: {
      "v-select": select,
      "v-serach": serach
    },
    methods: {
      getList() {
        this.listLoading = true;
        this.refreshTableData()
      },
      selectAjaxConsultants(val) {
        this.selects.consultants.selected = val;
        let params = {page: this.tablePageInfo.curPage, consultant:val};
        this.refreshTableData(params)
      },
      selectAjaxSelectOptions(val) {
        this.selects.selectOptions.selected = val;
        let params = {page: this.tablePageInfo.curPage, status:val};
        this.refreshTableData(params)
      },
      serachValueAjax(val) {
        let params = {page: this.tablePageInfo.curPage, condition:val};
        this.refreshTableData(params)
      },
      handleEdit(index, nick) {
        shopLoginApi({nick: nick}).then(res => {
          if (res.status == 200) {
            this.$router.push({name: "index", params:{nick: nick}});
          }
        })
      },
      pageChange(curPage) {
        /*搜索名*/
        let serachValue = this.selects.serachValue,
        /*是否允许权限*/
          selectOptions = this.selects.selectOptions.selected,
        /*顾问名*/
          consultants = this.selects.consultants.selected;
        let params = {page: curPage, condition: serachValue,status:selectOptions,consultant:consultants};
        this.tablePageInfo.curPage = curPage;
        this.refreshTableData(params)
      },
      remindBoole(index, row) {
        this.remind.listLoading = true;
        let params = {nick: row.nick};
        remindMessageApi(params).then(res => {
          if (res.data.code == 0) {
            this.remind.data = res.data.data;
            this.remind.listLoading = false;
          }
        });
        return this.remind.remindBoole = true
      },
      clickRemindButton(index, row) {
        let id = row.id, nick = row.nick;
        remindMessageApi({id: id}).then(res => {
          if (res.data.code == 0) {
            var data = this.remind.data.unprocessed[index];
            this.remind.data.unprocessed.splice(index, 1);
            this.remind.data.processed.unshift(data);
            this.$message.success("处理成功！")
          } else {
            this.$message.error("处理失败！")
          }
        })
      },
      handleQianniu(index, row) {
        console.log(index, row);
      },
      hiddenButton(index, row) {
        this.$confirm('将要操作系统入口设置?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          let showStatus = row.status == "允许" ? "不允许" : "允许";
          let params = {nick: row.nick, status: showStatus == "允许" ? 1 : 0};
          shopLimitsApi(params).then(res => {
            if (res.data.code == 0) {
              row.status = showStatus;
              this.$notify({
                message: '修改成功!',
                type: 'success',
                duration: 1000
              });
              this.listLoading = false;
            }
          })
        }).catch(() => {
          row.btnHidden = row.btnHidden
          this.$notify.info({
            message: '已取消修改!',
            duration: 1000
          });
        });
      },
      refreshTableData(params) {
        shopListApi(params).then(res => {
          if (!params) {
            let info = res.data.data.info,
              total = info.total,//总条数
              per_page = info.per_page,//每页显示
              current_page = info.current_page,//当前页
              consultants = res.data.data.consultants;//顾问集合
            /*分页相关*/
            this.tablePageInfo.perPage = per_page;
            this.tablePageInfo.curPage = current_page;
            this.tablePageInfo.pageNum = Math.ceil(total / per_page);
            /*顾问下拉相关*/
            for(var key in consultants){
              this.selects.consultants.options.push({value:key, label:consultants[key]})
            }
          }
          this.tableData = res.data.data.info.data;
          this.listLoading = false;
        })
      }
    }
  }
</script>

<style type="text/stylus">
  @import './../assets/css/shop.css'
</style>
