import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard'
import Tables from '@/components/Tables'
import BadGateway from '@/components/BadGateway'
import Users from '@/components/Users.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      props: { page: 1 },
      alias: '/'
    },
    {
      path: '/users',
      name: 'Usuarios',
      component: Users,
      props: { page: 2 },
      alias: '/user'
    },
    {
      path: '/tables',
      name: 'Tables',
      props: { page: 3 },
      component: Tables
    },
    {
      path: '/404',
      name: 'BadGateway',
      component: BadGateway
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})