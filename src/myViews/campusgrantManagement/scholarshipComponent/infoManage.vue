<template>
  <div class="app-container">
    <div class="button_head clearfix">
      <div class="search_container">
        <el-select v-model="type" placeholder="请选择类型">
          <el-option label="进行中" value="shanghai" />
          <el-option label="待开始" value="beijing" />
          <el-option label="已结束" value="beijing" />
        </el-select>
        <el-button type="primary">搜索</el-button>
      </div>
      <div class="button_container">
        <el-button type="primary" plain @click="openAddDialog">新增奖学金项目信息</el-button>
      </div>
    </div>
    <el-divider />
    <div class="table_container">
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="编号"
          width="100"
        />
        <el-table-column
          prop="name"
          label="奖学金名称"
        />
        <el-table-column
          prop="address"
          label="年度"
        />
        <el-table-column
          prop="address"
          label="级别"
        />
        <el-table-column
          prop="address"
          label="可申请人"
        />
        <el-table-column
          prop="address"
          label="申请开始日期"
        />
        <el-table-column
          prop="address"
          label="申请结束日期"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="getContent(scope.row)">查看申请要求</el-button>
            <el-button type="text">开始</el-button>
            <el-button type="text">结束</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="fenye">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-dialog
      title="新增奖学金项目信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="addForm" label-width="110px">
        <el-form-item label="奖学金名称">
          <el-input v-model="addForm.notice_title" />
        </el-form-item>
        <el-form-item label="奖学金年度">
          <el-input v-model="addForm.edit_people" />
        </el-form-item>
        <el-form-item label="级别">
          <el-input v-model="addForm.edit_people" />
        </el-form-item>
        <el-form-item label="申请要求">
          <el-input v-model="addForm.notice_content" :rows="10" type="textarea" />
        </el-form-item>
        <el-form-item label="可申请人">
          <el-select v-model="addForm.notice_level" placeholder="请选择通知级别">
            <el-option label="大一" value="大一" />
            <el-option label="大二" value="大二" />
            <el-option label="大三" value="大三" />
            <el-option label="大四" value="大四" />
            <el-option label="所有" value="所有" />
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-col :span="11">
            <el-date-picker v-model="addForm.date1" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-col :span="11">
            <el-date-picker v-model="addForm.date2" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;" />
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddNotice">添加待开始</el-button>
        <el-button type="primary" @click="confirmAddNotice">添加并开始</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="申请要求"
      :visible.sync="dialogVisibleTwo"
      width="50%"
      :before-close="handleClose"
    >
      <p>这是申请要求</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisibleTwo = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'InfoManage',
  data() {
    return {
      dialogVisible: false,
      dialogVisibleTwo: false,
      currentPage: 1,
      pageSize: 5,
      type: '',
      addForm: {
        number: '',
        notice_title: '',
        notice_content: '',
        notice_level: '',
        release_date: '',
        edit_people: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    // 自己的方法
    openAddDialog: function() {
      this.dialogVisible = true
    },
    getContent: function(row) {
      console.log(row)
      this.dialogVisibleTwo = true
    }
  }
}
</script>

<style scoped>
.search_container{
  float: left;
}
.button_container{
  float: right;
  padding-right: 100px;
}
.main_title span {
  font-size: 15px;
  font-weight: bold;
  color: #666666;
}
.table_container{
  margin-top: 20px;
}
.fenye {
  text-align: center;
  margin-top: 20px;
}
.clearfix :after{
  display:block;
  height:0;
  clear:both;
  visibility: hidden;
  overflow:hidden;
}
.clearfix{
  zoom: 1;
}
</style>
