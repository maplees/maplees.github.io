<template>
  <div class="studentList">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
      <el-form-item>
        <el-button type="primary" @click="addStudent">新增</el-button>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="请输入学生姓名查询"></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="formInline.number" placeholder="请输入学生学号查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

      <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"  border style="width: 100%">
        <el-table-column  prop="name"  label="姓名" align="center"> </el-table-column>
        <el-table-column  prop="sex_text"  label="性别" align="center"> </el-table-column>
        <el-table-column  prop="age"  label="年龄" align="center"> </el-table-column>
        <el-table-column  prop="number"  label="学号" align="center"> </el-table-column>
        <el-table-column  prop="class"  label="班级" align="center"> </el-table-column>
        <el-table-column  prop="state_text"  label="状态" align="center"> </el-table-column>
        <el-table-column  prop="address"  label="地址" align="center"> </el-table-column>
        <el-table-column  prop="phone"  label="联系方式" align="center"> </el-table-column>
        <el-table-column  label="操作" align="center">
          <template slot-scope="scope">

            <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateInfo(scope.row)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
          </template>

        </el-table-column>
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
    <!-- 新增信息弹窗 -->
    <el-dialog :title="state ? '新增学生信息' : '修改学生信息'" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
            <el-radio v-model="form.sex" label="1">男</el-radio>
            <el-radio v-model="form.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model.number="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学号" :label-width="formLabelWidth" prop="number">
          <el-input v-model.number="form.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth" prop="class">
          <el-select v-model="form.class" placeholder="请选择班级">
            <el-option label="一班" value="1"></el-option>
            <el-option label="二班" value="2"></el-option>
            <el-option label="三班" value="3"></el-option>
            <el-option label="四班" value="4"></el-option>
            <el-option label="五班" value="5"></el-option>
            <el-option label="六班" value="6"></el-option>
            <el-option label="七班" value="7"></el-option>
            <el-option label="八班" value="8"></el-option>
            <el-option label="九班" value="9"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="state">
          <el-select v-model="form.state" placeholder="请选择状态">
            <el-option label="已入学" value="1"></el-option>
            <el-option label="未入学" value="2"></el-option>
            <el-option label="休学中" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'StudentList',
  data () {
    return {
      tableData: [],
      formInline: {
        name: '',
        number: ''
      },
      dialogFormVisible: false,
      state: true,
      form: {
        name: '',
        sex: '1',
        age: '',
        number: '',
        class: '1',
        state: '1',
        address: '',
        phone: ''
      },
      formLabelWidth: '80px',
      rules: {
        name: [{required: true, message: '请输入名字'}],
        sex: [{required: true, message: '请选择你的性别'}],
        age: [{required: true, message: '请输入年龄'},
          {type: 'number', message: '请输入数字'}
        ],
        number: [{required: true, message: '请输入学号'},
          {type: 'number', message: '请输入数字'}
        ],
        class: [{required: true, message: '请选择你的班级'}],
        state: [{required: true, message: '请选择你的状态'}],
        address: [{required: true, message: '请输入地址'}],
        phone: [{required: true, message: '请输入联系方式'}]
      },
      // 分页数据
      total: 0,
      // 当前页数
      currentPage: 1,
      // 每页记录数
      pageSize: 10

    }
  },
  // 获取数据的请求
  created () {
    this.getData()
  },
  methods: {
    // 分页函数
    hanldSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
    },
    hanldCurrentChange (val) {
      this.currentPage = val
    },
    // 获取数据函数
    getData () {
      this.service.get('/students/count')
        .then(res => {
          res.status === 200 ? this.total = res.data : this.total = 0
          console.log(this.total)
          this.service.get('/students?limit=' + this.total)
            .then(res => {
              if (res.status === 200) {
                console.log(res)
                // 将数据取出
                res.data.forEach(item => {
                  item.sex === '1' ? item.sex_text = '男' : item.sex_text = '女'
                  if (item.state === '1') {
                    item.state_text = '已入学'
                  } else if (item.state === '2') {
                    item.state_text = '未入学'
                  } else {
                    item.state_text = '休学中'
                  }
                })
                this.tableData = [...res.data]
              } else {
                // ....
              }
            })
            .catch(err => {
              console.error(err)
            })
        })
        .catch(err => {
          console.error(err)
        })
    },
    reset () {
      this.formInline = {}
      this.getData()
    },
    updateInfo (row) {
      // console.log(row)
      this.state = false
      this.dialogFormVisible = true
      this.form = {...row}
    },
    del (row) {
      this.$alert('是否该条记录删除', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.service.delete('/students/' + row.id)
            .then(res => {
              // console.log(res)
              if (res.status === 204) {
                this.$message({message: '删除数据成功', type: 'success'})
                this.getData()
              }
            })
            .catch(err => {
              console.error(err)
            })
        }
      })
      // console.log(row)
    },
    addStudent () {
      // this.state = !this.state
      this.state = true
      this.dialogFormVisible = true
    },
    find () {
      console.log(this.formInline)
      this.service.get('/students', {
        params: this.formInline
      })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.tableData = [...res.data]
            // this.tableData = res.data
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    sure (form) {
      // console.log(form)
      this.$refs[form].validate((valid) => {
        if (valid) {
          // 调用新增信息借口
          if (this.state) {
            // 调用添加接口
            this.service.post('/students', this.form)
              .then(res => {
                console.log(res)
                // 判断状态是否正确
                if (res.status === 201) {
                  // 将表单隐藏
                  this.dialogFormVisible = false
                  // 将表单初始化
                  this.$refs[form].resetFields()
                  this.$message({message: '添加记录成功', type: 'success'})
                  // this.form = {
                  //   sex: '1',
                  //   class: '1',
                  //   state: '1'
                  // }
                  this.getData()
                }
              })
              .catch(err => {
                console.error(err)
              })
          } else {
            // 调用修改接口
            this.service.patch('/students/' + this.form.id, this.form)
              .then(res => {
                // console.log(res)
                // 将表单隐藏
                this.dialogFormVisible = false
                // 将表单清空
                this.$message({message: '修改记录成功', type: 'success'})
                this.$refs[form].resetFields()
                this.getData()
              })
              .catch(err => {
                console.error(err)
              })
          }
        } else {
          // console.error(this.form)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.studentList{
  .demo-form-inline, .el-form-item{
    text-align: left;
  }
  .el-select{
    width: 100%;
  }
  .dialog-footer{
    text-align: center;
  }
}
</style>
