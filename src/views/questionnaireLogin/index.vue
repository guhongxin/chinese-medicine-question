<template>
  <div class="login">
    <div class="login-content">
      <div class="title">中医药互联网+问卷调查系统</div>
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input
            v-model="form.userName"
            placeholder="用户"
          >
            <i slot="prefix" class="el-input__icon el-icon-s-custom" />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="密码">
            <i slot="prefix" class="el-input__icon el-icon-lock" />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.keepPassword">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="success" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        userName: '',
        password: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  .login-content {
    width: 300px;
    margin-top: 100px;
    .title {
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 100px;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
