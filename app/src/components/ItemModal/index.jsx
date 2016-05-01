import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Label from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

export default class ItemModal extends React.Component{

    static propTypes = {
        name: React.PropTypes.string,
        address: React.PropTypes.string,
        secret: React.PropTypes.string,
        show: React.PropTypes.bool,
        onSave: React.PropTypes.func,
        onCancel: React.PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '', 
            secret: '' 
        }
    }

    /*
    componentWillMount() {
        console.log(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateItem(nextProps);
    }

    updateItem(props) {
        if (props.item !== undefined && props.item !== null) {
            this.setState({
                name: props.item.name,
                address: props.item.address,
                secret: props.item.secret
            });
        } else {
            this.setState({
                name: '',
                address: '', 
                secret: '' 
            });
        }
    }
    */

    render() {

        return (
            <Modal show={this.props.show} onHide={this.props.onCancel}>
                <Modal.Header>
                    <Modal.Title>BluePass Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Label>Name</Label>
                    <FormControl
                        type="text"
                        value={this.state.name}
                        onChange={this.onChange.bind(this, 'name')}
                        placeholder="Enter item name" />
                    <HelpBlock>Unique name of the item.</HelpBlock>

                    <Label>Address</Label>
                    <FormControl
                        type="text"
                        value={this.state.address}
                        onChange={this.onChange.bind(this, 'address')}
                        placeholder="Enter item address" />
                    <HelpBlock>Optional address of the item (e.g. url)</HelpBlock>

                    <Label>Secret</Label>
                    <FormControl
                        type="text"
                        value={this.state.secret}
                        onChange={this.onChange.bind(this, 'secret')}
                        placeholder="Enter item secret" />
                    <HelpBlock>Item secret (e.g. password)</HelpBlock>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onCancel}>Cancel</Button>
                    <Button onClick={this.onSave.bind(this)}>Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    onChange(ctrl, value) {
        this.setState({[ctrl]: value.target.value});
    }

    onSave() {
        this.props.onSave({
            name: this.state.name,
            address: this.state.address,
            secret: this.state.secret
        });
    }

}
