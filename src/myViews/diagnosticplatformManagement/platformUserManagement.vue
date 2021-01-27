<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="教师用户" name="first">
        <div class="button_head">
          <div class="button_head clearfix">
            <div class="search_container">
              <el-input v-model="type" style="width: 250px" placeholder="请输入用户姓名或工号" />
              <el-button type="primary">搜索</el-button>
            </div>
            <div class="button_container">
              <el-button type="primary" plain @click="openImportDialog">批量新增用户</el-button>
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
                label="序号"
                width="70px"
              >
                <template slot-scope="scope">
                  {{ scope.$index+1 }}
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180"
              />
              <el-table-column
                prop="number"
                label="工号"
              />
              <el-table-column
                prop="dept"
                label="部门"
              />
              <el-table-column
                prop="type"
                label="账号类型"
              />
              <el-table-column
                prop="create_date"
                label="账号创建日期"
              />
              <el-table-column
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button type="text" @click="permissionSet(scope.row)">权限设置</el-button>
                  <el-button type="text" @click="passwordReset(scope.row)">密码重置</el-button>
                  <el-button type="text" @click="userLoggedOff(scope.row)">账户注销</el-button>
                </template>
              </el-table-column>
            </el-table>
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
        <el-dialog
          title="批量新增"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <el-form ref="form" :model="addForm" label-width="100px">
            <el-form-item label="用户上传:">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">建议上传Excel文件</div>
              </el-upload>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAddNotice">文件解析</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="诊改平台权限设置"
          :visible.sync="dialogVisibleTwo"
          width="40%"
          :before-close="handleClose"
        >
          <el-form ref="form" :model="addForm" label-width="150px">
            <el-form-item label="账号可进入平台:">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="内部质量管理平台" />
                <el-checkbox label="教师发展平台" />
                <el-checkbox label="专业发展平台" />
                <el-checkbox label="资产管理平台" />
                <el-checkbox label="科研管理平台" />
                <el-checkbox label="在线OA平台" />
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleTwo = false">取 消</el-button>
            <el-button type="primary" @click="confirmAddNotice">确 定</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="学生用户" name="second">
        <div class="button_head">
          <div class="button_head clearfix">
            <div class="search_container">
              <el-input v-model="type" style="width: 250px" placeholder="请输入用户姓名或学号" />
              <el-button type="primary">搜索</el-button>
            </div>
            <div class="button_container">
              <el-button type="primary" plain @click="openImportDialogTwo">批量新增用户</el-button>
              <el-button type="text" @click="downloadStudentFile">上传模板下载</el-button>
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
                label="序号"
                width="70px"
              >
                <template slot-scope="scope">
                  {{ scope.$index+1 }}
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180"
              />
              <el-table-column
                prop="number"
                label="学号"
              />
              <el-table-column
                prop="dept"
                label="学院"
              />
              <el-table-column
                prop="type"
                label="账号类型"
              />
              <el-table-column
                prop="create_date"
                label="账号创建日期"
              />
              <el-table-column
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button type="text" @click="passwordReset(scope.row)">密码重置</el-button>
                  <el-button type="text" @click="userLoggedOff(scope.row)">账户注销</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="fenye">
            <el-pagination
              :current-page="currentPage2"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize2"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableDataTwo.length"
              @size-change="handleSizeChangeTwo"
              @current-change="handleCurrentChangeTwo"
            />
          </div>
          <el-dialog
            title="学生用户批量新增"
            :visible.sync="dialogVisibleFour"
            width="30%"
            :before-close="handleClose"
          >
            <el-form ref="form" :model="addForm" label-width="100px">
              <el-form-item label="用户上传:">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">建议上传Excel文件</div>
                </el-upload>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirmAddNotice">文件解析</el-button>
            </span>
          </el-dialog>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'PlatformUserManagement',
  data() {
    return {
      activeName: 'first',
      dialogVisible: false,
      dialogVisibleTwo: false,
      dialogVisibleThree: false,
      dialogVisibleFour: false,
      currentPage: 1,
      pageSize: 5,
      currentPage2: 1,
      pageSize2: 5,
      tableData: [
        {
          name: '杨老师',
          number: '519731',
          dept: '教务处',
          type: '管理员',
          create_date: '2020-08-12'
        }
      ],
      tableDataTwo: [
        {
          name: '杨同学',
          number: '519731',
          dept: '护理学院',
          type: '普通',
          create_date: '2020-08-12'
        }
      ],
      addForm: {},
      fileList: [],
      checkList: []
    }
  },
  methods: {
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleSizeChangeTwo(val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChangeTwo(val) {
      this.currentPage = val
    },
    openImportDialog: function() {
      this.dialogVisible = true
    },
    openImportDialogTwo: function() {
      this.dialogVisibleFour = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 自己写的方法
    permissionSet: function() {
      this.dialogVisibleTwo = true
    },
    passwordReset: function() {
      this.$confirm('此操作将该账号的密码重置为123456?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '重置成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        })
      })
    },
    userLoggedOff: function() {
      this.$confirm('此操作将该账号永久注销', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '注销成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消注销'
        })
      })
    },
    downloadStudentFile: function() {
      var url = 'http://zhongkeruitong.top/zgplatform-management/%E5%AD%A6%E7%94%9F%E8%A1%A8.xlsx'
      window.open(url)
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
.left_control{
  /*margin-left: 10%;*/
  text-align: center;
}
</style>
