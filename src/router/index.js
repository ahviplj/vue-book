import Vue from 'vue'
import VueRouter from 'vue-router'
import BookManage from "@/views/BookManage";
import AddBook from "@/views/AddBook";
import BookUpdate from "@/views/BookUpdate";
import Index from "@/views/Index";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    name: '图书管理',
    redirect:'/bookManage',
    show:true,
    children:[
      {
        path: '/bookManage',
        component: BookManage,
        name: '图书详情 '
      },
      {
        path: '/addBook',
        component: AddBook,
        name: '添加图书'
      }
    ]

  },
  {
    path: '/bookUpdate',
    component: BookUpdate,
    name: '修改图书'
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
