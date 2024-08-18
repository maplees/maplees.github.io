<template>
    <div class="map-data">
        <div id="main"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
// import echarts from 'echarts'
import geoJson from '../../assets/中华人民共和国.json'
export default {
  data () {
    return {}
  },
  mounted () {
    var myChart = echarts.init(document.getElementById('main'))
    // 各个地区的坐标数组
    var points = [{value: [116.405285, 39.904989], itemStyle: {olor: '#4ab2e5'}},
      {value: [116.41995, 40.18994], itemStyle: {olor: '#4ab2e5'}}]
    echarts.registerMap('china', geoJson)// 注册可用的地图，必须包括geo组件或者map图表类型
    var option = {
      backgroundColor: 'rgb(136, 213, 185)',
      geo: {
        map: 'china', // 地图类型
        aspectScale: 0.75, // 地图长宽比
        zoom: 1.1,
        itemStyle: {
          normal: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [{
              offset: 0,
              color: '#09132c'
            }, {
              offset: 1,
              color: '#274d68'
            }],
            globalCoord: true,
            // 阴影
            shadowColor: 'rgb(58, 115, 192)',
            shadowOffsetX: 10,
            shadowOffsetY: 11
          }
        },
        regios: [{
          name: '南海诸岛',
          itemStyle: {
            opacity: 0
          }
        }]

      },
      serier: [
        // 配置地图相关参数、绘制地图，这个对象是关于地图图层的相关设置
        {
          type: 'map',
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#1DE986'
              }
            },
            emphasis: {
              textStyle: {
                color: 'rgb(183, 185, 14)'
              }
            }
          },
          itemStyle: { // 区域图形样式
            normal: {
              borderColor: 'rgb(147, 235, 248)',
              borderWidth: 1,
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [{
                  offset: 0,
                  color: 'rgb(31, 54, 150)'
                }, {
                  offset: 1,
                  color: 'rgb(89, 128, 142)'
                }],
                globalCoord: true
              }
            },
            emphasis: { // 高亮
              areaColor: 'rgb(46, 229, 206)',
              borderWidth: 0.1
            }
          },
          zoom: 1.1,
          map: 'china'

        },
        // 地图散点图的配置
        {
          type: 'effectScatter', // 散点图
          coordinateSystem: 'geo',
          showEffectOn: 'render',
          zlevel: 1,
          symbolSize: [10, 50],
          data: points,
          rippleEffect: {// 涟漪配置
            period: 15, // 周期，秒数
            scale: 4, // 动画中波纹的最大缩放比例
            brushType: 'fill'
          }
        }
        // 路线动画
        // {
        //   type: 'lines',
        //   zlevel: 2,
        //   effect: {
        //     show: true,
        //     period: 4,
        //     symbol: 'arraw',
        //     symbolSize: 7
        //   },
        //   data: [] // 存放二点图
        // }
      ]

    }
    myChart.setOption(option)
  }
}
</script>

<style  lang="scss">
.map-data{
    width: 100%;
    #main{
        width: 100%;
        height: 600px;
    }
}
</style>
