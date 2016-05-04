import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'actions/Db';
import ItemsTable from 'components/ItemsTable';
import {Alert, Glyphicon, MenuItem, Nav, NavItem, NavDropdown} from 'react-bootstrap';
import AuthModal from 'components/AuthModal';
import ItemModal from 'components/ItemModal';
import ExportModal from 'components/ExportModal';
import ConfirmationModal from 'components/ConfirmationModal';
import {dbExportMindnightCommander} from 'utils';
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
            item: null,
            action: null,
            actionData: null
        }
    }

    componentWillMount() {
        this.props.actions.fetchDb();
    }

    render() {
        return (
            <div className="bp-page bp-page-main">
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
                            <NavItem eventKey="add" disabled={this.props.db.isLocked}>
                                <Glyphicon glyph="plus"/>Add Item
                            </NavItem>
                            <NavDropdown
                                title="Export"
                                disabled={this.props.db.isLocked}
                                id="export-nav-dropdown">
                                <MenuItem eventKey="export-mc">Midnight commander</MenuItem>    
                            </NavDropdown>
                        </Nav>
                    </div>

                    {!this.props.db.isLocked && 
                        <div className="bp-items">
                            <ItemsTable
                                items={this.props.db.data}
                                onEdit={this.onEditItem.bind(this)}
                                onDelete={this.onDeleteItem.bind(this)}
                            />
                        </div>
                    }

                    {this.props.db.isLocked && 
                        <Alert bsStyle="warning">
                            BluePass Database is currently locked. It must be unlocked first to view and edit content.
                        </Alert>
                    }

                </div>

                {this.state.isAuthenticating &&
                    <AuthModal show
                        onAuthenticate={this.onAuthenticate.bind(this)}/>}

                {(this.state.action === 'add' || this.state.action === 'edit') &&
                    <ItemModal show
                        item={this.state.actionData}
                        onCancel={this.onCancelAction.bind(this)}
                        onSave={this.onSaveItem.bind(this)}/>}

                {this.state.action === 'export-mc' &&
                    <ExportModal show
                        data={this.state.actionData}
                        onClose={this.onCancelAction.bind(this)}/>}

                {this.state.action === 'delete' &&
                    <ConfirmationModal show
                        message={'Are you sure you want to delete item ' + this.state.actionData.name + '?'}
                        onOk={this.onDeleteItemConfirmed.bind(this)}
                        onCancel={this.onCancelAction.bind(this)}/>}
            </div>
       );
    }

    onAuthenticate(password) {
        this.setState({isAuthenticating: false});
        this.props.actions.unlockDb(password);
    }

    onAction(action) {
        switch(action) {
        case 'lock':
            this.props.actions.lockDb();
            break;
        case 'unlock':
            this.setState({isAuthenticating: true});
            break;
        case 'add':
            this.setState({item: null, action: 'add'});
            break;
        case 'export-mc':
            let mcHotlist = dbExportMindnightCommander(this.props.db.data);
            this.setState({
                action: 'export-mc',
                actionData: mcHotlist 
            });
            break;
        }
    }

    onEditItem(item) {
        this.setState({
            actionData: item,
            action: 'edit'
        });
    }

    onDeleteItem(item) {
        this.setState({
            actionData: item,
            action: 'delete'
        });
    }

    onDeleteItemConfirmed() {
        this.props.actions.deleteItem(this.state.actionData.id);
        this.setState({
            item: null,
            action: null
        });
    }

    onSaveItem(item) {
        this.setState({action: null});
        this.props.actions.saveItem(item);
    }

    onCancelAction() {
        this.setState({action: null});
    }

}
