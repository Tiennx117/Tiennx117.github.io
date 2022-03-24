import { API_URL, AUTHORIZATION_BASE } from '../../app-setting';
import HttpClient from './http/httpClient';
import { jsonToUrlencoded } from './http/htppUtils';
import { loadable } from './loadable';

//utils
export { findByType } from './findByType';
export { jsonToUrlencoded, loadable };
export const http = new HttpClient({
    apiUrl: API_URL,
    authorizationBase: AUTHORIZATION_BASE

});

