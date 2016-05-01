import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'actions/Db';
import ItemsTable from 'components/ItemsTable';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Panel from 'react-bootstrap/lib/Panel';
import AuthModal from 'components/AuthModal';
import ItemModal from 'components/ItemModal';
import './Main.styl';

const mapStateToProps = (state) => ({
    db: state.db
});

const mapActionsToProps = (dispatch) => ({
    actions : bindActionCreators(actionCreators, dispatch)
});

@connect(mapStateToProps, mapActionsToProps)
export default class MainPage extends React.Component {

    static propTypes = {
        db: React.PropTypes.object,
        actions: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticating: false,
            isAddingItem: false,
            item: null,
            itemAction: null
        }
    }

    componentWillMount() {
        this.props.actions.fetchDb();
    }

    render() {
        return (
            <div className="bp-page bp-page-main">
                <h1></h1>
                <div className="bp-main-content">
                    <div className="bp-menu">
                        <Nav bsStyle="pills" stacked activeKey={1} onSelect={this.onAction.bind(this)}>

                        {this.props.db.isLocked && 
                            <NavItem eventKey="unlock">
                                <Glyphicon glyph="lock"/>Unlock
                            </NavItem>

                        }
                        {!this.props.db.isLocked && 
                            <NavItem eventKey="lock">
                                <Glyphicon glyph="lock"/>Lock
                            </NavItem>
                        }
                        <NavItem eventKey="add" disabled={this.props.isLocked}>Add Item</NavItem>
                        </Nav>
                    </div>
                    <div className="bp-items">
                        {!this.props.db.isLocked && 
                            <ItemsTable
                                items={this.props.db.data}
                                onEdit={this.onEditTreeItem.bind(this)}
                            />
                        }
                    </div>
                </div>

                <AuthModal
                    show={this.state.isAuthenticating}
                    onAuthenticate={this.onAuthenticate.bind(this)}/>

                <ItemModal
                    show={this.state.itemAction === 'add' || this.state.itemAction === 'edit'}
                    item={this.state.item}
                    onCancel={this.onCancelItem.bind(this)}
                    onSave={this.onSaveItem.bind(this)}/>
            </div>
       );
    }

    onAuthenticate(password) {
        this.setState({isAuthenticating: false});
        this.props.actions.unlockDb(password);
    }

    onAction(action) {
        console.log('action', action);
        switch(action) {
            case 'lock':
                this.props.actions.lockDb();
                break;
            case 'unlock':
                this.setState({isAuthenticating: true});
                break;
            case 'add':
                this.setState({item: null, itemAction: 'add'});
                break;
        }
    }

    onEditTreeItem(item) {
        this.setState({
            item,
            itemAction: 'edit'
        });
    }

    onSaveItem(item) {
        this.setState({itemAction: null});
        this.props.actions.addItem(item);
    }

    onCancelItem() {
        this.setState({itemAction: null});
    }

}

class Item extends React.Component {
    render() {
        return (
            <Panel header="Item">
                <div>Name: {this.props.children.name}</div>
                <div>Address: {this.props.children.address}</div>
                <div>Secret: {this.props.children.secret}</div>
            </Panel>
        );
    }
}

