import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Label from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

export default class AuthModal extends React.Component{

    static propTypes = {
        show: React.PropTypes.bool,
        onAuthenticate: React.PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            password: ''
        }
    }

    render() {

        return (
            <Modal show={this.props.show} onHide={this.onAuthenticate.bind(this)}>
                <Modal.Header>
                    <Modal.Title>Database Authentication</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Label>Password</Label>
                    <FormControl
                        type="text"
                        value={this.state.password}
                        onChange={this.onChange.bind(this)}
                        placeholder="Enter password" />
                    <HelpBlock>Master password to be used for database encryption/decryption</HelpBlock>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onAuthenticate.bind(this)}>Authenticate</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    onChange(value) {
        this.setState({password: value.target.value});
    }

    onAuthenticate() {
        this.props.onAuthenticate(this.state.password);
    }

}
