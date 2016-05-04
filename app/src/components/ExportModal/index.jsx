import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import './ExportModal.styl';

export default class ExportModal extends React.Component{

    static propTypes = {
        data: React.PropTypes.string,
        show: React.PropTypes.bool,
        onClose: React.PropTypes.func
    }

    render() {
        return (
            <Modal dialogClassName="bs-export-modal" show={this.props.show} onHide={this.props.onClose} bsSize="large">
                <Modal.Header>
                    <Modal.Title>BluePass Export</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <pre>{this.props.data}</pre>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
