import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RouteGuard extends React.Component {

    isAuthenticated() {
        return !!this.props.oauth.access_token;
    }
    render() {
        const { component: Component, ...rest } = this.props;
        const renderRoute = props => {
            if (this.isAuthenticated()) {
                return (
                    <Component {...props} />
                );
            }
            const to = {
                pathname: '/login',
                state: { from: props.location }
            };            
            return (
                <Redirect to={to} />
            );
        };
        return (
            <Route {...rest} render={renderRoute} />

        );
    }
}
RouteGuard.propTypes = {
    component: PropTypes.func,
    oauth: PropTypes.object
};
const mapStateToProps = (state) => {
    return {
        oauth: state.oauth
    };
};
const RouteGuardComponent = connect(mapStateToProps, {})(RouteGuard);
export { RouteGuardComponent };
