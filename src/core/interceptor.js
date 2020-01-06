import axios from 'axios';

import { sharedService } from '../_services/sharedService';
export const Interceptor = {
    request,
    response
}

function request() {
    axios.interceptors.request.use(function (config) {
        sharedService.showHideLoader(true);
        return config;
    }, function (error) {
        sharedService.showHideLoader(false);
        return Promise.reject(error);
    });
}

function response() {
    axios.interceptors.response.use(function (data) {
        sharedService.showHideLoader(false);
        return data;
    }, function (error) {
        sharedService.showHideLoader(false);
        return Promise.reject(error);
    });
}