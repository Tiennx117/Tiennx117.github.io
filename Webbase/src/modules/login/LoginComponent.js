
import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { string, object } from 'yup';
import { Card, Form, InputGroup, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { LoadingComponent } from 'shared/components';
import { authService } from 'shared/services';
import { OauthAction } from 'redux/actions';

const schema = object({
    username: string().required('Cần phải nhập tên tài khoản'),
    password: string().required('Cần phải nhập mật khẩu'),


});


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: '',
                password: '',
            },
            loading: false,
            errorMessage: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
    }

    handleSubmit(data) {
        this.setState({ loading: true });

        authService.login(data).subscribe(() => {
            this.setState({ loading: false, errorMessage: '' });
            const { from } = this.props.location.state || { from: { pathname: '/' } };
            this.props.history.push(from);
        }, (err) => {
            if (err.status === 400) {
                this.setState({ loading: false, errorMessage: 'Tài khoản hoặc mật khẩu không chính xác, vui lòng kiểm tra lại' });
            } else {
                this.setState({ loading: false, errorMessage: 'Có lỗi xảy ra trong quá trình login' });
            }
        });
    }

    render() {
        return (
            <div className="login-page">
                <div className="login-box">
                    <div className="login-logo">
                        <b>Hệ thống Quản lý hàng thật hàng giả</b>
                    </div>
                    {/* /.login-logo */}
                    <Card>
                        <Card.Body className="login-card-body">
                            <p className="login-box-msg">
                                Đăng nhập để bắt đầu phiên của bạn
                                <br />
                                <i className="text-danger">{this.state.errorMessage}</i>
                            </p>

                            <Formik
                                validationSchema={schema}
                                onSubmit={this.handleSubmit}
                                // enableReinitialize={true}
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
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Form.Group>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    name="username"
                                                    placeholder="Tài khoản"
                                                    aria-label="Username"
                                                    autoComplete="on"
                                                    autoFocus
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.username}
                                                    isInvalid={touched.username && !!errors.username}
                                                />
                                                <InputGroup.Append>
                                                    <InputGroup.Text>
                                                        <span className="iconify" data-icon="fa-solid:user" data-inline="false" />
                                                    </InputGroup.Text>
                                                </InputGroup.Append>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.username}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    name="password"
                                                    type="password"
                                                    placeholder="Mật khẩu"
                                                    aria-label="Password"
                                                    autoComplete="on"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                    isInvalid={touched.password && !!errors.password}
                                                />
                                                <InputGroup.Append>
                                                    <InputGroup.Text>
                                                        <span className="iconify" data-icon="fa:lock" data-inline="false" />
                                                    </InputGroup.Text>
                                                </InputGroup.Append>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                        <Row>
                                            <Col className="col-6">
                                                {/* <div className="icheck-primary">
                                                        <input type="checkbox" id="remember" />
                                                        <label htmlFor="remember">Duy trì đăng nhập</label>
                                                    </div> */}
                                            </Col>
                                            <Col className="col-6">
                                                <button type="submit" className="btn btn-primary btn-block">Đăng nhập</button>
                                            </Col>
                                        </Row>
                                    </Form>
                                )}
                            </Formik>
                            {/* /.login-card-body */}
                        </Card.Body>
                    </Card>
                </div>
                <LoadingComponent loading={this.state.loading} />


            </div>

        );
    }
}
Login.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};
const LoginComponent = connect(null, { setToken: OauthAction.setToken })(Login);
export { LoginComponent };
