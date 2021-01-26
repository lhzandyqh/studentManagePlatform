<template>
  <div class="app-container">
    <div class="head_title">
      <span>各院系请假情况统计图</span>
    </div>
    <div class="search_container">
      <span>月份：</span>
      <el-select v-model="searchForm.year" placeholder="请选月份">
        <el-option label="一月" value="一月" />
        <el-option label="二月" value="二月" />
        <el-option label="三月" value="三月" />
        <el-option label="四月" value="四月" />
        <el-option label="五月" value="五月" />
        <el-option label="六月" value="六月" />
        <el-option label="七月" value="七月" />
        <el-option label="八月" value="八月" />
        <el-option label="九月" value="九月" />
        <el-option label="十月" value="十月" />
        <el-option label="十一月" value="十一月" />
        <el-option label="十二月" value="十二月" />
      </el-select>
    </div>
    <div class="">
      <div id="homethree" style="width: 100%;height:350px;" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
export default {
  name: 'HomeEchartThree',
  data() {
    return {
      searchForm: {
        year: ''
      },
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['事假人数', '病假人数', '请假总人数']
        },
        xAxis: [
          {
            type: 'category',
            data: ['医学影像技术专业', '助产专业', '中医学', '护理学', '医学检验', '口腔医学', '临床医学', '药学'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '人数',
            min: 0,
            max: 100,
            interval: 10,
            axisLabel: {
              formatter: '{value} 人'
            }
          },
          {
            type: 'value',
            name: '人数',
            min: 0,
            max: 100,
            interval: 10,
            axisLabel: {
              formatter: '{value} 人'
            }
          }
        ],
        series: [
          {
            name: '事假人数',
            type: 'bar',
            data: [4, 6, 8, 12, 10, 7, 2, 8]
          },
          {
            name: '病假人数',
            type: 'bar',
            data: [12, 4, 7, 23, 25, 7, 13, 12]
          },
          {
            name: '请假总人数',
            type: 'line',
            yAxisIndex: 1,
            data: [16, 10, 15, 35, 14, 15, 15, 20]
          }
        ]
      }
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart: function() {
      this.chart = echarts.init(document.getElementById('homethree'), 'macarons')
      // this.chart = echarts.init(document.getElementById('testone'))
      this.chart.setOption(this.option)
    }
  }
}
</script>

<style scoped>
.head_title span {
  color: #50565f;
  font-weight: bold;
}
.search_container {
  margin-top: 20px;
}
.search_container span {
  color: #50565f;
  font-weight: bold;
}
</style>
