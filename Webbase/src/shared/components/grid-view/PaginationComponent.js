import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormControl, Pagination } from 'react-bootstrap';
import {defaultPageOptions} from './defaultOptions';

class PaginationComponent extends React.Component {
    static propTypes = {
        page: PropTypes.number,
        page_size: PropTypes.number,
        total: PropTypes.number,
        pageSizeOptions: PropTypes.array,
        handleChange: PropTypes.func

    };

    constructor(props) {
        super(props);
        this.state = {
            page: props.page || defaultPageOptions.page,
            page_size: props.page_size || defaultPageOptions.page_size,
            total: props.total || defaultPageOptions.total,
            pageSizeOptions: defaultPageOptions.pageSizeOptions,
            prevProps: props
        };
        this.inputSelectPage = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        let prevProps = { ...state.prevProps };
        let nextState = null;
        if (prevProps.page !== props.page) {
            nextState = nextState || {};
            nextState.page = prevProps.page = props.page || defaultPageOptions.page;

        }
        if (prevProps.page_size !== props.page_size) {
            nextState = nextState || {};
            nextState.page_size = prevProps.page_size = props.page_size || defaultPageOptions.page_size;
        }
        if (prevProps.total !== props.total) {
            nextState = nextState || {};
            nextState.total = prevProps.total = props.total || defaultPageOptions.total;
        }
        if (prevProps.pageSizeOptions !== props.pageSizeOptions) {
            nextState = nextState || {};
            nextState.pageSizeOptions = prevProps.pageSizeOptions = props.pageSizeOptions || defaultPageOptions.pageSizeOptions;
        }
        if (nextState) {
            nextState.prevProps = prevProps;
        }
        return nextState;

    }

    onchangePageSize(page_size) {
        this.setState({ page_size: Number(page_size) }, () => {
            this.props.handleChange({
                event: 'changePageSize', data: {
                    page_size: this.state.page_size
                }
            });
        });
    }
    onChangePage(page) {
        const regexp = /^[0-9\b]+$/;
        //chỉ cho nhập số vả page phải nhỏ hơn < totalPage
        if (page === '' || regexp.test(page)) {
            if (page === '') {
                this.setState({ page: page });
            } else if (page <= this.getTotalPage()) {
                this.setState({ page: page });
            }
        }

    }
    onKeyDown(ev) {
        if (ev.key === 'Enter') {
            const page = ev.currentTarget.value || 1;
            this.setState({ page: Number(page) }, () => {
                this.props.handleChange({
                    event: 'changePage', data: {
                        page: this.state.page,
                    }
                });
            });
        }
    }
    onBlur(ev) {
        const page = ev.currentTarget.value || 1;
        this.setState({ page: Number(page) }, () => {
            this.props.handleChange({
                event: 'changePage', data: {
                    page: this.state.page,
                }
            });
        });
    }
    getTotalPage() {
        return Math.ceil(this.state.total / this.state.page_size) || 1;
    }
    toFristPage() {
        this.setState({ page: 1 }, () => {
            this.props.handleChange({
                event: 'changePage', data: {
                    page: this.state.page,
                }
            });
        });
    }
    toPrevPage() {
        this.setState({ page: this.state.page - 1 }, () => {
            this.props.handleChange({
                event: 'changePage', data: {
                    page: this.state.page,
                }
            });
        });
    }
    toNextPage() {
        this.setState({ page: this.state.page + 1 }, () => {
            this.props.handleChange({
                event: 'changePage', data: {
                    page: this.state.page,
                }
            });
        });
    }
    toLastPage() {
        this.setState({ page: this.getTotalPage() }, () => {
            this.props.handleChange({
                event: 'changePage', data: {
                    page: this.state.page,
                }
            });
        });
    }
    render() {
        return (
            <Row className="grid-pagination">
                <Col sm={6} className="d-none d-sm-flex">
                    <div className="select-page-size" >
                        <label>Hiển thị
                            <FormControl size="sm" as="select" aria-controls="selectEntries" custom value={this.state.page_size} onChange={(event) => { this.onchangePageSize(event.currentTarget.value); }}>
                                {this.state.pageSizeOptions.map((item, key) => {
                                    return <option key={key} value={item}>{item}</option>;
                                })
                                }
                            </FormControl> bản ghi</label>

                    </div>
                </Col>
                <Col sm={6}>
                    <Pagination className="float-sm-right  justify-content-center">
                        <Pagination.First disabled={this.state.page <= 1} onClick={this.toFristPage.bind(this)}>&lt;&lt;</Pagination.First>
                        <Pagination.Prev disabled={this.state.page <= 1} onClick={this.toPrevPage.bind(this)} />
                        <Pagination.Item className="select-page" active onClick={() => { this.inputSelectPage.current.select(); }}>
                            <FormControl size="sm"
                                ref={this.inputSelectPage}
                                value={this.state.page}
                                onChange={(event) => { this.onChangePage(event.currentTarget.value); }}
                                onKeyDown={this.onKeyDown.bind(this)}
                                onBlur={this.onBlur.bind(this)}
                            ></FormControl><span>/{this.getTotalPage()}</span>
                        </Pagination.Item>
                        <Pagination.Next disabled={this.state.page >= this.getTotalPage()} onClick={this.toNextPage.bind(this)} />
                        <Pagination.Last disabled={this.state.page >= this.getTotalPage()} onClick={this.toLastPage.bind(this)}>&gt;&gt;</Pagination.Last>
                    </Pagination>
                </Col>
            </Row>

        );
    }
}

export { PaginationComponent };
