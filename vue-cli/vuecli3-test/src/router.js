import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Mine from './views/Mine.vue';
import Time from './views/Time.vue';
import Time1 from './views/Time1.vue';
import Time2 from './views/Time2.vue';
import TestUrl from './views/TestUrl.vue';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },{
      path:'/mine',
      component:Mine
    },{
      path:'/time',
      component:Time,
      alias:'/timealias',
      children:[
        {
          path:'time1',
          name:'time1',
          component:Time1,
        },{
          path:'time2',
          component:Time2,
        }
      ],
      },{
        path: '/testUrl/:userid/:username',
        component:TestUrl
      },{
        path:'/yy/:userid/:username',
        redirect: '/testUrl/:userid/:username'
      }

      
  ],
});
