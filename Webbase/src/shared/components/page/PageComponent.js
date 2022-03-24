import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PageContext = React.createContext();

class Header extends Component {
    static propTypes = {
        className: PropTypes.string
    };
    render() {
        const { className, ...props } = this.props;
        return (
            <PageContext.Consumer>
                {() => (
                    <section className={['content-header', className].join(' ')} {...props}>{props.children}</section>
                )}
            </PageContext.Consumer>

        );
    }

}

class Content extends Component {
    static propTypes = {
        className: PropTypes.string
    };
    render() {
        const { className, ...props } = this.props;
        return (
            <PageContext.Consumer>
                {() => (
                    <section className={['content', className].join(' ')} {...props}>{props.children}</section>
                )}
            </PageContext.Consumer>

        );
    }

}
class PageComponent extends Component {
    static propTypes = {
        children: PropTypes.array,
    };


    render() {
        return (
            <PageContext.Provider {...this.props}>
                {this.props.children}
            </PageContext.Provider>
        );
    }
}
PageComponent.Header = Header;
PageComponent.Content = Content;
export { PageComponent };