import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

import IndexMenu from './components/IndexMenu'
import IndexNewArticles from './components/IndexNewArticles'
import IndexArticle from './components/IndexArticle'
import IndexArticles from './components/IndexArticles'
import ExamMenu from './components/ExamMenu'
import ExamPapers from './components/ExamPapers'
import ExamPaper from './components/ExamPaper'
import ExamDownload from './components/ExamDownload'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: Home,
      children: [{
          path: '',
          components: {
            leftmenu: IndexMenu,
            right: IndexNewArticles
          }
        },
        {
          path: 'article/category/:cy',
          components: {
            leftmenu: IndexMenu,
            right: IndexArticles
          },
          props: {
            right: true
          }
        },
        {
          path: 'article/:id',
          components: {
            leftmenu: IndexMenu,
            right: IndexArticle
          },
          props: {
            right: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login')
    },
    {
      path: '/exam',
      component: () => import('./views/Exam'),
      children: [{
        path: '',
        components: {
          leftmenu: ExamMenu,
        }
      },{
        path:'category/:cy',
        components:{
          leftmenu:ExamMenu,
          right:ExamPapers
        },
        props:{
          right:true
        }
      },{
        path:'exampaper/:ep',
        components:{
          leftmenu:ExamMenu,
          right:ExamPaper
        },props:{
          right:true
        }
      },{
        path:'download',
        components:{
          leftmenu:ExamMenu,
          right:ExamDownload
        }
      }]
    }
    // {
    //   path:'/page/:id',
    //   name:'Page',
    //   component: () => import(/* webpackChunkName: "about" */ './views/Page.vue')
    // }
  ]
})