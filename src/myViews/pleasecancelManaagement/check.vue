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
        <el-button type="primary">搜索</el-button>
      </el-header>
    </el-container>
    <el-divider />
    <!--      table-->
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        tooltip-effect="dark"
        stripe
        border
        :header-cell-style="{background:'#B3C0D1'}"
        style="width:100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          prop="number"
          label="序号"
          width="130"
        />
        <el-table-column
          prop="type"
          label="请假类型"
          width="130"
        />
        <el-table-column
          prop="name"
          label="请假人"
          width="130"
        />
        <el-table-column
          prop="academy"
          label="学院"
          width="130"
        />
        <el-table-column
          prop="studentId"
          label="学号"
          width="150"
        />
        <el-table-column
          prop="starttime"
          label="开始时间"
          width="150"
        />
        <el-table-column
          prop="finishtime"
          label="结束时间"
          width="150"
        />
        <el-table-column
          prop="state"
          label="审核状态"
          width="150"
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
        <span class="audit_title">审核原因</span>
        <el-divider />
        <p>这里全部都是审核原因</p>
        <span class="audit_title">附件</span>
        <el-divider />
        <el-carousel trigger="click" height="200px">
          <el-carousel-item v-for="(src,item) in imgs" :key="item">
            <img :src="src" style="max-width: 100%;max-height: 100%;display: block; margin: 0 auto;">
          </el-carousel-item>
        </el-carousel>
        <div class="foot" style="text-align: center;margin-top: 30px">
          <el-button type="success" size="small" plain @click="huojiangAuditing('通过')">通过</el-button>
          <el-button type="danger" size="small" plain @click="huojiangAuditing('不通过')">未通过</el-button>
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
export default {
  name: 'Check',
  data() {
    return {
      dialogVisible: false,
      radio1: '1',
      options: [{
        value: '选项1',
        label: '1'
      }, {
        value: '选项2',
        label: '2'
      }, {
        value: '选项3',
        label: '3'
      }],
      value: '',
      // pickerOptions: {
      //   shortcuts: [{
      //     onClick(picker) {
      //       const end = new Date()
      //       const start = new Date()
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      //       picker.$emit('pick', [start, end])
      //     }
      //   }, {
      //     onClick(picker) {
      //       const end = new Date()
      //       const start = new Date()
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      //       picker.$emit('pick', [start, end])
      //     }
      //   }, {
      //     onClick(picker) {
      //       const end = new Date()
      //       const start = new Date()
      //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      //       picker.$emit('pick', [start, end])
      //     }
      //   }]
      // },
      // value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      tableData:
        [
          {
            number: '001',
            type: '1',
            name: '王小虎',
            academy: '法学院',
            studentId: '123456789',
            starttime: '2020.1.1',
            finishtime: '2020.1.2',
            state: '通过'
          }, {
            number: '001',
            type: '1',
            name: '王小虎',
            academy: '法学院',
            studentId: '123456789',
            starttime: '2020.1.1',
            finishtime: '2020.1.2',
            state: '通过'
          }, {
            number: '001',
            type: '1',
            name: '王小虎',
            academy: '法学院',
            studentId: '123456789',
            starttime: '2020.1.1',
            finishtime: '2020.1.2',
            state: '通过'
          }, {
            number: '001',
            type: '1',
            name: '王小虎',
            academy: '法学院',
            studentId: '123456789',
            starttime: '2020.1.1',
            finishtime: '2020.1.2',
            state: '通过'
          }, {
            number: '001',
            type: '1',
            name: '王小虎',
            academy: '法学院',
            studentId: '123456789',
            starttime: '2020.1.1',
            finishtime: '2020.1.2',
            state: '通过'
          }, {
            number: '001',
            type: '1',
            name: '王小虎',
            academy: '法学院',
            studentId: '123456789',
            starttime: '2020.1.1',
            finishtime: '2020.1.2',
            state: '通过'
          }
        ],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 5
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
    getNoticeContent: function(row) {
      this.dialogVisible = true
      console.log(row)
    },
    openAddDialog: function() {
      this.dialogVisible = true
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
