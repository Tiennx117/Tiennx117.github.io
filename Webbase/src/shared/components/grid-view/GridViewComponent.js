import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import {LoadingComponent} from '../LoadingComponent';
import { TableComponent } from './TableComponent';
import { GridViewHeaderComponent } from './GridViewHeaderComponent';
import { findByType } from '../../utils';
import { GridViewContext } from './GridViewContext';
class GridViewComponent extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        handleChange: PropTypes.func,
        loading:PropTypes.bool,

    };

    constructor(props) {
        super(props);
        this.state = {
            isAdvSearchOpen: false,
        };
    }
    componentDidMount() {
    }

    handleToggleAdvBtn() {
        this.setState({ isAdvSearchOpen: !this.state.isAdvSearchOpen });
    }
    renderTable() {
        // eslint-disable-next-line react/prop-types
        const { children } = this.props;
        // First we try to find the Title sub-component among the children of Article
        const table = findByType(children, TableComponent);
        // If we don’t find any we return null
        if (!table) {
            return null;
        }
        // Else we return the children of the Title sub-component as wanted
        return table;
    }
    renderHeader() {
        // eslint-disable-next-line react/prop-types
        const { children } = this.props;
        // First we try to find the Title sub-component among the children of Article
        const header = findByType(children, GridViewHeaderComponent);
        // If we don’t find any we return null
        if (!header) {
            return null;
        }
        // Else we return the children of the Title sub-component as wanted
        return header;
    }
    render() {
        return (

            <GridViewContext.Provider value={{ gridViewHandleChange: this.props.handleChange }}>
                <div className="grid-view">
                    {this.renderHeader()}
                    <Row className="grid-view-body">
                        {this.renderTable()}
                    </Row>
                    <LoadingComponent loading={this.props.loading}/>
                    
                </div>
            </GridViewContext.Provider>
        );
    }
}
GridViewComponent.Table = TableComponent;
GridViewComponent.Header=GridViewHeaderComponent;
export { GridViewComponent };
