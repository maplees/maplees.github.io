<template>
    <div>
        <el-pagination
        background
        @size-change = "hanldSizeChange"
        @current-change = "hanldCurrentChange"
        :current-page = "currentPage"
        :page-size = "pageSize"
        :page-sizes = "[5, 10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :url="url">
      </el-pagination>
    </div>
</template>

<script>
import { getData } from '../../api/api'
export default {
  props: {
    'total': Number,
    'url': String
  },
  data () {
    return {
      // 当前页数
      currentPage: 1,
      // 每页记录数
      pageSize: 10
    }
  },
  methods: {
    // 分页函数
    hanldSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      // 将父级传进去
      getData(this.$parent, this.url, {offset: (this.currentPage - 1), limit: val})
    },
    hanldCurrentChange (val) {
      this.currentPage = val
      getData(this.$parent, this.url, {offset: (val - 1) * this.pageSize, limit: this.pageSize})
    }
  }
}
</script>

<style lang="scss">

</style>
