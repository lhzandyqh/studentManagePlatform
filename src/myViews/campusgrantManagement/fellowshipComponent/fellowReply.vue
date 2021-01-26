<template>
  <div class="app-container">
    <div class="button_head clearfix">
      <div class="search_container">
        <el-select v-model="type" placeholder="请选择审核状态">
          <el-option label="待审核" value="shanghai" />
          <el-option label="已完成" value="beijing" />
        </el-select>
        <el-button type="primary">搜索</el-button>
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
          prop="number"
          label="编号"
          width="100"
        />
        <el-table-column
          prop="name"
          label="姓名"
        />
        <el-table-column
          prop="studentid"
          label="学号"
        />
        <el-table-column
          prop="grade"
          label="年级"
        />
        <el-table-column
          prop="academy"
          label="所在院系"
        />
        <el-table-column
          prop="date"
          label="申请日期"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="beginAuditing(scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script>
export default {
  name: 'ReplyAudit',
  data() {
    return {
      // src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      dialogVisible: false,
      type: '',
      imgs: [],
      currentPage: 1,
      pageSize: 5,
      tableData: [{
        number: '001',
        name: '王小虎',
        studentid: '2020040402080',
        grade: '大三',
        academy: '计算机学院',
        date: '2016-05-02'
      }, {
        number: '001',
        name: '王小虎',
        studentid: '2020040402080',
        grade: '大三',
        academy: '计算机学院',
        date: '2016-05-02'
      }, {
        number: '001',
        name: '王小虎',
        studentid: '2020040402080',
        grade: '大三',
        academy: '计算机学院',
        date: '2016-05-02'
      }, {
        number: '001',
        name: '王小虎',
        studentid: '2020040402080',
        grade: '大三',
        academy: '计算机学院',
        date: '2016-05-02'
      }, {
        number: '001',
        name: '王小虎',
        studentid: '2020040402080',
        grade: '大三',
        academy: '计算机学院',
        date: '2016-05-02'
      }, {
        number: '001',
        name: '王小虎',
        studentid: '2020040402080',
        grade: '大三',
        academy: '计算机学院',
        date: '2016-05-02'
      }]
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    // 自己的方法
    beginAuditing: function() {
      this.dialogVisible = true
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
.audit_title {
  font-weight: bold;
}
.foot{
  text-align: center;
  margin-top: 20px;
}
</style>

