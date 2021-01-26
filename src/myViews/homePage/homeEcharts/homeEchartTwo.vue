<template>
  <div class="app-container">
    <div class="head_title">
      <span>各院系违纪人数占比图</span>
    </div>
    <div class="top_control">
      <div id="homeTwo" style="width: 100%;height:350px;" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
export default {
  name: 'HomeEchartTwo',
  data() {
    return {
      option: {
        title: {
          // text: '某站点用户访问来源',
          // subtext: '纯属虚构',
          // left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 34, name: '医学影像技术专业' },
              { value: 24, name: '助产专业' },
              { value: 15, name: '中医学' },
              { value: 24, name: '医学检验' },
              { value: 45, name: '护理学' },
              { value: 10, name: '口腔医学' },
              { value: 12, name: '临床医学' },
              { value: 14, name: '药学' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
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
      this.chart = echarts.init(document.getElementById('homeTwo'), 'macarons')
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
.top_control {
  margin-top: 50px;
}
</style>
