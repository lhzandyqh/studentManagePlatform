<template>
  <div class="app-container">
    <div>
      <div class="input_head" style="display:inline-block">
        <el-input v-model="input" placeholder="请输入内容" />
      </div>
      <div class="button_container" style="display:inline-block">
        <el-button type="primary">搜索</el-button>
      </div>
      <div class="button_container" style="display:inline-block">
        <el-button type="primary" plain @click="openAddDialog">违纪申报</el-button>
      </div>
      <el-divider />
    </div>
    <div>
      <!--      table-->
      <el-table
        ref="multipleTable"
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        tooltip-effect="dark"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          prop="name"
          label="学生姓名"
          width="150"
        />
        <el-table-column
          prop="number"
          label="学号"
          width="150"
        />
        <el-table-column
          prop="academy"
          label="学院"
          width="150"
        />
        <el-table-column
          prop="level"
          label="处分级别"
          width="130"
        />
        <el-table-column
          prop="content"
          label="处分内容"
        />
        <el-table-column
          prop="state"
          label="状态"
          width="150"
        />
        <el-table-column
          prop="date"
          label="时间"
          width="150"
        />
        <el-table-column
          prop="disponer"
          label="处置人"
          width="150"
        />
      </el-table>
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
      <!--      form表单-->
      <el-dialog
        title="违纪申报"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <el-form ref="form" :model="addForm" label-width="80px">
          <el-form-item label="学生姓名" style="display:inline-block">
            <el-input v-model="addForm.notice_name" />
          </el-form-item>
          <el-form-item label="学生学号" style="display:inline-block">
            <el-input v-model="addForm.notice_number" />
          </el-form-item>
          <el-form-item label="所在学院" style="display:inline-block">
            <el-input v-model="addForm.notice_academy" />
          </el-form-item>
          <el-form-item label="处分级别" style="display:inline-block">
            <el-select v-model="addForm.notice_level1" placeholder="请选择处分级别">
              <el-option label="紧急" value="紧急" />
              <el-option label="重要" value="重要" />
              <el-option label="一般" value="一般" />
            </el-select>
          </el-form-item>
          <el-form-item label="处分内容">
            <el-input v-model="addForm.notice_content" :rows="10" type="textarea" />
          </el-form-item>
          <el-form-item label="处分状态">
            <el-select v-model="addForm.notice_level2" placeholder="请选择处分状态">
              <el-option label="有效" value="有效" />
              <el-option label="无效" value="无效" />
            </el-select>
          </el-form-item>
          <el-form-item label="处分时间">
            <el-col :span="11">
              <el-date-picker v-model="addForm.notice_date" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%;" />
            </el-col>
          </el-form-item>
          <el-form-item label="处置人" style="display:inline-block">
            <el-input v-model="addForm.notice_disponer" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DisciplineExcecute',
  data() {
    return {
      dialogVisible: false,
      tableData:
        [
          {
            name: '王小虎',
            number: '001',
            academy: '法学院',
            level: '1',
            content: '123456789',
            state: '有效',
            date: '2021.1.20',
            disponer: '张老师'
          }, {
            name: '王小虎',
            number: '001',
            academy: '法学院',
            level: '1',
            content: '123456789',
            state: '有效',
            date: '2021.1.20',
            disponer: '张老师'
          }, {
            name: '王小虎',
            number: '001',
            academy: '法学院',
            level: '1',
            content: '123456789',
            state: '有效',
            date: '2021.1.20',
            disponer: '张老师'
          }, {
            name: '王小虎',
            number: '001',
            academy: '法学院',
            level: '1',
            content: '123456789',
            state: '有效',
            date: '2021.1.20',
            disponer: '张老师'
          }, {
            name: '王小虎',
            number: '001',
            academy: '法学院',
            level: '1',
            content: '123456789',
            state: '有效',
            date: '2021.1.20',
            disponer: '张老师'
          }, {
            name: '王小虎',
            number: '001',
            academy: '法学院',
            level: '1',
            content: '123456789',
            state: '有效',
            date: '2021.1.20',
            disponer: '张老师'
          }
        ],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 5,
      addForm: {
        notice_name: '',
        notice_number: '',
        notice_academy: '',
        notice_level1: '',
        notice_content: '',
        notice_level2: '',
        notice_date: '',
        notice_disponer: ''
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
    openAddDialog: function() {
      this.dialogVisible = true
    }
  }
}
</script>
<style scoped>
.button_container {
  margin-left:0px;
  margin-top:20px;
  width:100px;
}
.main_title span {
  font-size: 15px;
  font-weight: bold;
  color: #666666;
}
.fenye {
  text-align: center;
  margin-top: 20px;
}
</style>
