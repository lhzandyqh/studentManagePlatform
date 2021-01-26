<template>
  <div class="app-container">
    <div class="item_content">
      <div class="item zi_border">
        <!--          <span>校科研项目本年度总数（个）</span>-->
        <img style="width: 100px;height: 100px;margin-left: 20px" src="../../assets/icon/weiji.png">
        <div class="shuzi">
          <div>
            <span style="color: #7c7c7c">本月违纪处分人数</span><span style="font-weight: bolder;font-size: 20px;color: #33cfe8">0</span>
          </div>
        </div>
      </div>
      <div class="item lan_border">
        <img style="width: 80px;height: 80px;margin-left: 20px;margin-top: 10px" src="../../assets/icon/qinjia.png">
        <div class="shuzi">
          <div>
            <span style="color: #7c7c7c">本月请假人数</span><span style="font-weight: bolder;font-size: 20px;color: #33cfe8">0</span>
          </div>
        </div>
      </div>
      <div class="item hong_border">
        <img style="width: 80px;height: 80px;margin-left: 20px;margin-top: 10px" src="../../assets/icon/huodong.png">
        <div class="shuzi">
          <div>
            <span style="color: #7c7c7c">本月校园活动数</span><span style="font-weight: bolder;font-size: 20px;color: #33cfe8">0</span>
          </div>
        </div>
      </div>
      <div class="item lv_border">
        <img style="width: 80px;height: 80px;margin-left: 20px;margin-top: 10px" src="../../assets/icon/ceping.png">
        <div class="shuzi">
          <div>
            <span style="color: #7c7c7c">本月测评总数</span><span style="font-weight: bolder;font-size: 20px;color: #33cfe8">0</span>
          </div>
        </div>
      </div>
    </div>
    <el-divider />
    <div class="echart_container">
      <el-row>
        <el-col :span="16">
          <!--          <div class="left_container">-->
          <!--            <home-echart-one></home-echart-one>-->
          <!--          </div>-->
          <el-card class="box-card-left">
            <home-echart-one />
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card-right">
            <home-echart-two />
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="echart_container top_control">
      <el-row>
        <el-col :span="16">
          <el-card class="box-card-left">
            <home-echart-three />
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card-right">
            <home-echarts-four />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import homeEchartOne from './homeEcharts/homeEchartOne'
import homeEchartTwo from './homeEcharts/homeEchartTwo'
import homeEchartThree from './homeEcharts/homeEchartThree'
import homeEchartsFour from './homeEcharts/homeEchartsFour'
export default {
  name: 'Index',
  components: {
    homeEchartOne,
    homeEchartTwo,
    homeEchartThree,
    homeEchartsFour
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
.echart_container{

}
.box-card-left {
  width: 98%;
}
.box-card-right {
  width: 100%;
}
.fenye {
  text-align: center;
}
.juli {
  margin-top: 15px;
}
.main_container {
  width: 100%;
  /*height: 650px;*/
  background-color: white;
}
.item_content {
  width: 100%;
  height: 130px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  /*border-bottom-style: solid;*/
  /*border-bottom-color: #bcbcbc;*/
  /*border-bottom-width: 1px;*/
}
.item {
  margin-top: 15px;
  /*padding-top: 10px;*/
  height: 100px;
  width: 300px;
  box-shadow: 1px 1px 10px #b4b4b4;
  border-radius: 5px;
  /*border-style: solid;*/
  /*border-width: 1px;*/
  /*border-color: #d7d7d7;*/
}
.item span {
  display: block;
  height: 100px;
  line-height: 100px;
  float: left;
  margin-left: 10px;
  font-size: 14px;
}
.shuzi {
  display: block;
  height: 100px;
  line-height: 100px;
  float: right;
  margin-right: 25px;
  font-size: 25px;
}
.zi_border {
  /*border-top-width: 2px;*/
  /*border-top-color: #d45cf9;*/
}
.lan_border {
  /*border-top-width: 2px;*/
  /*border-top-color: #57d8f9;*/
}
.hong_border {
  /*border-top-width: 2px;*/
  /*border-top-color: #f93f49;*/
}
.lv_border {
  /*border-top-width: 2px;*/
  /*border-top-color: #85ec76;*/
}
.block {
  text-align: center;
}
.top_control {
  margin-top: 30px;
}
</style>
