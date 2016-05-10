import React from 'react';
import {Modal, Button, Label, FormControl} from 'react-bootstrap';

const itemDefault = {
    id: null,
    name: '',
    address: '', 
    login: '',
    secret: '',
    type: 'other' 
};

export default class ItemModal extends React.Component{

    static propTypes = {
        item: React.PropTypes.shape({
            id: React.PropTypes.string,
            name: React.PropTypes.string,
            address: React.PropTypes.string,
            login: React.PropTypes.string,
            secret: React.PropTypes.string,
            type: React.PropTypes.string
        }),
        show: React.PropTypes.bool,
        onSave: React.PropTypes.func,
        onCancel: React.PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            item: Object.assign({}, itemDefault)
        }
    }

    componentWillMount() {
        this.updateItem(this.props.item);
    }

    componentWillReceiveProps(nextProps) {
        this.updateItem(nextProps.item);
    }

    updateItem(item) {
        if (item !== undefined && item !== null) {
            this.setState({
                item: Object.assign({}, item)
            });
        } else {
            this.setState({
                item: Object.assign({}, itemDefault)
            });
        }
    }

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
                        value={this.state.item.name}
                        onChange={this.onChange.bind(this, 'name')}
                        placeholder="Enter item name" />

                    <Label>Address</Label>
                    <FormControl
                        type="text"
                        value={this.state.item.address}
                        onChange={this.onChange.bind(this, 'address')}
                        placeholder="Enter item address" />

                    <Label>Login</Label>
                    <FormControl
                        type="text"
                        value={this.state.item.login}
                        onChange={this.onChange.bind(this, 'login')}
                        placeholder="Enter item login" />

                    <Label>Secret</Label>
                    <FormControl
                        type="text"
                        value={this.state.item.secret}
                        onChange={this.onChange.bind(this, 'secret')}
                        placeholder="Enter item secret" />

                    <Label>Type</Label>
                    <FormControl
                        value={this.state.item.type}
                        onChange={this.onChange.bind(this, 'type')}
                        componentClass="select"
                        placeholder="Select item type">
                        <option value="www">Web site</option>
                        <option value="ftp">File transfer (FTP)</option>
                        <option value="other">Other</option>>
                    </FormControl>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onCancel}>Cancel</Button>
                    <Button onClick={this.onSave.bind(this)}>Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    onChange(ctrl, event) {
        let item = Object.assign({}, this.state.item, {[ctrl]: event.target.value});
        this.setState({item});
    }

    onSave() {
        this.props.onSave(this.state.item);
    }

}
