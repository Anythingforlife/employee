import HelloWorld from './components/HelloWorld.vue'
import Login from './anonymous/login.vue'
import SignUp from './anonymous/sign-up.vue'
import PageNotFound from './shared/components/page-not-found.vue'

const routes = [
  {
    path: '',
    name: 'home',
    component: HelloWorld,
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '*',
    name: 'page not found',
    component: PageNotFound
  }
];

export default routes