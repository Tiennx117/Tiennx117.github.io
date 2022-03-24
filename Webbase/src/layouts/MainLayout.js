import React from 'react';
import { Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from 'shared/components';
import { routes } from './MainRoutes';

import Wrapper from './Wrapper';
import { NavBarComponent } from './NavBar';
import SideBar from './SideBar';
import Footer from './Footer';


//export default function AuthLayout() {
class MainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        };
        this.handlerClickToggle = this.handlerClickToggle.bind(this);
    }
    handlerClickToggle() {
        this.setState({
            toggle: !this.state.toggle
        });
    }
    render() {
        return (
            <Wrapper
                toggle={this.state.toggle}
                navbar={<NavBarComponent onToggle={this.handlerClickToggle} />}
                sidebar={<SideBar onClick={this.handlerClickToggle} />}
                footer={<Footer></Footer>}>
                <Switch>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </Wrapper>
        );
    }
}
export { MainLayout };



