<template>
  <div class="app-container">
    <div class="button_head clearfix">
      <div class="search_container">
        <el-select v-model="type" placeholder="请选择类型">
          <el-option label="待开始" value="待开始" />
          <el-option label="申请中" value="申请中" />
          <el-option label="已结束" value="已结束" />
        </el-select>
        <el-button type="primary" @click="findScholarship">搜索</el-button>
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
          prop="applyObject"
          label="可申请人"
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
          label="申请状态"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.scholarshipStatus === '待开始'" type="info">待开始</el-tag>
            <el-tag v-if="scope.row.scholarshipStatus === '申请中'">申请中</el-tag>
            <el-tag v-if="scope.row.scholarshipStatus === '已结束'" type="warning">已结束</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="getContent(scope.row)">查看申请要求</el-button>
            <el-button v-if="scope.row.scholarshipStatus === '待开始'" type="text" @click="changeStatus(scope.row,'申请中')">开始</el-button>
            <el-button v-else type="text" disabled>开始</el-button>
            <el-button v-if="scope.row.scholarshipStatus === '申请中'" type="text" @click="changeStatus(scope.row,'已结束')">结束</el-button>
            <el-button v-else type="text" disabled>结束</el-button>
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
          <el-input v-model="addForm.scholarshipName" />
        </el-form-item>
        <el-form-item label="奖学金年度">
          <el-input v-model="addForm.applyYear" />
        </el-form-item>
        <el-form-item label="级别">
          <el-select v-model="addForm.scholarshipLevel" placeholder="请选择通知级别">
            <el-option label="国家级" value="国家级" />
            <el-option label="省级" value="省级" />
            <el-option label="市级" value="市级" />
            <el-option label="校级" value="校级" />
            <el-option label="冠名奖学金" value="冠名奖学金" />
          </el-select>
        </el-form-item>
        <el-form-item label="申请要求">
          <el-input v-model="addForm.applyRequirements" :rows="10" type="textarea" />
        </el-form-item>
        <el-form-item label="可申请人">
          <el-select v-model="addForm.applyObject" placeholder="请选择通知级别">
            <el-option label="大一" value="大一" />
            <el-option label="大二" value="大二" />
            <el-option label="大三" value="大三" />
            <el-option label="大四" value="大四" />
            <el-option label="所有" value="所有" />
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-col :span="11">
            <el-date-picker v-model="addForm.startDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-col :span="11">
            <el-date-picker v-model="addForm.endDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;" />
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd('待开始')">暂不可申请</el-button>
        <el-button type="primary" @click="confirmAdd('申请中')">可申请</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="申请要求"
      :visible.sync="dialogVisibleTwo"
      width="50%"
      :before-close="handleClose"
    >
      <p>{{ applyRequirements }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisibleTwo = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllScholarshipData, addNewScholarshipProject, editScholarshipStatus, queryScholarshipByCondition } from '@/api/scholarshipManagement'
export default {
  name: 'InfoManage',
  data() {
    return {
      dialogVisible: false,
      dialogVisibleTwo: false,
      currentPage: 1,
      pageSize: 5,
      type: '',
      applyRequirements: '',
      addForm: {
        scholarshipName: '',
        applyYear: '',
        scholarshipLevel: '',
        applyRequirements: '',
        applyObject: '',
        startDate: '',
        endDate: '',
        scholarshipStatus: ''
      },
      tableData: []
    }
  },
  mounted() {
    this.getAllData()
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
      this.applyRequirements = row.applyRequirements
      this.dialogVisibleTwo = true
    },
    getAllData: function() {
      getAllScholarshipData().then(response => {
        console.log('测试获取所有的奖学金项目信息')
        console.log(response.data)
        this.tableData = response.data.data
      })
    },
    confirmAdd: function(status) {
      if (this.addForm.scholarshipName === '' || this.addForm.applyYear === '' || this.addForm.scholarshipLevel === '' || this.addForm.applyRequirements === '' || this.addForm.applyObject === '' || this.addForm.startDate === '' || this.addForm.endDate === '') {
        this.$message({
          message: '奖学金项目信息未填写完整',
          type: 'warning'
        })
      } else {
        this.addForm.scholarshipStatus = status
        addNewScholarshipProject(this.addForm).then(response => {
          console.log('测试奖学金项目增加接口')
          console.log(response.data)
          this.getAllData()
          this.dialogVisible = false
          this.$message({
            message: '新增奖学金项目成功',
            type: 'success'
          })
          this.addForm.scholarshipName = ''
          this.addForm.applyYear = ''
          this.addForm.scholarshipLevel = ''
          this.addForm.applyRequirements = ''
          this.addForm.applyObject = ''
          this.addForm.startDate = ''
          this.addForm.endDate = ''
        })
      }
    },
    changeStatus: function(row, status) {
      if (status === '申请中') {
        this.$confirm('该奖学金项目将可申请', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const prams = {
            id: row.id,
            scholarshipStatus: status
          }
          editScholarshipStatus(prams).then(response => {
            console.log('测试奖学金开始')
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getAllData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          })
        })
      } else {
        this.$confirm('该奖学金项目申请结束', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const prams = {
            id: row.id,
            scholarshipStatus: status
          }
          editScholarshipStatus(prams).then(response => {
            console.log('测试奖学金结束')
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getAllData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          })
        })
      }
    },
    findScholarship: function() {
      if (this.type === '') {
        this.$message({
          message: '未选择搜索条件',
          type: 'warning'
        })
      } else {
        const prams = {
          applyStatus: this.type
        }
        queryScholarshipByCondition(prams).then(response => {
          console.log('测试根据条件搜索奖学金接口')
          console.log(response.data)
          this.tableData = response.data.data
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
</style>
