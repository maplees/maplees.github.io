<template>
  <div class='header'>
    <el-header>
        <div class='title'>后台管理系统</div>
        <!-- <div>{{ name }}</div> -->
        <div>路过{{ }}</div>
    </el-header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      name: ''
    }
  },
  created () {
    this.name = localStorage.getItem('username')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.header {
    .el-header {
        background-color: #409EFF;
        background: #409EFF;
        color: #fff;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        .title{
            width: 200px;
            font-size: 24px;
        }
    }
}
</style>
