import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import { string, object } from 'yup';
import { LoadingComponent } from 'shared/components';
import { Context } from '../UserService';


const schema = object({
    username: string().required('Tên tài khoản không được để trống'),
    fullName: string().required('Họ và tên không được để trống'),
    unitId: string().required('Đơn vị không được để trống'),
    email: string().email('Email không đúng định dạng').nullable(),

});
const userDefault = {
    username: '',
    fullName: '',
    unitId: '1',
    email: '',
    phoneNumber: '',
    password: '',
    passwordConfirmation: '',
    birthDay: '',
    roleIds: []
};
class UserFormComponent extends React.Component {
    static propTypes = {
        onClose: PropTypes.func
    };
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            data: userDefault,
            listGroup: [],
            editMode: false,
            loading: false,
            isShow: false,
            action: 'new',
            id: null,
        };
        this.subscriptions = {};
    }
    componentDidMount() {
        this.subscriptions['sendToForm'] = this.context.userService.sendToForm.subscribe(res => {
            switch (res.action) {
            case 'new':
                this.setState({ editMode: true, isShow: res.isShow, action: res.action, id: null, data: userDefault });
                break;
            case 'edit':
                this.setState({ editMode: true, isShow: res.isShow, action: res.action, id: res.id, loading: true });
                this.context.userService.getById(res.id).subscribe(res => {
                    this.setState({
                        data: res,
                        loading: false
                    });
                });
                break;
            case 'read':
                this.setState({ editMode: false, isShow: res.isShow, action: res.action, id: res.id, loading: true });
                this.context.userService.getById(res.id).subscribe(res => {
                    this.setState({
                        data: res,
                        loading: false
                    });
                });
                break;
            default:
                this.setState({ editMode: true, isShow: res.isShow, action: 'new', id: null, data: userDefault });
                break;
            }
        });
        this.subscriptions['getGroupUser'] = this.context.userService.getGroupUser().subscribe((res => {
            this.setState({
                listGroup: res
            });
        }));
    }
    componentWillUnmount() {
        Object.keys(this.subscriptions).forEach((key) => {
            this.subscriptions[key].unsubscribe();
        });
    }
    onSubmit(data) {
        this.setState({
            loading: true
        });
        if (this.state.id) {
            this.subscriptions['update'] = this.context.userService.update(data, this.state.id).subscribe(() => {
                this.context.beh.alert('cập nhật thành công').then(() => {
                    this.handleClose(true);
                });
            },
            (err) => {
                this.setState({
                    loading: false
                });
                this.context.beh.alert(err.error.error);
            });

        } else {
            this.subscriptions['create'] =this.context.userService.create(data).subscribe(() => {
                this.context.beh.alert('Thêm mới thành công').then(() => {
                    this.handleClose(true);
                });
            },
            (err) => {
                this.setState({
                    loading: false
                });
                this.context.beh.alert(err.error.error);
            });

        }

    }
    onEdit() {
        this.setState({
            editMode: true
        });
    }
    handleClose(isRefesh) {
        this.setState({ isShow: false });
        if (this.props.onClose) {
            this.props.onClose(isRefesh);
        }

    }
    onKeyPress(ev){
        const keyCode = ev.keyCode ||ev.which;
        if(keyCode===13){
            ev.preventDefault();
            return false;
        }
    }
    computedTitle(){
        if(this.state.id){
            if(this.state.editMode){
                return 'Chỉnh sửa thông tin người dùng';
            }
            return 'Thông tin người dùng';
        }
        return 'Tạo mới người dùng';
    }
    render() {
        return (
            <Modal size="xl" keyboard={false} backdrop="static" show={this.state.isShow} onHide={this.handleClose.bind(this)}>
                <LoadingComponent loading={this.state.loading}></LoadingComponent>
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
                        <Form noValidate onSubmit={handleSubmit} onKeyPress={this.onKeyPress.bind(this)}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.computedTitle()}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="username">
                                        <Form.Label>Tên tài khoản</Form.Label><Form.Label className="text-danger">(*)</Form.Label>
                                        {this.state.editMode ?
                                            <React.Fragment>
                                                <Form.Control
                                                    type="text"
                                                    name="username"
                                                    readOnly={this.state.id !== null}
                                                    value={values.username || ''}
                                                    onChange={(ev)=>{handleChange(ev);handleBlur(ev);}}                        
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
                                {this.state.id === null ?
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

                            </Modal.Body>
                            <Modal.Footer className="justify-content-between">
                                <Button variant="default" onClick={()=>{this.handleClose(false);}}>
                                        Close
                                </Button>
                                {this.state.editMode ?
                                    <Button type="submit">Ghi lại</Button>
                                    :
                                    <React.Fragment>
                                        <Button variant="primary" className="ml-2" type="button" onClick={this.onEdit.bind(this)}>Sửa</Button>
                                    </React.Fragment>
                                }
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>

        );
    }
}


export { UserFormComponent };