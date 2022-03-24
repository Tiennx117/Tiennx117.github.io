import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BehaviorsContext } from '../../services';
class AlertComponent extends React.Component {
    static contextType = BehaviorsContext;
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            msg: '',
            size: 'sm',
            type: 'danger'
        };
        this.subscriptions={};
       
    }

    componentDidMount() {
        this.subscriptions['onShow']= this.context.beh.onShowAlert.subscribe((res) => {
            if(!this.state.show){
                this.setState({
                    show: true,
                    msg: res.msg || '',
                    size: res.size || 'sm',
                    type: res.type || 'danger'
                });
            }
            
        });
    }
    componentWillUnmount(){
        Object.keys(this.subscriptions).forEach((key)=>{
            this.subscriptions[key].unsubscribe();
        });
    }
    handleClose() {
        this.setState({ show: false });
        this.context.beh.onHideAlert.next(true);
    }

    render() {
        return (
            <Modal
                size={this.state.size}
                show={this.state.show}
                backdrop="static"
                onHide={this.handleClose.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{this.state.msg}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button size="sm" variant="danger" onClick={this.handleClose.bind(this)}>Đóng</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export { AlertComponent };
