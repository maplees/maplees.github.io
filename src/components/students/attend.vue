<template>
  <div class="attend">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
      <el-form-item label="学生姓名">
        <el-input v-model="formInline.attendName" placeholder="请输入名字查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData"  border style="width: 100%">
      <el-table-column  prop="attendName"  label="名称" align="center"> </el-table-column>
      <el-table-column  prop="class"  label="班级" align="center"> </el-table-column>
      <el-table-column  prop="actual"  label="实到课" align="center"> </el-table-column>
      <el-table-column  prop="toBeDue"  label="应到课" align="center"> </el-table-column>
    </el-table>

      <Page :total="total" :url="url"></Page>
  </div>
</template>

<script>
import { getData } from '../../api/api'
import Page from '../common/Pageing.vue'
export default {
  components: {
    Page
  },
  name: 'Attend',
  data () {
    return {
      formInline: {
        attendName: ''
      },
      tableData: [],
      // 分页数据
      total: 10, // 总条数
      url: '/attends'
    }
  },
  created () {
    getData(this, '/attends')
  },
  methods: {
    find () {
      getData(this, '/attends', this.formInline)
    },
    // 分页函数
    hanldSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      getData(this, '/attends', {offset: (this.currentPage - 1), limit: val})
    },
    hanldCurrentChange (val) {
      this.currentPage = val
      getData(this, '/attends', {offset: (val - 1) * this.pageSize, limit: this.pageSize})
    }
  }
}
</script>

<style lang="scss">
.attend{
  .demo-form-inline{
    text-align: left;
  }
}
</style>
