import React from 'react';
import { Modal, Card, Button} from 'react-bootstrap'
export default class ExampleModal extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            show: false
        }
    }
    handleClose = () => {
        this.setState({
            show: false
          });
    }
    handleShow = () =>{
        this.setState({
            show: true
        });
    }
    render() {
        return (
            <Card>
            <Card.Header>Featured</Card.Header>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Button variant="primary" onClick={this.handleShow}>
                    Launch demo modal 1
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}  dialogClassName="min-vw-100" aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header closeButton>
                    <Modal.Title  id="example-custom-modal-styling-title">Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
              
                 
            </Card.Body>
          </Card>
            
               
        );
    }
  
    
}
