<template>
  <div class="workList">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
      <el-form-item label="作业名称">
        <el-input v-model="formInline.jobName" placeholder="请输入作业名称查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData"  border style="width: 100%">
      <el-table-column  prop="jobName"  label="作业名称" align="center"> </el-table-column>
      <el-table-column  prop="completedNumber"  label="完成人数" align="center"> </el-table-column>
      <el-table-column  prop="uncompletedNumber"  label="未完成人数" align="center"> </el-table-column>
      <el-table-column  prop="completion"  label="完成率" align="center"> </el-table-column>
      <el-table-column  prop="check"  label="待批改" align="center"> </el-table-column>
      <el-table-column  prop="checkRate"  label="批改率" align="center"> </el-table-column>
      <el-table-column  prop="passNumber"  label="及格人数" align="center"> </el-table-column>
      <el-table-column  prop="goodNumber"  label="优秀人数" align="center"> </el-table-column>
    </el-table>

     <!-- 分页 -->
     <el-pagination
        background
        @size-change = "hanldSizeChange"
        @current-change = "hanldCurrentChange"
        :current-page = "currentPage"
        :page-size = "pageSize"
        :page-sizes = "[5, 10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
  </div>
</template>

<script>
import { getData } from '../../api/api'
export default {
  name: 'WorkList',
  data () {
    return {
      formInline: {
        jobName: ''
      },
      tableData: [],
      // 分页数据
      total: 10,
      // 当前页数
      currentPage: 1,
      // 每页记录数
      pageSize: 10
    }
  },
  created () {
    let curr = (this.currentPage - 1) * this.pageSize
    getData(this, '/works', {offset: curr, limit: this.pageSize})
  },
  methods: {
    find () {
      console.log(this.formInline)
      getData(this, '/works', this.formInline)
    },
    reset () {
      getData(this, '/works', {})
    },
    // 分页函数
    hanldSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      getData(this, '/works', {offset: (this.currentPage - 1), limit: val})
    },
    hanldCurrentChange (val) {
      this.currentPage = val
      getData(this, '/works', {offset: (val - 1) * this.pageSize, limit: this.pageSize})
    }
  }
}
</script>

<style lang="scss">
.workList{
  .demo-form-inline{
    text-align: left;
  }
}
</style>
