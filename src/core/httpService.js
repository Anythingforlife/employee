import Vue from 'vue'
import axios from 'axios';
export const httpService = {
    get,
    post,
    putMethod,
    deleteMethod
}

/**
 * Get method
 * 
 * @param {string} url 
 */
function get(url) {
    return axios.get(Vue.config.apiURL + url).then(handleResponse).catch(handleError);
}

/**
 * Post method
 * @param {string} url 
 * @param {any} data 
 */
function post(url, data) {
    return axios.post(Vue.config.apiURL + url, data).then(handleResponse).catch(handleError);
}

/**
 * Put method
 * @param {string} url 
 * @param {any} data 
 */
function putMethod(url, data) {
    return axios.put(Vue.config.apiURL + url, data).then(handleResponse).catch(handleError);
}

/**
 * Delete method
 * @param {string} url 
 */
function deleteMethod(url, data) {
    return axios.delete(Vue.config.apiURL + url).then(handleResponse).catch(handleError);
}

/**
 * Handle response data
 * 
 * @param {any} response 
 */
function handleResponse(response) {
    return response.data;
}

/**
 * Handle error data
 * @param {any} error 
 */
function handleError(error) {
    return Promise.reject(error.response ? error.response.data : { message: error.message });
}