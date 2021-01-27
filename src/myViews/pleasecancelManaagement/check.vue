<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <div class="select" style="display:inline-block">
          <template>
            <el-select v-model="value" placeholder="请选择请假类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </div>
        <!--        <div class="block" style="display:inline-block">-->
        <!--          <span class="demonstration">请选择请假时间段</span>-->
        <!--          <el-date-picker-->
        <!--            v-model="value1"-->
        <!--            type="datetimerange"-->
        <!--            range-separator="至"-->
        <!--            start-placeholder="开始日期"-->
        <!--            end-placeholder="结束日期"-->
        <!--          />-->
        <!--        </div>-->
        <el-button type="primary" @click="getListByType">搜索</el-button>
      </el-header>
    </el-container>
    <el-divider />
    <!--      table-->
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        stripe
        style="width:100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          prop="id"
          label="序号"
        />
        <el-table-column
          prop="leaveType"
          label="请假类型"
        />
        <el-table-column
          prop="stuName"
          label="请假人"
        />
        <el-table-column
          prop="stuCollege"
          label="学院"
        />
        <el-table-column
          prop="stuId"
          label="学号"
        />
        <el-table-column
          prop="startDate"
          label="开始时间"
        />
        <el-table-column
          prop="endDate"
          label="结束时间"
        />
        <el-table-column
          prop="checkStatus"
          label="审核状态"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="getNoticeContent(scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="审核"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <span class="audit_title">请假事由</span>
        <el-divider />
        <p>{{ leaveReason }}</p>
        <!--        <span class="audit_title">附件</span>-->
        <!--        <el-divider />-->
        <!--        <el-carousel trigger="click" height="200px">-->
        <!--          <el-carousel-item v-for="(src,item) in imgs" :key="item">-->
        <!--            <img :src="src" style="max-width: 100%;max-height: 100%;display: block; margin: 0 auto;">-->
        <!--          </el-carousel-item>-->
        <!--        </el-carousel>-->
        <div class="foot" style="text-align: center;margin-top: 30px">
          <el-button type="success" size="small" plain @click="confirmAuditing('通过')">通过</el-button>
          <el-button type="danger" size="small" plain @click="confirmAuditing('未通过')">未通过</el-button>
          <el-button type="primary" size="small" plain @click="dialogVisible = false">关闭</el-button>
        </div>
      </el-dialog>
      <!--      分页-->
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
  </div>
</template>

<script>
import { getAllAuditingList, getAuditingListByType, auditingLeaveList } from '@/api/leaveManagement'
export default {
  name: 'Check',
  data() {
    return {
      leaveReason: '',
      dialogVisible: false,
      radio1: '1',
      options: [{
        value: '事假',
        label: '事假'
      }, {
        value: '病假',
        label: '病假'
      }],
      value: '',
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 5,
      auditingId: ''
    }
  },
  mounted() {
    this.getAllList()
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    getNoticeContent: function(row) {
      this.dialogVisible = true
      console.log(row)
      this.leaveReason = row.leaveReason
      this.auditingId = row.id
    },
    openAddDialog: function() {
      this.dialogVisible = true
    },
    getAllList: function() {
      getAllAuditingList().then(response => {
        console.log('测试获取所有的待审核列表')
        console.log(response.data)
        this.tableData = response.data.data
      })
    },
    getListByType: function() {
      if (this.value === '') {
        this.$message({
          message: '未选择请假类别',
          type: 'warning'
        })
      } else {
        const prams = {
          leaveType: this.value
        }
        getAuditingListByType(prams).then(response => {
          console.log('测试根据条件获取待审核列表')
          console.log(response.data)
          this.tableData = response.data.data
          this.$message({
            message: '搜索成功',
            type: 'success'
          })
        })
      }
    },
    confirmAuditing: function(status) {
      const prams = {
        id: this.auditingId,
        checkStatus: status
      }
      auditingLeaveList(prams).then(response => {
        console.log('测试审核接口')
        console.log(response.data)
        this.dialogVisible = false
        this.getAllList()
        this.$message({
          message: '审核完成',
          type: 'success'
        })
      })
    }
  }
}
</script>
<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: left;
  line-height: 60px;
}
.fenye {
  text-align: center;
  margin-top: 20px;
}
.audit_title {
  font-weight: bold;
}
.foot{
  text-align: center;
  margin-top: 20px;
}
</style>
