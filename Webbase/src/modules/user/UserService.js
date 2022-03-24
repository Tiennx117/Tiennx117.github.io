import { createContext } from 'react';
import { BaseService } from 'shared/services';
class UserService extends BaseService {
    constructor(props) {
        const _props = Object.assign({}, { url: 'api/users' }, props);
        super(_props);
    }

    getGroupUser() {
        return this.http.get('api/lookup/roles?_=1585883351247');
    }
}
const Context = createContext({
    userService: new UserService()
});
export { Context, UserService };