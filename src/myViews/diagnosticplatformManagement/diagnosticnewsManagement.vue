<template>
  <div class="app-container">
    <div class="button_head">
      <div class="button_container">
        <el-button type="primary" plain @click="goDraftBox">草稿箱</el-button>
      </div>
      <el-divider />
    </div>
    <div class="main_table">
      <div class="main_title">
        <span>诊改平台当前展示通知：</span>
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
            <template slot-scope="scope">{{ scope.row.number }}</template>
          </el-table-column>
          <el-table-column
            prop="notice_title"
            label="通知标题"
            width="600"
          />
          <el-table-column
            prop="notice_leve"
            label="通知级别"
          />
          <el-table-column
            prop="release_people"
            label="发布人"
          />
          <el-table-column
            prop="release_date"
            label="发布日期"
          />
          <el-table-column
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="getNoticeContent(scope.row)">查看正文</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection()">取消通知</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      title="通知正文"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <p>这是一段信息</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'DiagnosticnewsManagement',
  data() {
    return {
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
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 接下来是自己写的方法
    goDraftBox: function() {
      this.$router.push({ name: 'draftbox' })
    },
    getNoticeContent: function(row) {
      this.dialogVisible = true
      console.log(row)
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

