import { http } from '../utils';

class BaseService {
    constructor(props = {}) {
        this.url = props ? props.url: '';
        this.http=http;
    }
    getMany(props) {
        const { page, page_size, sort, search, filter } = props;
        let sortBy = '';
        let sortDesc = false;
        let username = search; // do api chua co tim kiem theo tu khoa nen de tam search se tim kiem theo username
        if (sort) {
            sortBy = Object.keys(sort)[0];
            sortDesc = sort[sortBy] === 'desc';
        }
        const params = Object.assign({}, {
            page: page,
            itemsPerPage: page_size,
            sortBy: sortBy,
            sortDesc: sortDesc,
            username: username
        }, filter);
        return http.get(`${this.url}/list`, { params: params });
    }
    getById(id) {
        return http.get(`${this.url}/${id}`);
    }
    create(obj) {
        return http.post(`${this.url}`, obj);
    }
    update(obj, id) {
        return http.put(`${this.url}/${id}`, obj);
    }
    del(id) {
        return http.delete(`${this.url}/${id}`);
    }
    // dels(listId = []): Observable<any> {
    //     //return this.http.post<any>(this.url + '/deletes', listId);
    // }
}

export { BaseService };
