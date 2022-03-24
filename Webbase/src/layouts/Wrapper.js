import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class Wrapper extends Component {
    static propTypes = {
        toggle: PropTypes.bool,
        navbar: PropTypes.element,
        sidebar: PropTypes.element,
        children: PropTypes.element,
        footer: PropTypes.element,
    };

    getClassSideBar() {
        let width = window.innerWidth;

        if (width >= 992) {
            return this.props.toggle ? 'text-sm layout-navbar-fixed sidebar-mini sidebar-collapse' : 'text-sm layout-navbar-fixed sidebar-mini';
        } else {
            return this.props.toggle ? 'text-sm layout-navbar-fixed sidebar-mini sidebar-open ' : 'text-sm layout-navbar-fixed sidebar-mini';
        }
    }

    render() {
        this.getClassSideBar();
        return (
            <div className={this.getClassSideBar()}>
                <div className="wrapper">
                    {this.props.navbar}
                    {this.props.sidebar}
                    <div className="content-wrapper">
                        {this.props.children}
                    </div>

                    {this.props.footer}
                </div>
            </div>
        );
    }
}
