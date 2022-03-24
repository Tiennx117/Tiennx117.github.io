
import { OAUTH_SET_TOKEN, OAUTH_REMOVE_TOKEN } from './oauthConstant';

export function setToken(token) {
    return {
        type: OAUTH_SET_TOKEN,
        token: token
    };
}

export function removeToken() {
    return {
        type: OAUTH_REMOVE_TOKEN
    };
}