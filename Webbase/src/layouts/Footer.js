import React from 'react';
import { Link } from 'react-router-dom';
export default class Footer extends React.Component {
    render() {
        return (
            <footer className="main-footer">
                <strong>Copyright © 2020 <Link to="/home">Thien Hoang Solution</Link>. </strong>
            All rights reserved.
                <div className="float-right d-none d-sm-inline-block">
                    <b>Version</b> 3.0.0
                </div>
            </footer>
        );
    }
}
