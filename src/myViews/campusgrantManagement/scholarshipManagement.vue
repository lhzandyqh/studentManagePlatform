<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="奖学金信息管理" name="first">
        <info-manage />
      </el-tab-pane>
      <el-tab-pane label="奖学金申请审核" name="second">
        <reply-audit />
      </el-tab-pane>
      <el-tab-pane label="奖学金获奖历史管理" name="third">
        <award-history-manage />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import infoManage from './scholarshipComponent/infoManage'
import replyAudit from './scholarshipComponent/replyAudit'
import awardHistoryManage from './scholarshipComponent/awardHistoryManage'
export default {
  name: 'ScholarshipManagement',
  components: { infoManage, replyAudit, awardHistoryManage },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>

</style>
