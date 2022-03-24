import { createContext } from 'react';
import { BaseService } from 'shared/services';
import { http, jsonToUrlencoded } from 'shared/utils';
class DemoControlService extends BaseService {
    // constructor(props) {
    //     super(props);
    // }
    getGroupUser(){
        return http.get('api/lookup/roles?_=1585883351247');
    }
    create(obj) {
        let jsonFormUrl = jsonToUrlencoded(obj);
        return http.post(`${this.url}`, jsonFormUrl, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
    update(obj, id) {
        delete obj.password;
        let jsonFormUrl = jsonToUrlencoded(obj);
        return http.put(`${this.url}/${id}`, jsonFormUrl, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

}

const Context = createContext({
    userService: new DemoControlService()
});
export { Context, DemoControlService };
