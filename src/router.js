import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

import IndexMenu from './components/IndexMenu'
import IndexArticle from './components/IndexArticle'
import IndexArticleItem from './components/IndexArticleItem'
import IndexCategory from './components/IndexCategory'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      children: [{
          path: '',
          components: {
            leftmenu: IndexMenu,
            right: IndexArticle
          }
        },
        {
          path: 'category/:cy',
          components: {
            leftmenu: IndexMenu,
            right: IndexCategory
          },
          props: {
            right: true
          }
        },
        {
          path: 'article/:id',
          components: {
            leftmenu: IndexMenu,
            right: IndexArticleItem
          },
          props: {
            right: true
          }
        }
      ]
    },
    // {
    //   path:'/page/:id',
    //   name:'Page',
    //   component: () => import(/* webpackChunkName: "about" */ './views/Page.vue')
    // }
  ]
})