import { shallowMount, createLocalVue } from "@vue/test-utils";
import Login from "@/anonymous/login.vue";
import VeeValidate from 'vee-validate';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import store from '@/store';
import loginModule from '@/store/login.module';

let url = '';
let body = {};
let mockError = false;

jest.mock("axios", () => ({
  post: (_url, _body) => {
    return new Promise((resolve) => {
      if (mockError)
        throw Error("Mock error");
      url = _url;
      body = _body;
      resolve({ data: { token: 'fake jwt token' } });
    })
  }
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
      store
    });

  })

  afterEach(() => {
    wrapper.destroy();
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('authentication API is working', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    const payload = { username: 'om@g.com', password: 'omprakash' };

    await loginModule.actions.login({ dispatch, commit }, payload);

    expect(url).toBe(process.env.VUE_APP_API_URL + '/users/authenticate');
    expect(commit).toHaveBeenCalledWith("profile", { token: 'fake jwt token' });
  })

});