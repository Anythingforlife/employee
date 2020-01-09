import { shallowMount, createLocalVue } from "@vue/test-utils";
import Login from "@/anonymous/login.vue";
import VeeValidate from 'vee-validate';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import store from '@/store';
import loginModule from '@/store/login.module';
import toasterModule from '@/store/toaster.module';
import { router } from '@/_helpers';

let url = '';
let body = {};
let mockError = false;
let mockUsers = [ { username: 'om@g.com', password: 'omprakash' } , [ { username: 'user2', password: 'user2' }]];

jest.mock("axios", () => ({
  post: (_url, _body) => {
    return new Promise((resolve) => {
      url = _url;
      body = _body;

      if (mockUsers.find(user=>user.username===_body.username && user.password===_body.password)) {
        resolve({ data: { token: 'fake jwt token' } });
        return;
      }
       throw Error("{message : 'username or password is invalid'}");        
    })
  },
}))


const localVue = createLocalVue();
localVue.use(VeeValidate, { fieldsBagName: 'veeFields' });
localVue.use(VueRouter);
localVue.use(Vuex);

describe("Login.vue", () => {

  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(Login, {
      localVue,
      store,
      router
    });

  })

  afterEach(() => {
    wrapper.destroy();
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  

    it('login functionality authentication success', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      const spy = jest.fn(); 
      wrapper.vm.$router.push =  spy;

    const payload = { username: 'om@g.com', password: 'omprakash' };

    await loginModule.actions.login({ dispatch, commit }, payload);

      expect(url).toBe(process.env.VUE_APP_API_URL + '/users/authenticate');
      expect(commit).toHaveBeenCalledWith("profile", { token: 'fake jwt token' });  
      expect(spy).toHaveBeenCalledWith({ path: '/home' });
    })



  it('login functionality authentication failure', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    const payload = { username: 'om@g.com', password: 'om' };

    await loginModule.actions.login({ dispatch, commit }, payload);

    expect(dispatch).toHaveBeenCalledWith("toaster/error","{message : 'username or password is invalid'}" ,{root:true});  
    toasterModule.actions.error({ dispatch, commit },'username or password is invalid');
    expect(commit).toHaveBeenCalledWith("message",{message : 'username or password is invalid', 'type':'error'});  
  })

});