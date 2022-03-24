import React from 'react';
import { Redirect } from 'react-router-dom';
class LogoutComponent extends React.Component {

    renderRedirect() {
        // call service logout tại đây
        // userService.logout();
        return <Redirect to='/login' />;
    }
    render() {
        return (
            <div>
                {this.renderRedirect()}
            </div>
        );
    }
}

export { LogoutComponent };