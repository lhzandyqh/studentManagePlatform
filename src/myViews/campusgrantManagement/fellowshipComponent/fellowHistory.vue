<template>
  <div class="app-container">
    <div class="button_head clearfix">
      <div class="search_container">
        <el-select v-model="type" placeholder="请选择年度">
          <el-option label="2021" value="beijing" />
          <el-option label="2020" value="shanghai" />
          <el-option label="2019" value="beijing" />
          <el-option label="2018" value="beijing" />
          <el-option label="2017" value="beijing" />
          <el-option label="2016" value="beijing" />
        </el-select>
        <el-button type="primary">搜索</el-button>
      </div>
    </div>
    <el-divider />
    <div class="table_container">
      <el-table
        :data="tableDataOne.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="number"
          label="编号"
          width="200"
        />
        <el-table-column
          prop="year"
          label="年度"
          width="200"
        />
        <el-table-column
          prop="starttime"
          label="申请开始日期"
        />
        <el-table-column
          prop="finishtime"
          label="申请结束日期"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="getScholarshipDetail1(scope.row)">查看帮扶人员</el-button>
            <el-button type="text" @click="getScholarshipDetail2(scope.row)">查看助学金明细</el-button>
            <el-button type="text">导出</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="fenye">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDataOne.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-dialog
      title="帮扶人员"
      :visible.sync="dialogVisible1"
      width="50%"
      :before-close="handleClose"
    >
      <el-table
        :data="tableDataTwo.slice((currentPage2-1)*pageSize,currentPage2*pageSize)"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="姓名"
          width="150"
        />
        <el-table-column
          prop="studentid"
          label="学号"
        />
        <el-table-column
          prop="academy"
          label="专业"
        />
        <el-table-column
          prop="date"
          label="帮扶日期"
        />
      </el-table>
      <div class="fenye">
        <el-pagination
          small
          :current-page="currentPage2"
          page-size="5"
          layout="prev, pager, next"
          :total="tableDataTwo.length"
          @current-change="handleCurrentChangeTwo"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="助学金明细"
      :visible.sync="dialogVisible2"
      width="80%"
      :before-close="handleClose"
    >
      <p>已成功发放助学金0次，补发0次，实际发放金额0元</p>
      <el-table
        :data="tableDataThree"
        style="width: 100%"
        border
      >
        <el-table-column
          prop="number"
          label="序号"
          width="100"
        />
        <el-table-column
          prop="studentid"
          label="学号"
          width="100"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="100"
        />
        <el-table-column
          prop="level"
          label="培养层次"
          width="100"
        />
        <el-table-column
          prop="standard"
          label="发放标准"
          width="100"
        />
        <el-table-column
          prop="issue_state"
          label="发放状态"
          width="100"
        />
        <el-table-column
          prop="reason1"
          label="不发原因"
          width="100"
        />
        <el-table-column
          prop="result1"
          label="发放结果"
          width="100"
        />
        <el-table-column
          prop="money"
          label="补发金额"
          width="100"
        />
        <el-table-column
          prop="reason2"
          label="补发原因"
          width="100"
        />
        <el-table-column
          prop="result2"
          label="补发结果"
          width="100"
        />
        <el-table-column
          prop="batch"
          label="批次"
          width="100"
        />
        <el-table-column
          prop="account"
          label="账号后4位"
          width="100"
        />
        <el-table-column
          prop="generate_state"
          label="生成时状态"
          width="100"
        />
        <el-table-column
          prop="current_state"
          label="当前状态"
          width="100"
        />
        <el-table-column
          prop="graduateDate"
          label="毕业日期"
          width="100"
        />
        <el-table-column
          prop="report_state"
          label="上报状态"
          width="100"
        />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible2 = false">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'FellowHistory',
  data() {
    return {
      dialogVisible1: false,
      dialogVisible2: false,
      type: '',
      currentPage: 1,
      currentPage2: 1,
      pageSize: 5,
      tableDataOne: [{
        number: '0001',
        year: '2020',
        starttime: '2020-03-10',
        finishtime: '2020-06-15'
      }, {
        number: '0001',
        year: '2020',
        starttime: '2020-03-10',
        finishtime: '2020-06-15'
      }, {
        number: '0001',
        year: '2020',
        starttime: '2020-03-10',
        finishtime: '2020-06-15'
      }, {
        number: '0001',
        year: '2020',
        starttime: '2020-03-10',
        finishtime: '2020-06-15'
      }, {
        number: '0001',
        year: '2020',
        starttime: '2020-03-10',
        finishtime: '2020-06-15'
      }, {
        number: '0001',
        year: '2020',
        starttime: '2020-03-10',
        finishtime: '2020-06-15'
      }],
      tableDataTwo: [{
        name: '王小虎',
        studentid: '2020040402080',
        academy: '法学院',
        date: '2016-05-02'
      }, {
        name: '王小虎',
        studentid: '2020040402080',
        academy: '法学院',
        date: '2016-05-02'
      }, {
        name: '王小虎',
        studentid: '2020040402080',
        academy: '法学院',
        date: '2016-05-02'
      }, {
        name: '王小虎',
        studentid: '2020040402080',
        academy: '法学院',
        date: '2016-05-02'
      }, {
        name: '王小虎',
        studentid: '2020040402080',
        academy: '法学院',
        date: '2016-05-02'
      }, {
        name: '王小虎',
        studentid: '2020040402080',
        academy: '法学院',
        date: '2016-05-02'
      }, {
        name: '王小虎',
        studentid: '2020040402080',
        academy: '法学院',
        date: '2016-05-02'
      }, {
        name: '王小虎',
        studentid: '2020040402080',
        academy: '法学院',
        date: '2016-05-02'
      }, {
        name: '王小虎',
        studentid: '2020040402080',
        academy: '法学院',
        date: '2016-05-02'
      }, {
        name: '王小虎',
        studentid: '2020040402080',
        academy: '法学院',
        date: '2016-05-02'
      }, {
        name: '王小虎',
        studentid: '2020040402080',
        academy: '法学院',
        date: '2016-05-02'
      }],
      tableDataThree: [{
        number: '1',
        studentid: '1',
        name: '1',
        level: '1',
        standard: '1',
        issue_state: '1',
        reason1: '1',
        result1: '1',
        money: '1',
        reason2: '1',
        result2: '1',
        batch: '1',
        account: '1',
        generate_state: '1',
        current_state: '1',
        graduateDate: '1',
        report_state: '1'
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
    handleCurrentChangeTwo(val) {
      this.currentPage2 = val
    },
    // 自己的方法
    getScholarshipDetail1: function() {
      this.dialogVisible1 = true
    },
    getScholarshipDetail2: function() {
      this.dialogVisible2 = true
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
.audit_title {
  font-weight: bold;
}
.foot{
  text-align: center;
  margin-top: 20px;
}
</style>
