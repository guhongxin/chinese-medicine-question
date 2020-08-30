<template>
  <div class="answerSheet">
    <p class="basicinfor" @click="seeBasicInfor">基本信息</p>
    <div class="title">问卷</div>
    <baseInforDailog ref="baseInforDoc" />
  </div>
</template>
<script>
import baseInforDailog from './popup/baseInforDailog'
export default {
  components: {
    baseInforDailog
  },
  data() {
    return {}
  },
  methods: {
    seeBasicInfor() {
      this.$refs.baseInforDoc.showModule()
    }
  }
}
</script>
<style lang="scss" scoped>
.answerSheet {
  width: 60%;
  padding-top: 60px;
  margin: 0px auto;
  position: relative;
  .title {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 40px;
  }
  .basicinfor {
    color: #409EFF;
    position: absolute;
    right: 0px;
    top: 30px;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
