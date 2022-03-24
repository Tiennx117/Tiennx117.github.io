import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { GridViewContext } from './GridViewContext';


class GridViewHeaderComponent extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        ActionBar: PropTypes.element,
        AdvanceFilter: PropTypes.element,
        keySearch: PropTypes.string,
        handleChange: PropTypes.func,
        isWrapper: PropTypes.bool

    };

    constructor(props) {
        super(props);
        this.state = {
            isAdvSearchOpen: false,
            keySearch: props.keySearch || '',
        };

    }

    handleToggleAdvBtn() {
        this.setState({ isAdvSearchOpen: !this.state.isAdvSearchOpen });
    }
    handleChange(ev) {
        this.setState({ keySearch: ev.currentTarget.value });
    }
    handleKeyDown(ev, contextValue) {
        if (ev.key === 'Enter') {
            const keySearch = ev.currentTarget.value;
            this.processHanleChange('changeKeySearch', { search: keySearch }, contextValue);
        }
    }
    handleClickSeachBtn(contextValue) {
        this.processHanleChange('changeKeySearch', { search: this.state.keySearch }, contextValue);
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
        return (
            <GridViewContext.Consumer>
                {(contextValue) => (
                    <Row className="mb-3 grid-view-header" >
                        <Col xs={12}>
                            {!this.props.isWrapper &&
                                <React.Fragment>
                                    <Row className="grid-view-action-bar">
                                        <Col sm={6} md={5}>
                                            <InputGroup size="sm" className="filter">
                                                <FormControl
                                                    type="text"
                                                    name="keySearch"
                                                    placeholder="Tìm kiếm"
                                                    aria-label="Search"
                                                    autoFocus
                                                    value={this.state.keySearch}
                                                    onChange={(ev) => { this.setState({ keySearch: ev.currentTarget.value }); }}
                                                    onKeyDown={(ev) => { this.handleKeyDown(ev, contextValue); }}
                                                />
                                                <InputGroup.Append className="btn-filter-basic" onClick={() => { this.handleClickSeachBtn(contextValue); }}>
                                                    <Button variant="primary">
                                                        <span className="iconify" data-icon="fa-solid:search" data-inline="false" />
                                                    </Button>

                                                </InputGroup.Append>
                                                {
                                                    this.props.AdvanceFilter &&
                                                    <InputGroup.Append className="btn-filter-advance" onClick={this.handleToggleAdvBtn.bind(this)}>
                                                        <Button variant="link" title="Tìm kiếm mở rộng">
                                                            Mở rộng
                                                        </Button>

                                                    </InputGroup.Append>
                                                }


                                            </InputGroup>

                                        </Col>
                                        <Col>
                                            <div className="float-sm-right">
                                                {this.props.ActionBar}
                                            </div>
                                        </Col>
                                    </Row>
                                    {
                                        (this.state.isAdvSearchOpen && this.props.AdvanceFilter) &&
                                        <Row className="filter-adv-container mt-3">
                                            <Col xs={12}>
                                                <fieldset>
                                                    <legend>Tìm kiếm mở rộng</legend>
                                                    {this.props.AdvanceFilter}
                                                </fieldset>
                                            </Col>
                                        </Row>
                                    }
                                </React.Fragment>
                            }
                            {
                                // eslint-disable-next-line react/prop-types
                                this.props.children
                            }
                        </Col>

                    </Row>
                )}
            </GridViewContext.Consumer>

        );
    }
}

GridViewHeaderComponent.displayName = 'GridViewHeader';
export { GridViewHeaderComponent };
