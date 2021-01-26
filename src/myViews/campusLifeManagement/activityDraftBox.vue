<template>
  <div class="app-container">
    <div class="button_head">
      <div class="button_container">
        <el-button type="primary" plain @click="openAddDialog">活动信息编辑</el-button>
      </div>
      <el-divider />
    </div>
    <div class="main_table">
      <div class="table_container">
        <el-table
          ref="multipleTable"
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            label="活动编号"
            width="100"
          >
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column
            prop="activityName"
            label="活动名称"
            width="600"
          />
          <el-table-column
            prop="activityType"
            label="活动类型"
          />
          <el-table-column
            prop="activityDepartment"
            label="组织人或组织部门"
          />
          <el-table-column
            prop="activityDate"
            label="活动日期"
          />
          <el-table-column
            prop="publisher"
            label="发布人"
          />
          <el-table-column
            prop="releaseDate"
            label="发布日期"
          />
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="getNoticeContent(scope.row)">查看活动内容</el-button>
              <el-button type="text" @click="deleteActivity(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection()">活动发布</el-button>
        </div>
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
    <el-dialog
      title="活动信息编辑"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="addForm" label-width="80px">
        <!--        <el-form-item label="活动编号">-->
        <!--          <el-input v-model="addForm.number" />-->
        <!--        </el-form-item>-->
        <el-form-item label="活动名称">
          <el-input v-model="addForm.activityName" />
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select v-model="addForm.activityType" placeholder="请选择活动类型">
            <el-option label="体育类" value="体育类" />
            <el-option label="文化类" value="文化类" />
            <el-option label="创业类" value="创业类" />
            <el-option label="学术类" value="学术类" />
            <el-option label="科技类" value="科技类" />
          </el-select>
        </el-form-item>
        <el-form-item label="组织人或组织部门">
          <el-input v-model="addForm.activityDepartment" />
        </el-form-item>
        <el-form-item label="活动内容">
          <el-input v-model="addForm.activityContent" :rows="10" type="textarea" />
        </el-form-item>
        <el-form-item label="活动日期">
          <el-col :span="11">
            <el-date-picker v-model="addForm.activityDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="发布人">
          <el-input v-model="addForm.publisher" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitNewActivity">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="活动内容"
      :visible.sync="dialogVisibleTwo"
      width="50%"
      :before-close="handleClose"
    >
      <p>{{ activityContent }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisibleTwo = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getActivityData, addNewActivity, deleteActivityInDraft, changeActivityState } from '@/api/schoolLifeManagement'
export default {
  name: 'ActivityDraftBox',
  data() {
    return {
      activityContent: '',
      dialogVisible: false,
      dialogVisibleTwo: false,
      tableData: [
        {
          number: '00001',
          notice_title: '通知标题测试',
          notice_leve: '重要',
          release_people: '杨启航',
          edit_date: '2021-01-19',
          browse_num: '34',
          content: '343434343434343434343434343'
        }, {
          number: '00001',
          notice_title: '通知标题测试',
          notice_leve: '重要',
          release_people: '杨启航',
          edit_date: '2021-01-19',
          browse_num: '34'
        }, {
          number: '00001',
          notice_title: '通知标题测试',
          notice_leve: '重要',
          release_people: '杨启航',
          edit_date: '2021-01-19',
          browse_num: '34'
        }, {
          number: '00001',
          notice_title: '通知标题测试',
          notice_leve: '重要',
          release_people: '杨启航',
          edit_date: '2021-01-19',
          browse_num: '34'
        }, {
          number: '00001',
          notice_title: '通知标题测试',
          notice_leve: '重要',
          release_people: '杨启航',
          edit_date: '2021-01-19',
          browse_num: '34'
        }, {
          number: '00001',
          notice_title: '通知标题测试',
          notice_leve: '重要',
          release_people: '杨启航',
          edit_date: '2021-01-19',
          browse_num: '34'
        }],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 5,
      addForm: {
        activityName: '',
        activityType: '',
        activityDepartment: '',
        activityContent: '',
        activityDate: '',
        publisher: '',
        state: '0'
      }
    }
  },
  mounted() {
    this.getDraftData()
  },
  methods: {
    toggleSelection(rows) {
      for (const i in this.multipleSelection) {
        const prams = {
          id: this.multipleSelection[i].id,
          state: '1'
        }
        changeActivityState(prams).then(reponse => {
          console.log('活动测试发布')
          console.log(reponse.data)
          this.getDraftData()
        })
      }
      this.$message({
        message: '发布成功',
        type: 'success'
      })
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
      console.log(this.multipleSelection)
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
    // 接下来是自己写的方法
    getNoticeContent: function(row) {
      console.log(row)
      this.activityContent = row.activityContent
      this.dialogVisibleTwo = true
    },
    goDraftBox: function() {
      this.$router.push({ name: 'draftbox' })
    },
    openAddDialog: function() {
      this.dialogVisible = true
    },
    getDraftData: function() {
      const prams = {
        state: '0'
      }
      getActivityData(prams).then(response => {
        console.log('获取当前草稿箱里的活动')
        console.log(response.data)
        this.tableData = response.data.data
      })
    },
    submitNewActivity: function() {
      if (this.addForm.activityContent === '' || this.addForm.activityDate === '' || this.addForm.activityDepartment === '' || this.addForm.activityName === '' || this.addForm.activityType === '' || this.addForm.publisher === '') {
        this.$message({
          message: '新增活动内容未填写完整',
          type: 'warning'
        })
      } else {
        addNewActivity(this.addForm).then(response => {
          console.log('测试新增活动')
          console.log(response.data)
          this.getDraftData()
          this.$message({
            message: '新增活动完成',
            type: 'success'
          })
          this.addForm.activityContent = ''
          this.addForm.activityDate = ''
          this.addForm.activityDepartment = ''
          this.addForm.activityName = ''
          this.addForm.publisher = ''
          this.addForm.activityType = ''
          this.dialogVisible = false
        })
      }
    },
    deleteActivity: function(row) {
      const prams = {
        ids: row.id
      }
      deleteActivityInDraft(prams).then(response => {
        console.log('测试活动删除')
        console.log(response.data)
        this.getDraftData()
        this.$message({
          message: '删除活动完成',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>
.button_container{
  text-align: right;
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
</style>
