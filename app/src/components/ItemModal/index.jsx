import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Label from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

const itemDefault = {
    id: null,
    name: '',
    address: '', 
    secret: '' 
};

export default class ItemModal extends React.Component{

    static propTypes = {
        item: React.PropTypes.shape({
            id: React.PropTypes.string,
            name: React.PropTypes.string,
            address: React.PropTypes.string,
            secret: React.PropTypes.string,
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
                    <HelpBlock>Unique name of the item.</HelpBlock>

                    <Label>Address</Label>
                    <FormControl
                        type="text"
                        value={this.state.item.address}
                        onChange={this.onChange.bind(this, 'address')}
                        placeholder="Enter item address" />
                    <HelpBlock>Optional address of the item (e.g. url)</HelpBlock>

                    <Label>Secret</Label>
                    <FormControl
                        type="text"
                        value={this.state.item.secret}
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

    onChange(ctrl, event) {
        let item = Object.assign({}, this.state.item, {[ctrl]: event.target.value});
        this.setState({item});
    }

    onSave() {
        this.props.onSave(this.state.item);
    }

}
