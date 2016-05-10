import React from 'react';
import {Modal, Button, Label, FormControl, FormGroup} from 'react-bootstrap';

export default class PasswordModal extends React.Component{

    static propTypes = {
        show: React.PropTypes.bool,
        onSave: React.PropTypes.func,
        onCancel: React.PropTypes.func,
        password: React.PropTypes.string
    }

    static initialState = {
        password: '',
        dlgPassword: '',
        dlgPasswordNew: '',
        dlgPasswordNewConfirmation: ''
    }

    constructor(props) {
        super(props);
        this.state = PasswordModal.initialState;
    }

    componentWillMount() {
        this.updatePassword(this.props.password);
    }

    componentWillReceiveProps(nextProps) {
        this.updatePassword(nextProps.password);
    }

    updatePassword(password) {
        let newState = Object.assign({}, PasswordModal.initialState);
        if (password !== undefined && password !== null) {
            newState.password = password;
        }
        this.setState(newState);
    }

    getPasswordOldValidationState() {
        if (this.state.dlgPassword !== this.state.password) {
            return 'error';
        }
        return 'success';
    }

    getPasswordNewValidationState() {
        if (this.state.dlgPasswordNew.length < 6) {
            return 'error';
        }
        return 'success';
    }

    getPasswordNewConfirmationValidationState() {
        if (this.state.dlgPasswordNewConfirmation.length < 6) {
            return 'error';
        }
        if (this.state.dlgPasswordNew !== this.state.dlgPasswordNewConfirmation) {
            return 'error';
        }
        return 'success';
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onCancel}>
                <Modal.Header>
                    <Modal.Title>BluePass Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Label>Old Password</Label>
                    <FormGroup
                        ref="grpPasswordOld"
                        controlId="PasswordOld"
                        validationState={this.getPasswordOldValidationState()}>
                        <FormControl
                            type="password"
                            value={this.state.dlgPassword}
                            onChange={this.onChange.bind(this, 'dlgPassword')}
                            placeholder="Enter old password" />
                    </FormGroup>

                    <FormGroup
                        ref="grpPasswordNew"
                        controlId="PasswordNew"
                        validationState={this.getPasswordNewValidationState()}>
                        <Label>New Password</Label>
                        <FormControl
                            type="password"
                            onChange={this.onChange.bind(this, 'dlgPasswordNew')}
                            value={this.state.dlgPasswordNew}
                            placeholder="Enter new password" />
                    </FormGroup>

                    <FormGroup
                        ref="grpPasswordNewConfirmation"
                        controlId="PasswordNewConfirmation"
                        validationState={this.getPasswordNewConfirmationValidationState()}>
                        <Label>New Password Confirmation</Label>
                        <FormControl
                            type="password"
                            onChange={this.onChange.bind(this, 'dlgPasswordNewConfirmation')}
                            value={this.state.dlgPasswordNewConfirmation}
                            placeholder="Repeat new password" />
                    </FormGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onCancel}>Cancel</Button>
                    <Button onClick={this.onSave.bind(this)}>Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    onChange(ctrl, event) {
        this.setState({[ctrl]: event.target.value});
    }

    onSave() {
        if (this.refs.grpPasswordOld.props.validationState === 'success' &&
            this.refs.grpPasswordNew.props.validationState === 'success' &&
            this.refs.grpPasswordNewConfirmation.props.validationState === 'success') {
            this.props.onSave(this.state.dlgPasswordNew);
        }
    }
}
