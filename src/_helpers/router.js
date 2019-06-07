import Vue from 'vue';
import Router from 'vue-router';

import Login from '../anonymous/login.vue';
import Register from '../anonymous/register.vue';
import HelloWorld from '../components/HelloWorld.vue';
import { storageService } from '../_services/storageService';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', component: HelloWorld },
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