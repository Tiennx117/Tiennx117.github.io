import AdminLTELogo from 'assets/images/AdminLTELogo.png';

import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();

    }
    componentDidMount() {
        document.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        // khi unmount phải hủy listen click out side
        document.removeEventListener('click', this.handleClick);
    }

    handleClick = (event) => {
        const { target } = event;
        //kiểm tra xem nếu click bên trong sidebar và giao diện mobile thì ẩn sidebar
        if (this.wrapperRef.current.contains(target)) {
            let width = window.innerWidth;
            if (width <= 992) {
                console.log(width);
                this.props.onClick(target);
            }
        }
    }
    render() {
        return (
            <aside ref={this.wrapperRef} className="main-sidebar sidebar-dark-primary elevation-4">

                <Link to="/home" className="brand-link">
                    <Image src={AdminLTELogo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />
                    <span className="brand-text font-weight-light">AdminLTE 3</span>
                </Link>
                <div className="sidebar">
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item has-treeview menu-open">
                                <Link to="/home" className="nav-link active">
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        Menu
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview" >
                                    <li className="nav-item">
                                        <Link to="/home" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Home</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">

                                        <Link to="/about" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>About</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">

                                        <Link to="/user" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Người dùng</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">

                                        <Link to="/user-modal" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Người dùng modal</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">

                                        <Link to="/demo-control" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Demo control</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item has-treeview menu-open">
                                <Link to="/home" className="nav-link">
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        Demo
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </Link>
                                <ul className="nav nav-treeview" >
                                    <li className="nav-item">
                                        <Link to="/table" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>ExampleTable</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">

                                        <Link to="/modal" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>ExampleModal</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">

                                        <Link to="/validate-form" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Validate Form</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>





                        </ul>
                    </nav>

                </div>

            </aside>
        );
    }
}
