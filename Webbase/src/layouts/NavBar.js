import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image, Dropdown, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { authService } from 'shared/services';
import UserImg from 'assets/images/user2-160x160.jpg';
class NavBar extends React.Component {

    getType() {
        switch (this.props.type) {
        case 'primary':
            return 'navbar-dark navbar-primary';
        case 'white':
            return 'navbar-light navbar-white';
        default:
            return 'navbar-light navbar-white';
        }

    }
    logout() {
        authService.logout();
    }
    render() {
        return (
            <nav className={'main-header navbar navbar-expand ' + this.getType()}>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        {/* eslint-disable-next-line*/}
                        <a className="nav-link" type="button" data-widget="pushmenu" onClick={this.props.onToggle}><i className="fa fa-bars"></i></a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <Dropdown as="li" className="nav-item">
                        <Dropdown.Toggle as="a" href="#" className="nav-link" bsPrefix="notification">
                            <i className="far fa-bell"></i>
                            <span className="badge badge-danger navbar-badge">15</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-lg" alignRight={true}>
                            <Dropdown.Item as="span" className="dropdown-header">15 Thông báo</Dropdown.Item>
                            <Dropdown.Item as="div" bsPrefix="dropdown-divider"></Dropdown.Item>
                            <Dropdown.Item as={Link} to="/home">
                                <i className="iconify mr-2" data-icon="fa:envelope" data-width="14px" data-inline="false"></i>
                                4 new messages
                                <span className="float-right text-muted text-sm">3 mins</span>
                            </Dropdown.Item>
                            <Dropdown.Item as="div" bsPrefix="dropdown-divider"></Dropdown.Item>
                            <Dropdown.Item as={Link} to="/about">
                                <i className="iconify mr-2" data-icon="fa:users" data-width="14px" data-inline="false"></i>
                                8 friend requests
                                <span className="float-right text-muted text-sm">12 hours</span>
                            </Dropdown.Item>
                            <Dropdown.Item as="div" bsPrefix="dropdown-divider"></Dropdown.Item>
                            <Dropdown.Item as={Link} to="/home">

                                <i className="iconify mr-2" data-icon="fa:file" data-width="14px" data-inline="false"></i>
                                3 new reports
                                <span className="float-right text-muted text-sm">2 days</span>
                            </Dropdown.Item>
                            <Dropdown.Item as="div" bsPrefix="dropdown-divider"></Dropdown.Item>
                            <Dropdown.Item as={Link} to="/home" className="dropdown-footer">Xem tất cả thông báo</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown as="li" className="nav-item user-menu">
                        {/* eslint-disable-next-line*/}
                        <Dropdown.Toggle as="a" href="#" className="nav-link">
                            <Image src={UserImg} className="user-image img-circle elevation-2" alt="User Image" />
                            <span className="d-none d-md-inline">{this.props.user.fullName}</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu as="ul" className="dropdown-menu-lg" alignRight={true}>
                            {/* User image  */}
                            <li className="user-header bg-primary">
                                <Image src={UserImg} className="img-circle elevation-2" alt="User Image" />
                                <p>
                                    {this.props.user.fullName}
                                    <small>{this.props.user.admin}</small>
                                </p>
                            </li>
                            {/* Menu Footer*/}
                            <li className="user-footer">
                                <Link to="/home" className="btn btn-default btn-flat">Tài khoản</Link>
                                <Button onClick={this.logout} className="btn btn-default btn-flat float-right">Đăng xuất</Button>
                               
                            </li>
                        </Dropdown.Menu>
                    </Dropdown>
                </ul>
            </nav>

        );
    }
}
NavBar.propTypes = {
    onToggle: PropTypes.func,
    type: PropTypes.string,
    user: PropTypes.object
};
const mapStateToProps = (state) => {
    return {
        user: state.oauth
    };
};
const NavBarComponent = connect(mapStateToProps, {})(NavBar);
export { NavBarComponent };