import { USER_SET_LIST_DATA, USER_SET_LIST_META } from './userConstant';

const user = {
    userList: [],
    meta: {
        page: 1,
        page_size: 20,
        sort: {username:'asc'},
        search: '',
        filter: {
            unitId: '',
            unitTraversalOption: '0',
            _: new Date().getTime()
            
        },
    }
};
const userReducer = (state = user, action) => {
    switch (action.type) {
    case USER_SET_LIST_DATA:
        return Object.assign({}, state, { userList: action.userList });
    case USER_SET_LIST_META:
        return Object.assign(
            {}, 
            state, 
            { 
                meta: Object.assign(
                    {}, 
                    state.meta, 
                    action.meta
                )
            });
    default:
        return state;
    }
};
export  {userReducer};