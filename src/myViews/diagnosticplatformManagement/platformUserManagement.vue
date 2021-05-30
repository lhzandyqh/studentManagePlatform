<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="教师用户" name="first">
        <div class="button_head">
          <div class="button_head clearfix">
            <div class="search_container">
              <span>姓名：</span>
              <el-input v-model="teaSeaForm.teaName" style="width: 150px" placeholder="请输入用户姓名" />
              <span>工号：</span>
              <el-input v-model="teaSeaForm.teaUsername" style="width: 150px" placeholder="请输入用户工号" />
              <span>部门：</span>
              <el-input v-model="teaSeaForm.dept" style="width: 150px" placeholder="请输入用户部门" />
              <el-button type="primary" @click="searchTeacher">搜索</el-button>
            </div>
            <div class="button_container">
              <el-button type="primary" plain @click="openImportDialog">批量新增用户</el-button>
              <el-button type="text" @click="downloadStudentFileTwo">上传模板下载</el-button>
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
                prop="teaName"
                label="姓名"
                width="180"
              />
              <el-table-column
                prop="teaUsername"
                label="工号"
              />
              <el-table-column
                prop="dept"
                label="部门"
              />
              <!--              <el-table-column-->
              <!--                prop="type"-->
              <!--                label="账号类型"-->
              <!--              />-->
              <!--              <el-table-column-->
              <!--                prop="create_date"-->
              <!--                label="账号创建日期"-->
              <!--              />-->
              <el-table-column
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button type="text" @click="permissionSet(scope.row)">权限设置</el-button>
                  <el-button type="text" @click="teaPasswordRenew(scope.row)">密码重置</el-button>
                  <el-button type="text" @click="teaUserLoggedOff(scope.row)">账户注销</el-button>
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
                :http-request="teaUploadFiles"
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
                <!--                <el-checkbox label="内部质量管理平台" />-->
                <!--                <el-checkbox label="教师发展平台" true-label="人事" />-->
                <!--                <el-checkbox label="专业发展平台" true-label="专业" />-->
                <!--                <el-checkbox label="资产管理平台" true-label="资产" />-->
                <!--                <el-checkbox label="科研管理平台" true-label="科研" />-->
                <!--                <el-checkbox label="在线OA平台" true-label="OA" />-->
                <!--                <el-checkbox label="内部质量管理平台" />-->
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
            <el-button type="primary" @click="confirmPermission">确 定</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="学生用户" name="second">
        <div class="button_head">
          <div class="button_head clearfix">
            <div class="search_container">
              <span>姓名：</span>
              <el-input v-model="searchForm.userName" style="width: 150px" placeholder="请输入用户姓名" />
              <span>学号：</span>
              <el-input v-model="searchForm.studentNumber" style="width: 150px" placeholder="请输入用户学号" />
              <span>学院：</span>
              <el-input v-model="searchForm.college" style="width: 150px" placeholder="请输入用户学院" />
              <span>专业：</span>
              <el-input v-model="searchForm.major" style="width: 150px" placeholder="请输入用户专业" />
              <span>班级：</span>
              <el-input v-model="searchForm.classGrade" style="width: 150px" placeholder="请输入用户班级" />
              <el-button type="primary" @click="searchStudent">搜索</el-button>
            </div>
            <div class="button_container">
              <el-button type="primary" plain @click="openImportDialogTwo">批量新增用户</el-button>
              <el-button type="text" @click="downloadStudentFile">上传模板下载</el-button>
            </div>
          </div>
          <el-divider />
          <div class="table_container">
            <el-table
              :data="tableDataTwo.slice((currentPage2-1)*pageSize2,currentPage2*pageSize2)"
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
                prop="studentName"
                label="姓名"
                width="180"
              />
              <el-table-column
                prop="studentNumber"
                label="学号"
              />
              <el-table-column
                prop="college"
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
                  <el-button type="text" @click="passwordRenew(scope.row)">密码重置</el-button>
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
                  :http-request="uploadFiles"
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
              <el-button @click="dialogVisibleFour = false">取 消</el-button>
              <!--              <el-button type="primary" @click="confirmAddNotice">文件解析</el-button>-->
            </span>
          </el-dialog>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { teacherPlatformPermissionSet, studentListFileUpload, getStudentFromListByCondition, userPasswordReset, userAccountCancellation, teacherListFileUpload, getTeacherFromListByCondition } from '@/api/platformManagement'
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
      tableData: [],
      tableDataTwo: [],
      addForm: {},
      fileList: [],
      checkList: [],
      searchForm: {
        userName: '',
        studentNumber: '',
        college: '',
        major: '',
        classGrade: ''
      },
      teaSeaForm: {
        teaName: '',
        teaUsername: '',
        dept: ''
      },
      loginName: '', // 每次要修改权限的用户名,
      PlatformsMap: {
        '教师发展平台': '教师',
        '专业发展平台': '专业',
        '资产管理平台': '资产',
        '科研管理平台': '科研',
        '在线OA平台': 'OA'
      }
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
      this.currentPage2 = 1
      this.pageSize2 = val
    },
    handleCurrentChangeTwo(val) {
      this.currentPage2 = val
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
    permissionSet: function(row) {
      this.loginName = row.teaUsername
      this.dialogVisibleTwo = true
    },
    confirmPermission: function() {
      if (this.checkList.length === 0) {
        this.$message({
          message: '未选择权限',
          type: 'warning'
        })
      } else {
        console.log(this.checkList)
        var perStr = ''
        for (let i = 0; i < this.checkList.length; i++) {
          const value = this.PlatformsMap[this.checkList[i]]
          perStr = perStr + value + ','
        }
        console.log('测试perStr')
        console.log(perStr)
        const prams = {
          loginName: this.loginName,
          systemName: perStr
        }
        teacherPlatformPermissionSet(prams).then(response => {
          console.log('测试更新平台权限')
          console.log(response.data)
          this.$message({
            message: '权限设置成功',
            type: 'success'
          })
          this.checkList = []
          this.dialogVisibleTwo = false
        })
      }
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
    userLoggedOff: function(row) {
      this.$confirm('此操作将该账号永久注销', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const prams = {
          loginName: row.studentNumber
        }
        userAccountCancellation(prams).then(response => {
          console.log('测试账户注销接口')
          console.log(response.data)
          this.$message({
            type: 'success',
            message: '注销成功'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消注销'
        })
      })
    },
    teaUserLoggedOff: function(row) {
      this.$confirm('此操作将该账号永久注销', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const prams = {
          loginName: row.teaUsername
        }
        userAccountCancellation(prams).then(response => {
          console.log('测试账户注销接口')
          console.log(response.data)
          this.$message({
            type: 'success',
            message: '注销成功'
          })
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
    },
    downloadStudentFileTwo: function() {
      var url = 'https://zhongkeruitong.top/zgplatform-management/%E6%95%99%E5%B8%88%E8%A1%A8.xlsx'
      window.open(url)
    },
    uploadFiles: function(params) {
      const formData = new FormData()
      formData.append('file', params.file)
      studentListFileUpload(formData).then(response => {
        console.log('测试学生用户名单上传')
        console.log(response)
        if (response.data.code === 0) {
          this.$message({
            message: '文件上传成功',
            type: 'success'
          })
          this.dialogVisibleFour = false
        }
      })
    },
    teaUploadFiles: function(params) {
      const formData = new FormData()
      formData.append('file', params.file)
      teacherListFileUpload(formData).then(response => {
        console.log('测试教师用户名单上传')
        console.log(response)
        if (response.data.code === 0) {
          this.$message({
            message: '文件上传成功',
            type: 'success'
          })
          this.dialogVisible = false
        }
      })
    },
    searchStudent: function() {
      const prams = {
        userName: this.searchForm.userName,
        studentNumber: this.searchForm.studentNumber,
        college: this.searchForm.college,
        major: this.searchForm.major,
        classGrade: this.searchForm.college
      }
      getStudentFromListByCondition(prams).then(resposne => {
        console.log('测试根据条件搜索学生接口')
        console.log(resposne.data)
        this.tableDataTwo = resposne.data
        this.$message({
          type: 'success',
          message: '搜索成功'
        })
      })
    },
    searchTeacher: function() {
      const prams = {
        teaName: this.teaSeaForm.teaName,
        teaUsername: this.teaSeaForm.teaUsername,
        dept: this.teaSeaForm.dept
      }
      getTeacherFromListByCondition(prams).then(resposne => {
        console.log('测试根据条件搜索教师接口')
        console.log(resposne.data)
        this.tableData = resposne.data
        this.$message({
          type: 'success',
          message: '搜索成功'
        })
      })
    },
    passwordRenew: function(row) {
      this.$confirm('此操作将重置账户密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const prams = {
          loginName: row.studentNumber
        }
        userPasswordReset(prams).then(response => {
          console.log('测试重置密码接口')
          console.log(response.data)
          this.$message({
            message: '重置密码成功',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消密码重置'
        })
      })
    },
    teaPasswordRenew: function(row) {
      this.$confirm('此操作将重置账户密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const prams = {
          loginName: row.teaUsername
        }
        userPasswordReset(prams).then(response => {
          console.log('测试重置密码接口')
          console.log(response.data)
          this.$message({
            message: '重置密码成功',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消密码重置'
        })
      })
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
.search_container span {
  font-size: 15px;
  font-weight: bold;
}
</style>
