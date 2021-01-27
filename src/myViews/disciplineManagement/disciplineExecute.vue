<template>
  <div class="app-container">
    <div>
      <div class="input_head" style="display:inline-block">
        <!--        <span>姓名</span>-->
        <!--        <el-input v-model="input" placeholder="请输入内容" />-->
        <span>处分级别：</span>
        <el-select v-model="searchForm.level" placeholder="请选择处分级别">
          <el-option label="警告" value="一月" />
          <el-option label="严重警告" value="二月" />
          <el-option label="记过" value="三月" />
          <el-option label="留校察看" value="四月" />
          <el-option label="开除学籍" value="五月" />
        </el-select>
        <span>学院：</span>
        <el-select v-model="searchForm.major" placeholder="请选学院">
          <el-option label="医学影像技术学院" value="医学影像技术学院" />
          <el-option label="助产学院" value="助产学院" />
          <el-option label="中医学院" value="中医学院" />
          <el-option label="护理学院" value="护理学院" />
          <el-option label="医学检验学院" value="医学检验学院" />
          <el-option label="口腔医学院" value="口腔医学院" />
          <el-option label="临床医学院" value="临床医学院" />
          <el-option label="药学院" value="药学院" />
        </el-select>
        <span>姓名：</span>
        <el-input v-model="searchForm.name" placeholder="请输入姓名" style="width: 200px" />
      </div>
      <div class="button_container" style="display:inline-block">
        <el-button type="primary" @click="findSituationByCondition">搜索</el-button>
      </div>
      <div class="button_container" style="display:inline-block">
        <el-button type="primary" plain @click="openAddDialog">违纪申报</el-button>
      </div>
      <el-divider />
    </div>
    <div>
      <!--      table-->
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        stripe
      >
        <el-table-column
          prop="stuName"
          label="学生姓名"
          width="150"
        />
        <el-table-column
          prop="stuCode"
          label="学号"
          width="150"
        />
        <el-table-column
          prop="stuCollege"
          label="学院"
          width="150"
        />
        <el-table-column
          prop="punishLevel"
          label="处分级别"
          width="130"
        />
        <el-table-column
          prop="punishContent"
          label="处分内容"
        />
        <el-table-column
          prop="state"
          label="状态"
          width="150"
        />
        <el-table-column
          prop="punishTime"
          label="时间"
          width="150"
        />
        <el-table-column
          prop="punishPeople"
          label="处置人"
          width="150"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="cancelDis(scope.row)">取消处分</el-button>
          </template>
        </el-table-column>
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
            <el-input v-model="addForm.stuName" />
          </el-form-item>
          <el-form-item label="学生学号" style="display:inline-block">
            <el-input v-model="addForm.stuCode" />
          </el-form-item>
          <el-form-item label="所在学院" style="display:inline-block">
            <el-input v-model="addForm.stuCollege" />
          </el-form-item>
          <el-form-item label="处分级别" style="display:inline-block">
            <el-select v-model="addForm.punishLevel" placeholder="请选择处分级别">
              <el-option label="警告" value="警告" />
              <el-option label="严重警告" value="严重警告" />
              <el-option label="记过" value="记过" />
              <el-option label="留校察看" value="留校察看" />
              <el-option label="开除学籍" value="开除学籍" />
            </el-select>
          </el-form-item>
          <el-form-item label="处分内容">
            <el-input v-model="addForm.punishContent" :rows="10" type="textarea" />
          </el-form-item>
          <el-form-item label="处分状态">
            <el-select v-model="addForm.state" placeholder="请选择处分状态">
              <el-option label="有效" value="1" />
              <el-option label="无效" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="处置人" style="display:inline-block">
            <el-input v-model="addForm.punishPeople" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAddForm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getAllDisciplinaryData, addDisciplinarySituation, cancelDisciplinarySituation } from '@/api/disciplinaryManagement'
export default {
  name: 'DisciplineExcecute',
  data() {
    return {
      dialogVisible: false,
      searchForm: {
        name: '',
        major: '',
        level: ''
      },
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
        stuName: '',
        stuCode: '',
        stuCollege: '',
        punishLevel: '',
        punishContent: '',
        state: '',
        stuGrade: '',
        punishPeople: ''
      }
    }
  },
  mounted() {
    this.getAllData()
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
    },
    // 接下来是对接口的方法
    getAllData: function() {
      getAllDisciplinaryData().then(response => {
        console.log('违纪处分执行测试接口')
        console.log(response.data)
        this.tableData = response.data.data
      })
    },
    submitAddForm: function() {
      console.log('测试addForm')
      console.log(this.addForm)
      if (this.addForm.stuName === '' || this.addForm.stuCode === '' || this.addForm.stuCollege === '' || this.addForm.punishLevel === '' || this.addForm.punishContent === '' || this.addForm.state === '' || this.addForm.punishPeople === '') {
        this.$message({
          message: '处分执行内容未填写完整',
          type: 'warning'
        })
      } else {
        addDisciplinarySituation(this.addForm).then(response => {
          console.log('测试新增违纪')
          console.log(response.data)
          this.getAllData()
          this.$message({
            message: '违纪处分执行完成',
            type: 'success'
          })
          this.addForm.stuName = ''
          this.addForm.stuCode = ''
          this.addForm.stuCollege = ''
          this.addForm.punishLevel = ''
          this.addForm.punishContent = ''
          this.addForm.state = ''
          this.addForm.punishPeople = ''
          this.dialogVisible = false
        })
      }
    },
    cancelDis: function(row) {
      this.$confirm('此操作取消该处分?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const prams = {
          ids: row.id
        }
        cancelDisciplinarySituation(prams).then(response => {
          this.$message({
            type: 'success',
            message: '取消处分成功'
          })
          this.getAllData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '结束操作'
        })
      })
    },
    findSituationByCondition: function() {
      console.log('测试违纪搜索')
      const prams = {
        stuName: this.searchForm.name,
        punishLevel: this.searchForm.level,
        stuCollege: this.searchForm.major
      }
      getAllDisciplinaryData(prams).then(response => {
        console.log('获取结果')
        console.log(response.data)
        this.tableData = response.data.data
      })
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
.input_head span {
  font-size: 15px;
  font-weight: bold;
}
</style>
