<template>
  <div class="app-container">
    <div class="button_head clearfix">
      <div class="search_container">
        <el-select v-model="type" placeholder="请选择年度">
          <el-option label="2021" value="2021" />
          <el-option label="2020" value="2020" />
          <el-option label="2019" value="2019" />
          <el-option label="2018" value="2018" />
          <el-option label="2017" value="2017" />
          <el-option label="2016" value="2016" />
        </el-select>
        <el-button type="primary" @click="getHistoryByYear">搜索</el-button>
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
          prop="id"
          label="编号"
          width="200"
        />
        <el-table-column
          prop="stipentName"
          label="助学金名称"
          width="200"
        />
        <el-table-column
          prop="applyYear"
          label="年度"
          width="200"
        />
        <el-table-column
          prop="startDate"
          label="申请开始日期"
        />
        <el-table-column
          prop="endDate"
          label="申请结束日期"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="getHelpList(scope.row)">查看帮扶人员</el-button>
            <el-button type="text" @click="getMoneyDetail(scope.row)">查看助学金明细</el-button>
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
          prop="student_name"
          label="姓名"
          width="150"
        />
        <el-table-column
          prop="student_number"
          label="学号"
        />
        <el-table-column
          prop="major"
          label="专业"
        />
        <el-table-column
          prop="audit_date"
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
      <el-table
        :data="tableDataThree"
        style="width: 100%"
        border
      >
        <el-table-column
          prop="id"
          label="序号"
          width="100"
        />
        <el-table-column
          prop="student_number"
          label="学号"
          width="100"
        />
        <el-table-column
          prop="student_name"
          label="姓名"
          width="100"
        />
        <el-table-column
          prop="education_level"
          label="培养层次"
          width="100"
        />
        <el-table-column
          prop="standard"
          label="发放标准"
          width="100"
        />
        <el-table-column
          prop="provide_status"
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
          prop="supply_again"
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
          prop="stipent_batch"
          label="批次"
          width="100"
        />
        <el-table-column
          prop="bank_card"
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
          prop="graduation_date"
          label="毕业日期"
          width="100"
        />
        <el-table-column
          prop="report_state"
          label="上报状态"
          width="100"
        />
      </el-table>
      <div class="fenye">
        <el-pagination
          small
          :current-page="currentPage3"
          page-size="5"
          layout="prev, pager, next"
          :total="tableDataThree.length"
          @current-change="handleCurrentChange3"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible2 = false">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getHelpHistory, getHelpHistoryByYear, getHelpPeopleList, getHelpMoneyDetails } from '@/api/helpMoneyManagement'
export default {
  name: 'FellowHistory',
  data() {
    return {
      dialogVisible1: false,
      dialogVisible2: false,
      type: '',
      currentPage: 1,
      currentPage2: 1,
      currentPage3: 1,
      pageSize: 5,
      tableDataOne: [],
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
  mounted() {
    this.getAllHistory()
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
    handleCurrentChange3(val) {
      this.currentPage3 = val
    },
    // 自己的方法
    getScholarshipDetail1: function() {
      this.dialogVisible1 = true
    },
    getScholarshipDetail2: function() {
      this.dialogVisible2 = true
    },
    getAllHistory: function() {
      getHelpHistory().then(response => {
        console.log('测试获取助学金历史')
        console.log(response.data)
        this.tableDataOne = response.data.data
      })
    },
    getHistoryByYear: function() {
      if (this.type === '') {
        this.$message({
          message: '未选择年份',
          type: 'warning'
        })
      } else {
        const prams = {
          year: this.type
        }
        getHelpHistoryByYear(prams).then(response => {
          console.log('测试年份获取助学金历史')
          console.log(response.data)
          this.tableDataOne = response.data.data
          this.$message({
            message: '搜索成功',
            type: 'success'
          })
        })
      }
    },
    getHelpList: function(row) {
      const prams = {
        stipentId: row.id
      }
      getHelpPeopleList(prams).then(response => {
        this.dialogVisible1 = true
        console.log('测试获取帮扶人员名单')
        console.log(response.data)
        this.tableDataTwo = response.data.data
      })
    },
    getMoneyDetail: function(row) {
      const prams = {
        stipentId: row.id
      }
      getHelpMoneyDetails(prams).then(response => {
        this.dialogVisible2 = true
        console.log('测试获取资金详情')
        console.log(response.data)
        this.tableDataThree = response.data.data
      })
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
