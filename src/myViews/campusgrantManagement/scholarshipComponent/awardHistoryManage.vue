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
        </el-select>
        <el-button type="primary" @click="searchHistoryByYears">搜索</el-button>
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
          prop="id"
          label="编号"
          width="100"
        />
        <el-table-column
          prop="scholarshipName"
          label="奖学金名称"
        />
        <el-table-column
          prop="applyYear"
          label="年度"
        />
        <el-table-column
          prop="scholarshipLevel"
          label="级别"
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
            <el-button type="text" @click="getScholarshipDetail(scope.row)">查看获奖人员</el-button>
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
          :total="tableData.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-dialog
      title="获奖人员"
      :visible.sync="dialogVisible"
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
          width="180"
        />
        <el-table-column
          prop="student_number"
          label="学号"
          width="180"
        />
        <el-table-column
          prop="major"
          label="专业"
        />
        <el-table-column
          prop="audit_date"
          label="获奖日期"
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
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getScholarshipHistory, getScholarshipHistoryByYears, getScholarshipPeopleList } from '@/api/scholarshipManagement'
export default {
  name: 'AwardHistoryManage',
  data() {
    return {
      dialogVisible: false,
      type: '',
      currentPage: 1,
      currentPage2: 1,
      pageSize: 5,
      tableData: [],
      tableDataTwo: []
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
    // 自己的方法
    getScholarshipDetail: function(row) {
      this.dialogVisible = true
      const prams = {
        scholarshipId: row.id
      }
      getScholarshipPeopleList(prams).then(response => {
        console.log('测试获取奖学金获奖人员名单')
        console.log(response.data)
        this.tableDataTwo = response.data.data
      })
    },
    getAllHistory: function() {
      getScholarshipHistory().then(response => {
        console.log('测试获取所有的历史')
        console.log(response.data)
        this.tableData = response.data.data
      })
    },
    searchHistoryByYears: function() {
      if (this.type === '') {
        this.$message({
          message: '未选择查询条件',
          type: 'warning'
        })
      } else {
        const prams = {
          year: this.type
        }
        getScholarshipHistoryByYears(prams).then(response => {
          console.log('测试根据年份获取历史接口')
          console.log(response.data)
          this.tableData = response.data.data
          this.$message({
            message: '查询成功',
            type: 'success'
          })
        })
      }
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
