<template>
  <div class="app-container">
    <div class="button_head clearfix">
      <div class="search_container">
        <span>年度：</span>
        <el-select v-model="searchForm.year" placeholder="请选择年度">
          <el-option label="2020" value="2020" />
          <el-option label="2019" value="2019" />
          <el-option label="2018" value="2018" />
          <el-option label="2017" value="2017" />
          <el-option label="2016" value="2016" />
        </el-select>
        <span class="left_control">院系：</span>
        <el-select v-model="searchForm.major" placeholder="请选择院系">
          <el-option label="医学影像技术专业" value="医学影像技术专业" />
          <el-option label="助产专业" value="助产专业" />
          <el-option label="中医学" value="中医学" />
          <el-option label="护理学" value="护理学" />
          <el-option label="医学检验" value="医学检验" />
          <el-option label="口腔医学" value="口腔医学" />
          <el-option label="临床医学" value="临床医学" />
          <el-option label="药学" value="药学" />
        </el-select>
        <span class="left_control">类型：</span>
        <el-select v-model="searchForm.type" placeholder="请选择类型">
          <el-option label="病假" value="病假" />
          <el-option label="事假" value="事假" />
          <el-option label="其他" value="其他" />
        </el-select>
        <span class="left_control">审核状态：</span>
        <el-select v-model="searchForm.status" placeholder="请选择审核状态">
          <el-option label="批准" value="批准" />
          <el-option label="未批准" value="未批准" />
        </el-select>
        <el-button type="primary" class="left_control">搜索</el-button>
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
          prop="year"
          label="年度"
          width="180"
        />
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
          prop="major"
          label="院系"
        />
        <el-table-column
          prop="type"
          label="请假类型"
        />
        <el-table-column
          prop="beginDate"
          label="请假开始时间"
        />
        <el-table-column
          prop="endDate"
          label="请假结束时间"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="getDetails(scope.row)">查看详情</el-button>
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
    <el-dialog
      title="学生请假详情"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="detail">
        <span>请假主题</span>
        <el-divider />
        <p>这里是请假主题</p>
      </div>
      <div class="top-control detail">
        <span>请假原因</span>
        <el-divider />
        <p>这里是请假说明</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'History',
  data() {
    return {
      dialogVisible: false,
      tableData: [
        {
          year: '2020',
          name: '小明',
          number: '222323',
          major: '口腔医学',
          type: '事假',
          beginDate: '2020-11-23',
          endDate: '2020-11-25'
        }
      ],
      currentPage: 1,
      pageSize: 5,
      searchForm: {
        year: '',
        major: '',
        status: '',
        type: ''
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
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    getDetails: function(row) {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.search_container{
  float: left;
}
.search_container span{
  color: #494747;
  font-weight: bold;
  font-size: 15px;
}
.left_control{
  margin-left: 20px;
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
.audit_title {
  font-weight: bold;
}
.foot{
  text-align: center;
  margin-top: 20px;
}
.top-control{
  margin-top: 70px
}
.detail span {
  font-weight: bold;
}
</style>
