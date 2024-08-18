<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>后台管理系统</span>
      </div>
      <el-form :model="form" ref="form" label-width="80px">
      <el-form-item label="用户名"
        prop="username"
        :rules="[
          {required: true, message: '请输入用户名', trigger: 'blue'},
          {
            min: 4,
            max: 10,
            message: '长度在4-10位字符之间',
            trigger: 'blur'
          }
        ]"
      >
        <el-input type="text" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码"
        prop="password"
        :rules="[
          {required: true, message: '请输入密码', trigger: 'blue'},
          {
            min: 6,
            max: 12,
            message: '长度在6-12位字符',
            trigger: 'blur'
          }
        ]"
      >
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('form')">登录</el-button>
      </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$router.push('/home/student')
          // this.axios.post('http://rap2api.taobao.org/app/mock/320272/login')
          // .then (res => {
          //   console.log(res)
          // })
          // .catch (err => {
          //   console.error(err)
          // })
          this.$message({message: '登录成功', type: 'success'})

          // console.log(this.form)
          // // this.axios.post('http://rap2api.taobao.org/app/mock/320272/login', this.form)
          // this.service.post('/login', this.form)
          //   .then(res => {
          //     console.log(res.data)
          //     if (res.data.status === 200) {
          //       localStorage.setItem('username', res.data.username)
          //       console.log(res)
          //       this.$message({message: res.data.message, type: 'success'})
          //       this.$router.push('/home/students')
          //     }
          //   })
          //   .catch(err => {
          //     console.error(err+'454444444444')
          //   })
        } else {
          // console.error(err)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login{
  width: 100%;
  height: 100%;
  position: absolute;
  background: #409EFF;
  .box-card {
    width: 450px;
    margin: 200px auto;
    .el-card__header{
      font-size: 34px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
