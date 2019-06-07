import { httpService } from '../core/httpService';

export const authenticationService = {
    login,
    register
}

function login(credentials) {
    return httpService.post('/users/authenticate', credentials);
}

function register(user) {
    return httpService.post('/users/register', user);
}