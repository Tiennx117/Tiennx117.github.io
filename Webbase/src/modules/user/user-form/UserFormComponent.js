import React from 'react';
import PropTypes from 'prop-types';
import { Row, Form, Col, Button, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { string, object } from 'yup';
import { Card } from 'react-bootstrap';
import { Page, LoadingComponent } from 'shared/components';
import { Context } from '../UserService';


const schema = object({
    username: string().required('Tên tài khoản không được để trống'),
    fullName: string().required('Họ và tên không được để trống'),
    unitId: string().required('Đơn vị không được để trống'),
    email: string().email('Email không đúng định dạng').nullable(),

});

class UserFormComponent extends React.Component {
    static propTypes = {
        history: PropTypes.object,
        location: PropTypes.object,
        match: PropTypes.object,
    };
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: '',
                fullName: '',
                unitId: '1',
                email: '',
                phoneNumber: '',
                password: '',
                passwordConfirmation: '',
                birthDay: '',
                roleIds: []
            },
            listGroup: [],
            editMode: false,
            loading: false
        };

    }
    componentDidMount() {
        let id = this.props.match.params.id;
        if (id !== 'new') {
            //get by id
            this.setState({
                loading: true
            });
            this.context.userService.getById(id).subscribe(res => {
                res.password = '';
                this.setState({
                    data: res,
                    loading: false
                });
            });
        } else {
            this.setState({
                editMode: true
            });
        }

        this.context.userService.getGroupUser().subscribe((res => {
            this.setState({
                listGroup: res
            });
        }));

    }
    onSubmit(data) {
        let id = this.props.match.params.id;
        this.setState({
            loading: true
        });
        if (id !== 'new') {
            this.context.userService.update(data, id).subscribe(() => {
                this.context.userService.getById(id).subscribe(res => {
                    res.password = '';
                    this.setState({
                        data: res,
                        editMode: false,
                        loading: false
                    });
                });
            },
                (err) => {
                    this.setState({
                        loading: false
                    });
                    alert(err.error.error);
                });

        } else {
            this.context.userService.create(data).subscribe(() => {
                const { from } = this.props.location.state || { from: { pathname: '/user/list' } };
                this.props.history.push(from);
            },
                (err) => {
                    this.setState({
                        loading: false
                    });
                    alert(err.error.error);
                });

        }

    }
    onEdit() {
        this.setState({
            editMode: true
        });
    }


    render() {

        return (
            <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                    this.onSubmit(values);
                }}
                enableReinitialize={true}
                initialValues={this.state.data}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
                }) => (
                        <Page>
                            <Page.Header>

                                <Row className="mb-2">
                                    <Col sm={6}>
                                        <h1>Thông tin tài khoản</h1>
                                    </Col>
                                    <Col sm={6}>
                                        <Breadcrumb className="float-sm-right">
                                            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }} >Trang chủ</Breadcrumb.Item>
                                            <Breadcrumb.Item active>
                                                Người dùng
                                        </Breadcrumb.Item>
                                        </Breadcrumb>
                                    </Col>
                                </Row>
                            </Page.Header>
                            <Page.Content>
                                <Card>
                                    <LoadingComponent loading={this.state.loading}></LoadingComponent>
                                    <Card.Body>
                                        <Form noValidate onSubmit={handleSubmit}>
                                            <Form.Row>
                                                <Form.Group as={Col} md="6" controlId="username">

                                                    <Form.Label>Tên tài khoản</Form.Label><Form.Label className="text-danger">(*)</Form.Label>
                                                    {this.state.editMode ?
                                                        <React.Fragment>
                                                            <Form.Control
                                                                readOnly={this.props.match.params.id !== 'new'}
                                                                type="text"
                                                                name="username"
                                                                value={values.username || ''}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                isInvalid={touched.username && !!errors.username}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.username}
                                                            </Form.Control.Feedback>
                                                        </React.Fragment> :
                                                        <p className="form-control-static">{values.username}</p>
                                                    }

                                                </Form.Group>
                                                <Form.Group as={Col} md="6" controlId="fullName">
                                                    <Form.Label>Họ và tên</Form.Label><Form.Label className="text-danger">(*)</Form.Label>
                                                    {this.state.editMode ?
                                                        <React.Fragment>
                                                            <Form.Control
                                                                type="text"
                                                                name="fullName"
                                                                value={values.fullName || ''}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                isInvalid={touched.fullName && !!errors.fullName}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.fullName}
                                                            </Form.Control.Feedback>
                                                        </React.Fragment>
                                                        : <p className="form-control-static">{values.fullName}</p>
                                                    }

                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} md="6" controlId="unitId">
                                                    <Form.Label>Đơn vị</Form.Label><Form.Label className="text-danger">(*)</Form.Label>
                                                    {this.state.editMode ?
                                                        <React.Fragment>
                                                            <Form.Control
                                                                type="text"
                                                                name="unitId"
                                                                value={values.unitId || ''}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                isInvalid={touched.unitId && !!errors.unitId}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.unitId}
                                                            </Form.Control.Feedback>
                                                        </React.Fragment>
                                                        : <p className="form-control-static">Bộ Tài chính</p>
                                                    }

                                                </Form.Group>

                                            </Form.Row>
                                            {this.state.editMode ?
                                                <Form.Row>
                                                    <Form.Group as={Col} md="6" controlId="password">
                                                        <Form.Label>Mật khẩu mới</Form.Label>
                                                        <Form.Control
                                                            type="password"
                                                            name="password"
                                                            value={values.password || ''}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6" controlId="passwordConfirmation">
                                                        <Form.Label>Nhắc lại mật khẩu mới</Form.Label>
                                                        <Form.Control
                                                            type="password"
                                                            name="passwordConfirmation"
                                                            value={values.passwordConfirmation || ''}
                                                            onChange={handleChange}
                                                        />

                                                    </Form.Group>
                                                </Form.Row> : ''}
                                            <Form.Row>
                                                <Form.Group as={Col} md="6" controlId="email">
                                                    <Form.Label>Email</Form.Label>
                                                    {this.state.editMode ?
                                                        <React.Fragment>
                                                            <Form.Control
                                                                type="text"
                                                                name="email"
                                                                value={values.email || ''}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                isInvalid={touched.email && !!errors.email}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.email}
                                                            </Form.Control.Feedback>
                                                        </React.Fragment>
                                                        : <p className="form-control-static">{values.email}</p>
                                                    }

                                                </Form.Group>
                                                <Form.Group as={Col} md="6" controlId="phoneNumber">
                                                    <Form.Label>Số điện thoại</Form.Label>
                                                    {this.state.editMode ?
                                                        <Form.Control
                                                            type="text"
                                                            name="phoneNumber"
                                                            value={values.phoneNumber || ''}
                                                            onChange={handleChange}
                                                        />
                                                        : <p className="form-control-static">{values.phoneNumber}</p>
                                                    }

                                                </Form.Group>
                                            </Form.Row>

                                            {this.state.editMode ?
                                                <Button type="submit">Ghi lại</Button>
                                                :
                                                <React.Fragment>
                                                    <Button variant="secondary" className="ml-2" type="button" onClick={this.onEdit.bind(this)}>Sửa</Button>
                                                </React.Fragment>
                                            }
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Page.Content>
                        </Page>
                    )}

            </Formik>
        );
    }
}


export { UserFormComponent };