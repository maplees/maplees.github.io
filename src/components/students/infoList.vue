<template>
  <div class="infoList">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
      <el-form-item>
        <el-button type="primary" @click="addStudent">新增</el-button>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formInline.studentName" placeholder="请输入姓名查询"></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="formInline.studentnumber" placeholder="请输入学号查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData"  border style="width: 100%">
        <el-table-column  prop="name"  label="姓名" align="center"> </el-table-column>
        <el-table-column  prop="sex"  label="性别" align="center"> </el-table-column>
        <el-table-column  prop="age"  label="年龄" align="center"> </el-table-column>
        <el-table-column  prop="data"  label="出生日期" align="center"> </el-table-column>
        <el-table-column  prop="idCard"  label="身份证号" align="center"> </el-table-column>
        <el-table-column  prop="father"  label="父亲" align="center"> </el-table-column>
        <el-table-column  prop="mather"  label="母亲" align="center"> </el-table-column>
        <el-table-column  prop="address"  label="家庭住址" align="center"> </el-table-column>
        <el-table-column  prop="time"  label="入校时间" align="center"> </el-table-column>
        <el-table-column  prop="phone"  label="联系方式" align="center"> </el-table-column>
        <el-table-column  label="操作" align="center" width="150">
          <template slot-scope="scope">

            <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateInfo(scope.row)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
          </template>

        </el-table-column>
      </el-table>

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
        <el-form-item label="出生日期" :label-width="formLabelWidth" prop="data">
          <el-input v-model="form.data" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="formLabelWidth" prop="idCard">
          <el-input v-model="form.idCard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父亲" :label-width="formLabelWidth" prop="father">
          <el-input v-model="form.father" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="母亲" :label-width="formLabelWidth" prop="mather">
          <el-input v-model="form.mather" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="家庭地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入校时间" :label-width="formLabelWidth" prop="time">
          <el-input v-model="form.time" autocomplete="off"></el-input>
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
import { getData, changeInfo, remove } from '../../api/api'
export default {
  name: 'InfoList',
  data () {
    return {
      tableData: [],
      formInline: {
        studentName: '',
        studentNumber: ''
      },
      form: {
        name: '',
        sex: '1',
        age: '',
        data: '',
        idCard: '',
        father: '',
        mather: '',
        address: '',
        time: '',
        phone: ''
      },
      dialogFormVisible: false,
      state: true,
      formLabelWidth: '80px',
      rules: {
        name: [{required: true, message: '请输入名字'}],
        sex: [{required: true, message: '请选择你的性别'}],
        age: [{required: true, message: '请输入年龄'},
          {type: 'number', message: '请输入数字'}
        ],
        data: [{required: true, message: '请输入出生日期'}],
        idCard: [{required: true, message: '请输入身份证号'}],
        address: [{required: true, message: '请输入地址'}],
        time: [{required: true, message: '请输入入校时间'}],
        phone: [{required: true, message: '请输入联系方式'}]
      }
    }
  },
  created () {
    getData(this, '/infos')
  },
  methods: {
    addStudent () {
      this.dialogFormVisible = true
    },
    updateInfo (row) {
      console.log(row)
      this.state = false
      this.dialogFormVisible = true
      // 防止时候更新数据 this.form = row
      this.form = {...row}
    },
    del (row) {
      remove(this, '是否该条记录删除', '提示', '确定', '/infos', '删除数据成功', row.id, getData)
    },
    find () {
      console.log(this.formInline)
    },
    sure (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          // 调用新增信息借口
          if (this.state) {
            changeInfo(this, 'post', '/infos', getData, form, '新增数据成功')
          } else {
            changeInfo(this, 'patch', '/infos', getData, form, '修改数据成功')
          }
        } else {
          // console.error(this.form)
        }
      })
    }
  }
}
</script>

<style  lang="scss">
.infoList{
  .demo-form-inline, .el-form-item{
    text-align: left;
  }
}
</style>
