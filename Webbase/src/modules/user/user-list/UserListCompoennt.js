import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Breadcrumb, Card, Button, Form, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Page, GridView } from 'shared/components';
import { Context } from '../UserService';
import { UserAction } from 'redux/actions';



class UserList extends React.Component {
    static propTypes = {
        history: PropTypes.object,
        location: PropTypes.object,
        setData: PropTypes.func,
        setMeta: PropTypes.func,
        data: PropTypes.array,
        meta: PropTypes.object
    };
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            listUnitTraversalOption: [
                { id: 0, value: '0', name: 'Trực thuộc đơn vị' },
                { id: 1, value: '1', name: 'Cả đơn vị con' },
                { id: 2, value: '2', name: 'Toàn bộ đơn vị cấp dưới' }
            ]
        };
        this.subscriptions = {};

    }
    componentDidMount() {
        this.fetchData(this.props.meta);
    }
    componentWillUnmount() {
        Object.keys(this.subscriptions).forEach((key) => {
            this.subscriptions[key].unsubscribe();
        });
    }
    fetchData(meta) {
        this.setState({ loading: true });
        this.subscriptions['getmany'] = this.context.userService.getMany(meta).subscribe(res => {
            this.props.setData(res.data);
            this.props.setMeta({
                page: res.currentPage,
                page_size: res.pageSize,
                total: res.totalRows
            });
            this.setState({ loading: false });
        }, err => {
            console.log(err);
            this.setState({ loading: false });
        });

    }
    handleChange(res) {
        let newMeta = {};
        switch (res.event) {
        case 'changeSelected':
            // xử lý lưu lại các row select để xử lý nghiệp vụ như xóa nhiều, update nhiều
            break;
        case 'changePageSize':
            newMeta = Object.assign({}, this.props.meta, res.data);
            if (this.props.meta.page_size !== newMeta.page_size) {
                // this.props.setMeta({ page_size: newMeta.page_size });
                this.fetchData(newMeta);
            }
            break;
        case 'changePage':
            newMeta = Object.assign({}, this.props.meta, res.data);
            if (this.props.meta.page !== newMeta.page) {
                // this.props.setMeta({ page: newMeta.page });
                this.fetchData(newMeta);
            }
            break;
        case 'changeSort':
            newMeta = Object.assign({}, this.props.meta, res.data);
            if (this.props.meta.sort !== newMeta.sort) {
                this.props.setMeta({ sort: newMeta.sort });
                this.fetchData(newMeta);
            }
            break;
        case 'changeKeySearch':
            newMeta = Object.assign({}, this.props.meta, res.data);
            this.props.setMeta({ search: newMeta.search });
            this.fetchData(newMeta);

            break;
        case 'changeFilter':
            newMeta = Object.assign({}, this.props.meta, res.data);
            this.props.setMeta({ filter: newMeta.filter });
            this.fetchData(newMeta);

            break;
        default:
            break;
        }

    }
    addNew() {
        this.props.history.push({ pathname: '/user/form/new' });
    }
    viewDetail(item) {
        this.props.history.push({ pathname: `/user/form/${item.id}` });
    }
    async delete(item) {
        if (await this.context.beh.confirm('Bạn có muốn xóa bản ghi này')){
            this.context.userService.del(item.id).subscribe(() => {
                this.fetchData(this.props.meta);
            });
        }
        


    }
    render() {
        return (
            <Page>
                <Page.Header>
                    <Row className="mb-2">
                        <Col sm={6}>
                            <h1>Danh sách người dùng</h1>
                        </Col>
                        <Col sm={6}>
                            <Breadcrumb className="float-sm-right">
                                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>Trang chủ</Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    Người dùng
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                </Page.Header>
                <Page.Content>
                    <Card>
                        <Card.Body>
                            <GridView
                                loading={this.state.loading}
                                handleChange={this.handleChange.bind(this)}>
                                <GridView.Header
                                    keySearch={this.props.meta.search}
                                    ActionBar={
                                        <Button variant="primary" size="sm" onClick={this.addNew.bind(this)} >
                                            <span className="iconify fa" data-icon="fa-solid:plus" data-inline="false"></span>
                                        Thêm mới
                                        </Button>
                                    }
                                    AdvanceFilter={
                                        <Formik onSubmit={(values) => {
                                            this.handleChange({ event: 'changeFilter', data: { filter: values } });
                                        }}
                                        enableReinitialize={true}
                                        initialValues={this.props.meta.filter}
                                        >
                                            {({ handleSubmit, handleChange, values }) => (
                                                <Form noValidate onSubmit={handleSubmit}>
                                                    <Row>
                                                        <Col sm={6}>
                                                            <Form.Group controlId="donVi">
                                                                <Form.Control
                                                                    size="sm"
                                                                    type="numer"
                                                                    name="unitId"
                                                                    placeholder="Đơn vị"
                                                                    value={values.unitId}
                                                                    onChange={handleChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col sm={6}>
                                                            <Form.Group controlId="unitTraversalOption">
                                                                {
                                                                    this.state.listUnitTraversalOption.map((item, key) => {
                                                                        return (
                                                                            <Form.Check
                                                                                key={key}
                                                                                inline
                                                                                id={item.id}
                                                                                name="unitTraversalOption"
                                                                                type="radio"
                                                                                label={item.name}
                                                                                value={item.value}
                                                                                onChange={handleChange}
                                                                                checked={item.value === values.unitTraversalOption}
                                                                            />
                                                                        );
                                                                    })
                                                                }
                                                            </Form.Group>

                                                        </Col>
                                                        <Col xs={12} className="d-flex justify-content-center">
                                                            <Button size="sm" type="submit" variant="primary">
                                                                <span className="iconify" data-icon="fa-solid:search" data-inline="false" />
                                                                Tìm kiếm
                                                            </Button>


                                                        </Col>


                                                    </Row>

                                                </Form>
                                            )}
                                        </Formik>
                                    }
                                >
                                </GridView.Header>
                                <GridView.Table
                                    className="col-12"
                                    // noSelected={true} 
                                    data={this.props.data}
                                    keyExtractor={({ item }) => {
                                        return item.id;
                                    }}
                                    sort={this.props.meta.sort}
                                    page={this.props.meta.page}
                                    page_size={this.props.meta.page_size}
                                    total={this.props.meta.total}
                                >
                                    <GridView.Table.Column
                                        title="#"
                                        body={({ index }) => (
                                            <span>{index + 1}</span>
                                        )} />
                                    <GridView.Table.Column style={{ width: '20%' }}
                                        title="Tên tài khoản"
                                        sortKey="username"
                                        body={({ item }) => (
                                            <span>{item.username}</span>
                                        )} />
                                    <GridView.Table.Column style={{ width: '20%' }}
                                        title="Họ tên"
                                        sortKey="fullName"
                                        body={({ item }) => (
                                            <span>{item.fullName}</span>
                                        )} />
                                    <GridView.Table.Column style={{ width: '20%' }}
                                        title="Đơn vị"
                                        sortKey="unitName"
                                        body={({ item }) => (
                                            <span>{item.unitName}</span>
                                        )} />
                                    <GridView.Table.Column style={{ width: '20%' }}
                                        title="Số điện thoại"
                                        sortKey="phoneNumber"
                                        body={({ item }) => (
                                            <span>{item.phoneNumber}</span>
                                        )} />
                                    <GridView.Table.Column style={{ width: '20%' }}
                                        title="Email"
                                        sortKey="email"
                                        body={({ item }) => (
                                            <span>{item.email}</span>
                                        )} />
                                    <GridView.Table.Column className="view-action"
                                        title=""
                                        body={({ item }) => (
                                            <ButtonGroup size="sm">
                                                <Button variant="outline-info" onClick={() => { this.viewDetail(item); }}>
                                                    <span className="iconify" data-icon="fa-solid:info-circle" data-inline="false"></span>
                                                </Button>
                                                <Button variant="outline-danger" onClick={() => { this.delete(item); }}>
                                                    <span className="iconify" data-icon="fa-solid:trash-alt" data-inline="false"></span>
                                                </Button>

                                            </ButtonGroup>
                                        )} />
                                </GridView.Table>
                            </GridView>
                        </Card.Body>
                    </Card>
                </Page.Content >
            </Page >
        );
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.user.userList,
        meta: state.user.meta
    };
};
const UserListComponent = connect(mapStateToProps, UserAction)(UserList);
export { UserListComponent };