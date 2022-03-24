import { tap } from 'rxjs/operators';
import { CLIENT } from '../../app-setting';
import { http } from '../utils';
import { store } from 'redux/store';
import { OauthAction } from 'redux/actions';
class AuthService {
    constructor(_dispatch, { setToken, removeToken }) {
        this.dispatch = _dispatch;
        this.action = {
            setToken, removeToken
        };
    }
    login(data) {
        
        const body = {
            grant_type: 'password',
            username: data.username,
            password: data.password,
            client_id: CLIENT.client_id,
            client_secret: CLIENT.client_secret,
        };
        return http.post('api/token/auth',body).pipe(tap((res) => {
            this.dispatch(this.action.setToken(res));
        }));
    }
    logout() {
        this.dispatch(this.action.removeToken());
    }
}
const authService = new AuthService(store.dispatch, OauthAction);
export { authService, AuthService };
