import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, FormCheck } from 'react-bootstrap';
import { PaginationComponent } from './PaginationComponent';
import { GridViewContext } from './GridViewContext';
class ColumnComponent extends Component {
    static propTypes = {
        className: PropTypes.string,
        title: PropTypes.string.isRequired,
        body: PropTypes.func.isRequired,
        sortKey: PropTypes.string,

    }
}
class TableComponent extends Component {
    static propTypes = {
        className: PropTypes.string, // thay đổi class của table
        data: PropTypes.array.isRequired, // data danh sách của table
        sort: PropTypes.object,
        keyExtractor: PropTypes.func,
        noSelected: PropTypes.bool,
        //option của pagination
        page: PropTypes.number,
        page_size: PropTypes.number,
        total: PropTypes.number,
        pageSizeOptions: PropTypes.array,
        handleChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            sort: props.sort || {},
            selected: {},
            prevProps: props
        };
        this.tbodyRef = React.createRef();
    }
    static getDerivedStateFromProps(props, state) {
        let prevProps = { ...state.prevProps };
        let nextState = null;
        if (prevProps.sort !== props.sort) {
            nextState = nextState || {};
            nextState.sort = prevProps.sort = props.sort || {};
        }
        //-------
        if (nextState) {
            nextState.prevProps = prevProps;
        }
        return nextState;

    }
    handleCheckAll(checked, contextValue) {
        let selected = this.state.selected;
        const textinputs = this.tbodyRef.querySelectorAll('.grid-selected input[type=checkbox]');
        let inputCanXL = [].filter.call(textinputs, function (el) {
            return el.checked !== checked;
        });
        inputCanXL.forEach((item) => {
            item.checked = checked;
            if (checked) {
                selected[item.value] = checked;
            } else {
                delete selected[item.value];
            }
        });
        this.setState({ selected: selected }, () => {
            this.processHanleChange('changeSelected',{ selected: this.state.selected},contextValue);
        });


    }
    handleCheckItem(key, checked, contextValue) {
        let selected = this.state.selected;
        if (checked) {
            selected[key] = checked;
            this.setState({
                selected: selected
            }, () => {
                this.processHanleChange('changeSelected',{ selected: this.state.selected},contextValue);
            });
        } else {
            delete selected[key];
            this.setState({
                selected: selected
            }, () => {
                this.processHanleChange('changeSelected',{ selected: this.state.selected},contextValue);                
            });
        }

    }

    handleSort(sortKey, contextValue) {
        const sort = {};
        let typeSort = this.state.sort[sortKey];
        if (typeSort) {
            typeSort = typeSort === 'asc' ? 'desc' : 'asc';
        }
        else {
            typeSort = 'asc';
        }
        sort[sortKey] = typeSort;
        this.setState({ sort: sort }, () => {
            this.processHanleChange('changeSort',{  sort: this.state.sort},contextValue);            
        });
    }
    processHanleChange(event, data, contextValue) {
        if (this.props.handleChange) {
            this.props.handleChange({ event: event, data: data });
        }
        if (contextValue && contextValue.gridViewHandleChange) {
            contextValue.gridViewHandleChange({ event: event, data: data });
        }
    }
    render() {
        const {
            className,
            keyExtractor,
            noSelected,
            // eslint-disable-next-line no-unused-vars
            sort,
            data,
            page,
            page_size,
            total,
            pageSizeOptions,
            // eslint-disable-next-line no-unused-vars
            handleChange,
            ...props } = this.props;
        return (
            <GridViewContext.Consumer>
                {(contextValue) => (
                    <div className={['grid-table', className].join(' ')} {...props} >
                        <Row>
                            <Col>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            {
                                                (!noSelected) &&
                                                <th className="grid-selected">
                                                    <FormCheck id="grid-select-all" custom type="checkbox" label="" onChange={(ev) => { this.handleCheckAll(ev.currentTarget.checked, contextValue); }}></FormCheck>
                                                </th>}
                                            {
                                                React.Children.map(props.children, (child, key) => {
                                                    // eslint-disable-next-line no-unused-vars
                                                    if (child.type.name === ColumnComponent.name) {
                                                        const {
                                                            title,
                                                            className,
                                                            // eslint-disable-next-line no-unused-vars
                                                            body,
                                                            sortKey,
                                                            ...props
                                                        } = child.props;
                                                        return (
                                                            <th key={key} className={['grid-header-col', className].join(' ')} {...props}>
                                                                {title}
                                                                {!!sortKey &&
                                                                    <span className={`sort float-right ${this.state.sort[sortKey]}`} onClick={() => { this.handleSort(sortKey, contextValue); }}>
                                                                        <i className="iconify asc-icon" data-icon="fa-solid:arrow-down" data-inline="false" data-width="10px" data-height="24px"></i>
                                                                        <i className="iconify desc-icon" data-icon="fa-solid:arrow-up" data-inline="false" data-width="10px" data-height="24px"></i>
                                                                    </span>
                                                                }
                                                            </th>
                                                        );
                                                    }

                                                })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody ref={(tbodyRef) => { this.tbodyRef = tbodyRef; }}>
                                        {
                                            data.map((item, index) => {
                                                return (
                                                    <tr id={`row-id-${keyExtractor({ item, index }) || index}`}
                                                        className={this.state.selected[keyExtractor({ item, index })] ? 'selected' : ''}
                                                        key={keyExtractor({ item, index }) || index}>
                                                        {
                                                            (!noSelected) &&
                                                            <td className="grid-selected">
                                                                <FormCheck id={keyExtractor({ item, index }) || index}
                                                                    custom type="checkbox" label=""
                                                                    value={keyExtractor({ item, index })}
                                                                    onChange={(ev) => { this.handleCheckItem(ev.currentTarget.value, ev.currentTarget.checked, contextValue); }}></FormCheck>
                                                            </td>}
                                                        {
                                                            React.Children.map(props.children, (child, key) => {
                                                                // eslint-disable-next-line no-unused-vars
                                                                if (child.type.name === ColumnComponent.name) {
                                                                    const {
                                                                        // eslint-disable-next-line no-unused-vars
                                                                        title,
                                                                        className,
                                                                        body,
                                                                        // eslint-disable-next-line no-unused-vars
                                                                        sortKey,
                                                                        ...props
                                                                    } = child.props;
                                                                    return <td key={key} className={['grid-col', className].join(' ')} {...props}>{body({ item, index })}</td>;
                                                                }
                                                            })
                                                        }
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <PaginationComponent
                            page={page}
                            page_size={page_size}
                            total={total}
                            pageSizeOptions={pageSizeOptions}
                            handleChange={(res) => {
                                this.processHanleChange(res.event, res.data, contextValue);
                            }}
                        ></PaginationComponent>
                    </div>
                )}

            </GridViewContext.Consumer>
        );
    }
}
TableComponent.Column = ColumnComponent;
TableComponent.displayName = 'GridViewTable';

export { TableComponent };
