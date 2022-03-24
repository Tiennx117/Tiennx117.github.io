import { OAUTH_SET_TOKEN, OAUTH_REMOVE_TOKEN } from './oauthConstant';

const tokenDefault = {
    access_token: null,
    expires: null,
    refresh_token: null,
    fullName: null,
    username: null,
    unitId: null,
    privileges: []
};
const oauthReducer = (state = tokenDefault, action) => {
    switch (action.type) {
    case OAUTH_SET_TOKEN:
        return Object.assign({}, state, action.token);
    case OAUTH_REMOVE_TOKEN:
        return Object.assign({}, state, tokenDefault);
    default:
        return state;
    }
};
export  {oauthReducer};