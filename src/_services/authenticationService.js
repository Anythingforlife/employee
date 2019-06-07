import { httpService } from '../core';
import { storageService } from './storageService';

export const authenticationService = {
    login,
    register,
    logout
}

function login(credentials) {
    return httpService.post('/users/authenticate', credentials);
}

function register(user) {
    return httpService.post('/users/register', user);
}

function logout() {
    storageService.removeData('user'); 
}