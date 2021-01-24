<template>
  <div class="app-container">
    <div class="button_head">
      <div class="button_container">
        <el-button type="primary" plain @click="openAddDialog">通知编辑</el-button>
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
            label="编号"
            width="100"
          >
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="通知标题"
            width="600"
          />
          <el-table-column
            prop="level"
            label="通知级别"
          />
          <el-table-column
            prop="publisher"
            label="发布人"
          />
          <el-table-column
            prop="createTime"
            label="编辑日期"
          />
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="getNoticeContent(scope.row)">查看正文</el-button>
              <el-button type="text" @click="releaseNotice(scope.row)">发布</el-button>
              <el-button type="text" @click="deleteNotice(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection()">通知批量发布</el-button>
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
      title="通知编辑"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="addForm" label-width="80px">
        <el-form-item label="通知标题">
          <el-input v-model="addForm.notice_title" />
        </el-form-item>
        <el-form-item label="通知正文">
          <el-input v-model="addForm.notice_content" :rows="10" type="textarea" />
        </el-form-item>
        <el-form-item label="通知级别">
          <el-select v-model="addForm.notice_level" placeholder="请选择通知级别">
            <el-option label="紧急" value="紧急" />
            <el-option label="重要" value="重要" />
            <el-option label="一般" value="一般" />
          </el-select>
        </el-form-item>
        <el-form-item label="编辑人">
          <el-input v-model="addForm.edit_people" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddNotice">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="通知正文"
      :visible.sync="dialogVisibleTwo"
      width="50%"
      :before-close="handleClose"
    >
      <p>{{ content }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisibleTwo = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getNoticeByStatus, addNewNotice, noticeStateEdit, noticeDelete } from '@/api/noticeManagement'
export default {
  name: 'DraftBoxIndex',
  data() {
    return {
      dialogVisible: false,
      dialogVisibleTwo: false,
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 5,
      addForm: {
        number: '',
        notice_title: '',
        notice_content: '',
        notice_level: '',
        release_date: '',
        edit_people: ''
      },
      content: ''
    }
  },
  mounted() {
    this.getAllDraftNotice()
  },
  methods: {
    toggleSelection(rows) {
      console.log(this.multipleSelection)
      for (const i in this.multipleSelection) {
        const prams = {
          id: this.multipleSelection[i].id,
          state: '1'
        }
        noticeStateEdit(prams).then(reponse => {
          console.log('测试发布')
          console.log(reponse.data)
          this.getAllDraftNotice()
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
      this.content = row.content
      this.dialogVisibleTwo = true
    },
    goDraftBox: function() {
      this.$router.push({ name: 'draftbox' })
    },
    openAddDialog: function() {
      this.dialogVisible = true
    },
    getAllDraftNotice: function() {
      const prams = {
        state: 0
      }
      getNoticeByStatus(prams).then(response => {
        console.log('测试获取当前所有的草稿通知')
        console.log(response.data.data)
        // this.tableData = response.data.data
        this.tableData = response.data.data
      })
    },
    confirmAddNotice: function() {
      const prams = {
        content: this.addForm.notice_content,
        level: this.addForm.notice_level,
        publisher: this.addForm.edit_people,
        state: '0',
        title: this.addForm.notice_title
      }
      console.log('测试参数')
      console.log(prams)
      addNewNotice(prams).then(response => {
        console.log('测试新增通知接口')
        console.log(response.data)
        this.$message({
          message: '新增成功',
          type: 'success'
        })
        this.dialogVisible = false
        this.getAllDraftNotice()
        this.addForm.notice_title = ''
        this.addForm.notice_content = ''
        this.addForm.notice_level = ''
        this.addForm.edit_people = ''
      })
    },
    deleteNotice: function(row) {
      this.$confirm('此操作将永久删除该通知, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const prams = {
          ids: row.id
        }
        console.log(prams)
        noticeDelete(prams).then(response => {
          console.log('测试删除')
          console.log(response.data)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getAllDraftNotice()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    releaseNotice: function(row) {
      const prams = {
        id: row.id,
        state: '1'
      }
      noticeStateEdit(prams).then(reponse => {
        console.log('测试发布')
        console.log(reponse.data)
        this.$message({
          message: '发布成功',
          type: 'success'
        })
        this.getAllDraftNotice()
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
