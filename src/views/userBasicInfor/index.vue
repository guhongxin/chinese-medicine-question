<template>
  <div class="userBasicInfor">
    <div class="title">医院基本信息</div>
    <basic-infor />
    <div class="footer">
      <el-button type="primary" class="w-btn">下一步</el-button>
      <p class="explain">页面说明： 录入全部信息才可以进入下一步，如果存在未填项目，点击下一步，有红字提示文字</p>
    </div>
  </div>
</template>
<script>
import BasicInfor from '@/components/BasicInfor'
export default {
  components: {
    BasicInfor
  }
}
</script>
<style lang="scss" scoped>
.userBasicInfor {
  width: 60%;
  margin: 0px auto;
  padding-top: 30px;
  box-sizing: border-box;
  .title {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 40px;
  }
}
.w-btn {
  width: 200px;
  margin-top: 50px;
}
.explain {
  font-size: 12px;
  text-align: center;
  color: #909399;
  margin-top: 50px;
}
.footer {
  text-align: center;
}
</style>
