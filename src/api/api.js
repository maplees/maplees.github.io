// 获取数据接口
export function getData (root, url, params) {
  root.service.get(url + '/count')
    .then(res => {
      res.status === 200 ? root.total = res.data : root.total = 0
      console.log(root.total)
      root.service.get(url, {params: params})
        .then(res => {
          if (res.status === 200) {
            // 将数据取出
            res.data.forEach(item => {
              item.completion = ((item.completedNumber / (item.completedNumber + item.uncompletedNumber)) * 100).toFixed(2)
            })
            root.tableData = [...res.data]
          }
        })
        .catch(err => {
          console.error(err)
        })
    })
    .catch(err => {
      console.error(err)
    })
}
// 新增和修改接口
export function changeInfo (root, method, url, callback, form, mess) {
  let _url = ''
  method === 'post' ? _url = url : _url = url + '/' + root.form.id
  // 调用新增信息借口
  if (method === 'patch') {
    delete root.form.createdDate
    delete root.form.lastModifiedDate
  }
  root.service[method](_url, root.form)
    .then(res => {
      // 判断状态是否正root
      if (res.status === 201 || res.status === 200) {
        // 将表单隐藏
        root.dialogFormVisible = false
        // 将表单初始化
        root.$refs[form].resetFields()
        root.$message({message: mess, type: 'success'})
        callback(root, url)
      }
    })
    .catch(err => {
      console.error(err)
    })
}
// 删除接口
export function remove (root, cont, title, btn, url, mess, id, callback) {
  root.$alert(cont, title, {
    confirmButtonText: btn,
    callback: () => {
      root.service.delete(url + '/' + id)
        .then(res => {
          // console.log(res)
          if (res.status === 204) {
            root.$message({message: mess, type: 'success'})
            callback(root, url)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  })
}
