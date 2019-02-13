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
import ExamFiles from './components/ExamFiles'
import ExamSelfstudy from './components/ExamSelfstudy'
import ExamUser from './components/ExamUser'

Vue.use(Router)

export default new Router({
  // mode:'history',
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
          path: 'articles/category/:cy',
          components: {
            leftmenu: IndexMenu,
            right: IndexArticles
          },
          props: {
            right: true
          }
        },
        {
          path: 'articles/:id',
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
          right: ExamUser
        }
      }, {
        path: 'selfstudyquestions',
        components: {
          leftmenu: ExamMenu,
          right: ExamSelfstudy
        }
      }, {
        path: 'exampapers/:cy',
        components: {
          leftmenu: ExamMenu,
          right: ExamPapers
        },
        props: {
          right: true
        }
      }, {
        path: 'files',
        components: {
          leftmenu: ExamMenu,
          right: ExamFiles
        }
      }]
    },
    {
      path: '/exampaper/:ep',
      component: () => import('./components/ExamPaper'),
      props: true
    }
    // {
    //   path:'/page/:id',
    //   name:'Page',
    //   component: () => import(/* webpackChunkName: "about" */ './views/Page.vue')
    // }
  ]
})