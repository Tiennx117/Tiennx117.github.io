
import { USER_SET_LIST_DATA, USER_SET_LIST_META } from './userConstant';

export function setData(userList) {
    return {
        type: USER_SET_LIST_DATA,
        userList: userList
    };
}

export function setMeta(meta) {
    return {
        type: USER_SET_LIST_META,
        meta: meta
    };
}