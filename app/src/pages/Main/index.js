import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'actions/Db';
import ItemsTable from 'components/ItemsTable';
import {Alert, Glyphicon, Nav, NavItem} from 'react-bootstrap';
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
                        </Nav>
                    </div>
                    {!this.props.db.isLocked && 
                        <div className="bp-items">
                            <ItemsTable
                                items={this.props.db.data}
                                onEdit={this.onEditItem.bind(this)}
                            />
                        </div>
                    }

                    {this.props.db.isLocked && 
                        <Alert bsStyle="warning">
                            BluePass Database is currently locked. It must be unlocked first to view and edit content.
                        </Alert>
                    }

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

    onEditItem(item) {
        this.setState({
            item,
            itemAction: 'edit'
        });
    }

    onSaveItem(item) {
        console.log('item to save', item);
        this.setState({itemAction: null});
        this.props.actions.saveItem(item);
    }

    onCancelItem() {
        this.setState({itemAction: null});
    }

}
