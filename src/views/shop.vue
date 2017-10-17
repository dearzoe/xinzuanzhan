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
          <span style="margin-left: 10px">{{ scope.row.allow == true ? "允许" : "不允许"}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="投放中的计划">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.number1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="投放中计划调价托管数">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.number2 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="投放中计划创意删除托管数">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.number3 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="400">
        <template scope="scope">
          <span v-show="scope.row.btnHidden">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row.nick)">进入系统</el-button>
            <el-button
              size="small"
              type="primary"
              @click="handleDelete(scope.$index, scope.row)">千牛PC端</el-button>
          </span>
          <el-button
            size="small"
            type="primary"
            @click="hiddenButton(scope.$index, scope.row)">是否开通系统</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import select from '../components/select/select.vue'
  import serach from '../components/serach/serach.vue'
  import {ShopLoginApi} from './../fetch/API'
  export default {
    data() {
      return {
        tableData: [{
          nick: "英语二油条",
          consultant: "林坚恋",
          allow: true,
          number1: 1,
          number2: 10,
          number3: 32,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          btnHidden: true
        }, {
          nick: "欧芭旗舰店",
          consultant: "林坚恋",
          allow: false,
          number1: 1,
          number2: 10,
          number3: 32,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          btnHidden: false
        }, {
          nick: "英语二油条",
          consultant: "林坚恋",
          allow: true,
          number1: 1,
          number2: 10,
          number3: 32,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          btnHidden: true
        }]
      }
    },
    created() {

    },
    components: {
      "v-select": select,
      "v-serach": serach
    },
    methods: {
      handleEdit(index, nick) {
        ShopLoginApi({nick:nick}).then(res => {
          this.$router.push({ name: "index" });
        })
      },
      handleDelete(index, row) {
        console.log(index, row);
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

<style type="text/stylus">
  @import './../assets/css/shop.css'
</style>
