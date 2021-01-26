<template>
  <div class="app-container">
    <div class="button_head">
      <div class="button_container">
        <el-button type="primary" plain @click="goDraftBox">活动草稿箱</el-button>
      </div>
      <el-divider />
    </div>
    <div class="main_table">
      <div class="main_title">
        <span>学生发展平台当前展示活动：</span>
      </div>
      <div class="table_container">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            label="编号"
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
            width="100"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="getNoticeContent(scope.row)">查看活动内容</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection()">取消发布</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      title="活动内容"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <p>{{ activityContent }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getActivityData, changeActivityState } from '@/api/schoolLifeManagement'
export default {
  name: 'Index',
  data() {
    return {
      activityContent: '',
      dialogVisible: false,
      tableData: [
        {
          number: '00001',
          notice_title: '通知标题测试',
          notice_leve: '重要',
          release_people: '杨启航',
          release_date: '2021-01-19',
          browse_num: '34',
          content: '343434343434343434343434343'
        }, {
          number: '00001',
          notice_title: '通知标题测试',
          notice_leve: '重要',
          release_people: '杨启航',
          release_date: '2021-01-19',
          browse_num: '34'
        }],
      multipleSelection: []
    }
  },
  mounted() {
    this.getShowNowData()
  },
  methods: {
    toggleSelection(rows) {
      for (const i in this.multipleSelection) {
        const prams = {
          id: this.multipleSelection[i].id,
          state: '2'
        }
        changeActivityState(prams).then(reponse => {
          console.log('测试活动批量取消发布')
          console.log(reponse.data)
          this.getShowNowData()
        })
      }
      this.$message({
        message: '批量取消发布成功',
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
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 接下来是自己写的方法
    goDraftBox: function() {
      this.$router.push({ name: 'activitydraft' })
    },
    getNoticeContent: function(row) {
      this.dialogVisible = true
      this.activityContent = row.activityContent
      console.log(row)
    },
    getShowNowData: function() {
      const prams = {
        state: '1'
      }
      getActivityData(prams).then(response => {
        console.log('获取当前正在展示的活动')
        console.log(response.data)
        this.tableData = response.data.data
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
</style>
