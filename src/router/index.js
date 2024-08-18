import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
      hidden: true
    },
    {
      path: '/index',
      name: 'index',
      hidden: true,
      component: () => import('@/components/index')
    },
    {
      path: '*',
      name: 'NotFound',
      hidden: true,
      component: () => import('@/components/NotFound')
    },
    {
      path: '/home',
      name: '学生管理',
      iconClass: 'fa fa-users',
      redirect: '/home/student',
      component: () => import('@/components/Home'),
      children: [
        {
          path: '/home/student',
          name: '学生列表',
          iconClass: 'fa fa-list',
          component: () => import('@/components/students/studentList')
        },
        {
          path: '/home/work',
          name: '作业列表',
          iconClass: 'fa fa-list-ul',
          component: () => import('@/components/students/workList')
        },
        {
          path: '/home/info',
          name: '信息列表',
          iconClass: 'fa fa-list-alt',
          component: () => import('@/components/students/infoList')
        },
        {
          path: '/home/attend',
          name: '考勤管理',
          iconClass: 'fa fa-list-alt',
          component: () => import('@/components/students/attend')
        }

      ]
    },
    {
      path: '/home',
      name: '数据分析',
      iconClass: 'fa fa-bar-chart',
      component: () => import('@/components/Home'),
      children: [
        {
          path: '/home/DataOverView',
          name: '数据概览',
          iconClass: 'fa fa-bar-chart',
          component: () => import('@/components/dataAnalysis/DataOverView')
        },
        {
          path: '/home/mapData',
          name: '地图概览',
          iconClass: 'fa fa-map-marker',
          component: () => import('@/components/dataAnalysis/mapData')
        },
        {
          path: '/home/mapTow',
          name: '出行地图',
          iconClass: 'fa fa-map-marker',
          component: () => import('@/components/dataAnalysis/mapTow')
        }
      ]
    }
  ],
  mode: 'history'
})
