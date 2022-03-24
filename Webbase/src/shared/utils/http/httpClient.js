import axios from 'axios';
import { HttpHandle, HttpErrorResponse } from './htppUtils';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { take, filter, catchError, switchMap, finalize, map } from 'rxjs/operators';
import { store } from 'redux/store';
import { CLIENT } from 'app-setting';
import { OauthAction } from 'redux/actions';



export default class HttpClient {
    constructor(options = {}) {
        this.apiUrl = options.apiUrl;
        this.authorizationBase = options.authorizationBase;
        this.tokenSubject = new BehaviorSubject(null);
        this.isRefreshingToken = false;
        axios.defaults.baseURL = this.apiUrl;
        const that = this;        
        store.subscribe(() => {
            that.oauth = store.getState().oauth;
        });       
    }

    request(config) {
        return HttpHandle(this.updateConfig(config, this.oauth)).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse) {
                switch (error.status) {
                case 400:
                    return this.handle400Error(error);
                case 401:
                    return this.handle401Error(config, error);
                default:
                    return throwError(error);

                }
            } else {
                return throwError(error);
            }
        }));
    }
    get(url, config) {
        return this.request(
            Object.assign(
                {},
                {
                    method: 'get',
                    url: url
                },
                config)
        );

    }
    delete(url, config) {
        return this.request(
            Object.assign(
                {},
                {
                    method: 'delete',
                    url: url
                },
                config)
        );

    }
    head(url, config) {
        return this.request(
            Object.assign(
                {},
                {
                    method: 'head',
                    url: url
                },
                config)
        );

    }
    options(url, config) {
        return this.request(
            Object.assign(
                {},
                {
                    method: 'options',
                    url: url
                },
                config)
        );
    }
    post(url, data, config) {
        return this.request(
            Object.assign(
                {},
                {
                    method: 'post',
                    url: url,
                    data: data
                },
                config)
        );
    }
    put(url, data, config) {
        return this.request(
            Object.assign(
                {},
                {
                    method: 'put',
                    url: url,
                    data: data
                },
                config)
        );

    }
    patch(url, data, config) {
        return this.request(
            Object.assign(
                {},
                {
                    method: 'patch',
                    url: url,
                    data: data
                },
                config)
        );
    }
    getUri(config) {
        return axios.getUri(config);
    }
    updateConfig(config, token, isOverwrite) {
        let access_token = '';
        if (token) {
            access_token = `Bearer ${token.access_token}`;
        }
        // chỉnh sửa lại request để add thêm token vào header, chỉnh sửa lại url của request
        config.headers = config.headers || {};
        const headers = config.headers;
        if (headers.Authorization && !isOverwrite) {
            access_token = headers.Authorization;
        }
        config.headers.Authorization = access_token;
        return config;
    }
    handle400Error(error) {
        return throwError(error);
    }
    handle401Error(config, error) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);
            return this.refreshToken().pipe(
                catchError(err => {
                    // If there is an exception calling 'refreshToken', bad news so logout.
                    if (err) {
                        this.logoutUser();

                    }
                    return throwError(error);
                }),
                switchMap((newToken) => {
                    if (newToken) {
                        this.tokenSubject.next(newToken);
                        return HttpHandle(this.updateConfig(config, newToken, true));

                    }
                    // If we don't get a new token, we are in trouble so logout.
                    this.logoutUser();
                    return throwError(error);
                }),
                finalize(() => {
                    this.isRefreshingToken = false;
                }));
        } else {
            return this.tokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(token => {
                    return HttpHandle(this.updateConfig(config, token, true));
                }));
        }
    }
    refreshToken() {
        if (this.oauth && this.oauth.refresh_token) {
            const body = {
                grant_type: 'refresh_token',
                refresh_token: this.oauth.refresh_token,
                client_id: CLIENT.client_id,
                client_secret: CLIENT.client_secret,
            };
            return this.post('api/token/auth', body).pipe(map(res => {
                const newToken = res;
                store.dispatch(OauthAction.setToken(newToken));
                return newToken;
            }));

        } else {
            return new Observable(observable => {
                observable.next(false);
            });
        }
    }
    logoutUser() {
        // Route to the login page (implementation up to you)        
        store.dispatch(OauthAction.removeToken());

    }
}

