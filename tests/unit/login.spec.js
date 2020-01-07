import { shallowMount, createLocalVue } from "@vue/test-utils";
import Login from "@/anonymous/login.vue";
import VeeValidate from 'vee-validate';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import store from '@/store';

let url = 'test'
let body = {}
let mockError = false

jest.mock("axios", () => ({
  post: (_url, _body) => {
    return new Promise((resolve) => {
      if (mockError)
        throw Error("Mock error")

      url = _url
      body = _body
      resolve(true)
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
    const payload = { username: 'om', password: 'omprakash' };
    await store._actions['login/login'][0]({ commit }, payload);
    expect(url).toBe(process.env.VUE_APP_API_URL + '/users/authenticate');
    // expect(body).toEqual(payload);
    // expect(commit).toHaveBeenCalledWith("profile", true);
  })

});