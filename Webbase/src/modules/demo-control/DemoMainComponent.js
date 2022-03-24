import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Breadcrumb, Card, Button, FormGroup, FormControl,Image } from 'react-bootstrap';
import { Formik,Field} from 'formik';
import { string, object,array } from 'yup';
import { Page, FormSelect } from 'shared/components';
import { Context } from './DemoControlService';
import { http } from 'shared/utils';

const schema = object({

    email: string().email('Email không đúng định dạng').nullable(),
    radioSelect: string().required('tessst').nullable(),
    simpleSelect: string().required('tessst').nullable(),
    multiSelect: array().required('tessst').nullable(),
    hierarchical: array().required('tessst').nullable()

});
class DemoMainComponent extends React.Component {
    static propTypes = {
        history: PropTypes.object,
        location: PropTypes.object,

    };
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            simpleData: [],
            data: {
                radioSelect: null,
                simpleSelect: null,
                multiSelect: null,
                hierarchical: null,
                fullName: '',
                unitId: '1',
                email: '',
                phoneNumber: '',
                password: '',
                passwordConfirmation: '',
                birthDay: '',
                roleIds: [],
                avatar:{
                    fileName:'',
                    data:null
                }
            },

        };

    }
    componentDidMount() {
        const that=this;
        setTimeout(()=>{
            that.setState({
                simpleData:[
                    {
                        value: '1', label: ' simple data 1',
                        children: [
                            { value: '1.1', label: ' simple data 1.1'},
                            {
                                value: '1.2', label: ' simple data 1.2',
                                children: [
                                    { value: '1.2.1', label: ' simple data 1.2.1' },
                                    { value: '1.2.2', label: ' simple data 1.2.2' }
                                ]
                            }
                        ]
                    },
                    { value: '2', label: ' simple data 2' },
                    { value: '3', label: ' simple data 3' },
                    { value: '4', label: ' simple data 4' }
    
                ]
            });
        },1000);
    }
    alert() {
        const a = this.context.beh.alert('Có lỗi xảy ra').then(res => {
            console.log(res);
        });
        console.log(a);
    }
    confirm() {
        this.context.beh.confirm('Bạn có muốn abc xyz').then((res) => {
            console.log(res);
            if (res) {
                this.context.beh.alert('Đồng ý');
            } else {
                this.context.beh.alert('Không đồng ý');
            }
        });
    }
    onChange = (currentNode, selectedNodes) => {
        console.log('onChange::', currentNode, selectedNodes);
    }
    onAction = (node, action) => {
        console.log('onAction::', action, node);
    }
    onNodeToggle = currentNode => {
        console.log('onNodeToggle::', currentNode);
    }
    onKeyPress(ev){
        const keyCode = ev.keyCode ||ev.which;
        if(keyCode===13){
            ev.preventDefault();
            return false;
        }
    }
    setData(value){     
        console.log(value);
        const data={...this.state.data};
        data.radioSelect=value!='3'?'3':value;
        data.email=value;
        this.setState({data:data});
    }
    onChangeImg(ev,setFieldValue){
        const file=ev.currentTarget.files[0];
        if(file){
            let reader = new FileReader();
            let dataFile=null;
           
            reader.onloadend = () => {
                dataFile= reader.result;
                setFieldValue('avatar', {fileName:file.name,data:dataFile});
            };
    
            reader.readAsDataURL(file);
        }else{
            setFieldValue('avatar', {fileName:'',data:null});
        }
       
        
    }
    render() {
        return (
            <Page>
                <Page.Header>
                    <Row className="mb-2">
                        <Col sm={6}>
                            <h1>Demo control</h1>
                        </Col>
                        <Col sm={6}>
                            <Breadcrumb className="float-sm-right">
                                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>Trang chủ</Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    Demo control
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                </Page.Header>
                <Page.Content>
                    <Card>
                        <Card.Body>
                            <Formik
                                validationSchema={schema}
                                onSubmit={(values) => {
                                    console.log(values);
                                }}
                                enableReinitialize={true}
                                initialValues={this.state.data}
                            >
                                {({
                                    handleSubmit,
                                    handleChange,
                                    handleBlur,
                                    setFieldTouched,
                                    setFieldValue,
                                    values,
                                    touched,
                                    errors,
                                }) => (
                                    <Form noValidate onSubmit={handleSubmit} onKeyPress={this.onKeyPress.bind(this)}>
                                        <Row>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>radioSelect</Form.Label>
                                                    {JSON.stringify(values.radioSelect)}
                                                    <FormSelect
                                                        name="radioSelect"
                                                        data={this.state.simpleData}
                                                        mode="radioSelect"
                                                        value={values.radioSelect}
                                                        onChange={handleChange} 
                                                        onBlur={handleBlur}                                                     
                                                        isInvalid={touched.radioSelect&&!!errors.radioSelect}
                                                
                                                    ></FormSelect>                                                 
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.radioSelect}
                                                    </Form.Control.Feedback>
                                                  
                                                </Form.Group>
                                                                                          
                                                <Form.Group> 
                                                    <Form.Label>simpleSelect</Form.Label>
                                                    {JSON.stringify(values.simpleSelect)}
                                                    <FormSelect
                                                        name="simpleSelect"
                                                        data={this.state.simpleData}
                                                        value={values.simpleSelect}
                                                        onChange={handleChange} 
                                                        onBlur={handleBlur}                                                   
                                                        isInvalid={ touched.simpleSelect&&!!errors.simpleSelect}
                                                        mode="simpleSelect"
                                                    ></FormSelect>

                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.simpleSelect}
                                                    </Form.Control.Feedback>
                                                 
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>multiSelect</Form.Label>
                                                    {JSON.stringify(values.multiSelect)}
                                                    <FormSelect
                                                        name="multiSelect"
                                                        size="sm"                                      
                                                        data={this.state.simpleData}
                                                        value={values.multiSelect}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} 
                                                        isInvalid={touched.multiSelect&&!!errors.multiSelect}
                                                        mode="multiSelect"
                                                    ></FormSelect>
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.multiSelect}
                                                    </Form.Control.Feedback>                                                 
                                                </Form.Group>
                                                <Form.Group> 
                                                    <Form.Label>hierarchical</Form.Label>
                                                    {JSON.stringify(values.hierarchical)}
                                                    <FormSelect
                                                        autofocus="true"
                                                        name="hierarchical"
                                                        inlineSearchInput={true}
                                                        data={this.state.simpleData}
                                                        value={values.hierarchical}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}                                                       
                                                        isInvalid={ touched.hierarchical&&!!errors.hierarchical}
                                                        mode="hierarchical"
                                                    ></FormSelect>
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.hierarchical}
                                                    </Form.Control.Feedback>                                                   
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <Form.Label>email</Form.Label>
                                                    <FormControl
                                                        name="email"
                                                        placeholder="Gõ gì thì gõ"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={(ev)=>{setFieldTouched('radioSelect',true);console.log(ev);}}
                                                        // onBlur={(ev)=>{handleBlur(ev);console.log(ev);}}
                                                    >

                                                    </FormControl>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Image className="avatar" src={values.avatar.data}  alt={values.avatar.name} rounded />

              
                                                    <Form.File id="formcheck-api-regular" name="avatar" onChange={(event) => {
                                                        console.log(event);
                                                        //setFieldValue('file', event.currentTarget.files[0]);
                                                    }}>
                                                        <Form.File.Label>Regular file input</Form.File.Label>
                                                        <Form.File.Input onChange={(event) => {
                                                            this.onChangeImg(event,setFieldValue);                                                            
                                                        }} />
                                                    </Form.File>

                                              
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button type="submit">submit</Button>
                                        <Button onClick={()=>{this.setData(values.radioSelect);}}>setValue</Button>
                                    </Form>
                                )}
                            </Formik>
                            <Button onClick={this.alert.bind(this)}>Thông báo</Button>
                            <Button onClick={this.confirm.bind(this)}>Confirm</Button>

                        </Card.Body>
                    </Card>
                </Page.Content >
            </Page >
        );
    }
}

export { DemoMainComponent };