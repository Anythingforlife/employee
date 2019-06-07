import axios from 'axios';

import { sharedSerivce } from '../_services/sharedService';
export const Interceptor = {
    request,
    response
}

function request() {
    axios.interceptors.request.use(function (config) {
        sharedSerivce.showHideLoader(true);
        return config;
    }, function (error) {
        sharedSerivce.showHideLoader(false);
        return Promise.reject(error);
    });
}

function response() {
    axios.interceptors.response.use(function (response) {
        sharedSerivce.showHideLoader(false);
        return response;
    }, function (error) {
        sharedSerivce.showHideLoader(false);
        return Promise.reject(error);
    });
}