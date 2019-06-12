import Vue from 'vue';
import Router from 'vue-router';

import { storageService } from '../_services/storageService';

const Login = () => import("../anonymous/login");
const Register = () => import("../anonymous/register");
const Home = () => import("../authenticated/Home");
const AddUpdateEmployee = () => import("../authenticated/addUpdateEmployee");

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/', component: Home, children: [
        {
          path: '/addEmployee', component: AddUpdateEmployee
        },
        {
          path: '/employee/:id', component: AddUpdateEmployee
        }
      ]
    },
    { path: '/login', component: Login },
    { path: '/register', component: Register },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = storageService.getData('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})