<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="助学金申请审核" name="first">
        <fellow-reply />
      </el-tab-pane>
      <el-tab-pane label="助学金获奖历史管理" name="second">
        <fellow-history />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import fellowReply from './fellowshipComponent/fellowReply'
import fellowHistory from './fellowshipComponent/fellowHistory'
export default {
  name: 'FellowshipManagement',
  components: { fellowReply, fellowHistory },
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

