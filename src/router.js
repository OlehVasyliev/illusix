import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Comments from './views/Comments.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // component: *
    },

    {
      path: '/comments/:id',
      name: 'comments',
      component: Comments
    },
  ]
})
