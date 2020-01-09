import { mount, createLocalVue } from "@vue/test-utils";
import BootstrapVue from "bootstrap-vue";
import Vuex from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Toaster from 'v-toaster';
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';

import Home from "@/authenticated/Home.vue";
import store from '@/store';
import { router } from '@/_helpers';

library.add(faPowerOff);

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(Toaster, { timeout: 5000 });
localVue.use(VeeValidate, { fieldsBagName: 'veeFields' });


localVue.component('font-awesome-icon', FontAwesomeIcon)

describe("Home.vue", () => {

    let wrapper = null;

    beforeEach(() => {
        wrapper = mount(Home, {
            localVue,
            store,
            router
        })
    })

    afterEach(() => {
        wrapper.destroy();
    })

    it('is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

});