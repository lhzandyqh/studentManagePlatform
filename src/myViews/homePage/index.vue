<template>
  <div class="app-container">
    <div class="echart_container">
      <el-row>
        <el-col :span="16">
          <home-echart-one />
        </el-col>
        <el-col :span="8" />
      </el-row>
    </div>
  </div>
</template>

<script>
import homeEchartOne from './homeEcharts/homeEchartOne'
export default {
  name: 'Index',
  components: {
    homeEchartOne
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
</style>
