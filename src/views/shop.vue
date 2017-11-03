<template>
  <div class="shop-tab">
    <div class="select">
      <v-select></v-select>
    </div>
    <div class="select">
      <v-select></v-select>
    </div>
    <div class="serach">
      <v-serach></v-serach>
    </div>
    <el-table
      :data="tableData"
      v-loading.body="listLoading"
      border
      style="width: 100%">
      <el-table-column
        label="卖家昵称">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.nick }}</span>
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
  </div>
</template>

<script>
  import select from '../components/select/select.vue'
  import serach from '../components/serach/serach.vue'
  import {shopListApi, shopLoginApi, shopLimitsApi} from './../fetch/API'
  export default {
    data() {
      return {
        tableData: [{
          nick: "英语二油条",
          consultant: "林坚恋",
          intell_del_num: "2",
          put_on_campaign_num: "10",
          status: "允许",
          trust_num: 0
        }],
        tablePageInfo:{
          pageNum:'',
          curPage:1,
          perPage:18
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
      handleEdit(index, nick) {
        shopLoginApi({nick:nick}).then(res => {
          if(res.status == 200){
            this.$router.push({ name: "index" });
          }
        })
      },
      pageChange(curPage) {
        let params = {page:curPage};
        this.tablePageInfo.curPage = curPage;
        this.refreshTableData(params)
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
          shopLimitsApi(params).then(res => {console.log(res)
            if(res.data.code == 0){
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
          if(!params){
            let total = res.data.data.info.total,//总条数
              per_page = res.data.data.info.per_page,//每页显示
              current_page = res.data.data.info.current_page;//当前页
            this.tablePageInfo.perPage = per_page;
            this.tablePageInfo.curPage = current_page;
            this.tablePageInfo.pageNum = Math.ceil(total/per_page);
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
