import { combineReducers } from 'redux';
import { oauthReducer } from './oauth/oauthReducer';
import { userReducer } from './user/userReducer';
const reducer = combineReducers({
    oauth: oauthReducer,
    user:userReducer
});
export default reducer;