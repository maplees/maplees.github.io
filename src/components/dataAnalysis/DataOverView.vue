<template>
    <div class="data-view">
        <el-card>
            <div id="main1"></div>
        </el-card>
        <el-card>
            <div id="main2"></div>
        </el-card>
    </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  // 连接自己写的后端接口
  // created () {
  //   this.axios.get('http://localhost:3000/')
  //     .then(res => {
  //       console.log(res)
  //       this.draw(res.data.arr1, res.data.arr2)
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  // },
  // methods: {
  //   draw (arr1, arr2) {
  //     var myChart1 = this.$echarts.init(document.getElementById('main1'))
  //     myChart1.setOption({
  //       title: {
  //         text: 'ECharts 入门示例'
  //       },
  //       tooltip: {
  //         trigger: 'axis'
  //       },
  //       xAxis: {
  //         data: arr1
  //       },
  //       yAxis: {},
  //       series: [
  //         {
  //           name: '销量',
  //           type: 'bar',
  //           data: arr2
  //         }
  //       ]
  //     })
  //   },
  // 封装
  //  charts (el, title, x, xData,data) {
  //   var myChart2 = this.$echarts.init(document.getElementById(el))
  //     let option = {
  //       title: {
  //         text: title
  //       },
  //       legend: {
  //         data: x
  //       },
  //       xAxis: {
  //         data: xData
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: data
  //     }
  //     myChart2.setOption(option)
  //     }
  // },
  // 连接自己写的后端接口

  mounted () {
    // 基于准备好的dom,初始化echarts实例
    var myChart1 = this.$echarts.init(document.getElementById('main1'))
    myChart1.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
    var myChart2 = this.$echarts.init(document.getElementById('main2'))
    let option = {
      title: {
        text: 'ECharts 入门示例2'
      },
      tooltip: {},
      legend: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '衬衫',
          type: 'line',
          stack: '总量',
          data: [500, 200, 306, 100, 100, 200]
        },
        {
          name: '羊毛衫',
          type: 'line',
          stack: '总量',
          data: [50, 20, 36, 100, 10, 200]
        },
        {
          name: '雪纺衫',
          type: 'line',
          stack: '总量',
          data: [50, 200, 306, 10, 100, 200]
        },
        {
          name: '裤子',
          type: 'line',
          stack: '总量',
          data: [500, 210, 306, 10, 10, 200]
        },
        {
          name: '高跟鞋',
          type: 'line',
          stack: '总量',
          data: [520, 240, 306, 110, 100, 20]
        },
        {
          name: '袜子',
          type: 'line',
          stack: '总量',
          data: [500, 200, 306, 100, 100, 200]
        }
      ]
    }
    myChart2.setOption(option)
  }

}
</script>

<style  lang="scss">
.data-view {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .el-card {
        width: 50%;
        #main1, #main2 {
            height: 500px;
        }
    }
}
</style>
