import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Context,UserService} from './UserService';
import { BehaviorsContext} from 'shared/services';
import { UserListComponent } from './user-list/UserListCompoennt';
import { UserFormComponent } from './user-form/UserFormComponent';

class UserModule extends React.Component {
    static propTypes = {
        match: PropTypes.object,
    }
    render() {
        return (
            <BehaviorsContext.Consumer> 
                {({ beh }) => (     
                    <Context.Provider value={{
                        userService:new UserService(),
                        beh:beh
                    }}>
                        <Switch>
                            
                            <Route path={`${this.props.match.path}/view`} render={(props) => <UserListComponent {...props} />} />
                            <Route path={`${this.props.match.path}/form/:id`} render={(props) => <UserFormComponent {...props} />} />
                            <Route path={this.props.match.path} render={(props) => <UserListComponent {...props} />} />
                        </Switch>
                    </Context.Provider>
                )}
            </BehaviorsContext.Consumer > 
         
        );
    }
}

export { UserModule };