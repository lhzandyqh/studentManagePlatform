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
            <template slot-scope="scope">{{ scope.row.number }}</template>
          </el-table-column>
          <el-table-column
            prop="notice_title"
            label="活动名称"
            width="600"
          />
          <el-table-column
            prop="notice_leve"
            label="活动类型"
          />
          <el-table-column
            prop="release_people"
            label="组织人或组织部门"
          />
          <el-table-column
            prop="edit_date"
            label="活动日期"
          />
          <el-table-column
            prop="release_people"
            label="发布人"
          />
          <el-table-column
            prop="edit_date"
            label="发布日期"
          />
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="getNoticeContent(scope.row)">查看正文</el-button>
              <el-button type="text" @click="getNoticeContent(scope.row)">删除</el-button>
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
        <el-form-item label="活动编号">
          <el-input v-model="addForm.number" />
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="addForm.notice_title" />
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select v-model="addForm.notice_level" placeholder="请选择通知级别">
            <el-option label="紧急" value="紧急" />
            <el-option label="重要" value="重要" />
            <el-option label="一般" value="一般" />
          </el-select>
        </el-form-item>
        <el-form-item label="组织人或组织部门">
          <el-input v-model="addForm.notice_title" />
        </el-form-item>
        <el-form-item label="活动内容">
          <el-input v-model="addForm.notice_content" :rows="10" type="textarea" />
        </el-form-item>
        <el-form-item label="活动日期">
          <el-col :span="11">
            <el-date-picker v-model="addForm.release_date" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="发布人">
          <el-input v-model="addForm.number" />
        </el-form-item>
        <el-form-item label="发布日期">
          <el-col :span="11">
            <el-date-picker v-model="addForm.release_date" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%;" />
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="通知正文"
      :visible.sync="dialogVisibleTwo"
      width="50%"
      :before-close="handleClose"
    >
      <p>通知正文</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisibleTwo = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ActivityDraftBox',
  data() {
    return {
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
        number: '',
        notice_title: '',
        notice_content: '',
        notice_level: '',
        release_date: ''
      }
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
      this.dialogVisibleTwo = true
    },
    goDraftBox: function() {
      this.$router.push({ name: 'draftbox' })
    },
    openAddDialog: function() {
      this.dialogVisible = true
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
