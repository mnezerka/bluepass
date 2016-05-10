import React from 'react';
import {connect} from 'react-redux';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import * as actionCreatorsAuth from 'actions/Auth';
import * as actionCreatorsDb from 'actions/Db';
import PasswordModal from 'components/PasswordModal';
import './App.styl';

const mapStateToProps = (state) => ({
    isAuthenticated    : state.auth.isAuthenticated,
    userName           : state.auth.userName,
    isSaving           : state.db.isSaving,
    password           : state.db.password,
    isLocked           : state.db.isLocked
});

const mapActionsToProps = (dispatch) => ({
    actionsAuth : bindActionCreators(actionCreatorsAuth, dispatch),
    actionsDb : bindActionCreators(actionCreatorsDb, dispatch)
});

const ACT_LOGOUT = 'logout';
const ACT_SETTINGS_PASSWORD = 'settings-password';

@connect(mapStateToProps, mapActionsToProps)
export default class App extends React.Component{

    static contextTypes = {
        router: React.PropTypes.object
    }

    static propTypes = {
        isAuthenticated: React.PropTypes.bool,
        isSaving: React.PropTypes.bool,
        isLocked: React.PropTypes.bool,
        userName: React.PropTypes.string,
        password: React.PropTypes.string,
        children: React.PropTypes.object,
        actionsAuth: React.PropTypes.object,
        actionsDb: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            action: null
        }
    }

    render() {

        if (!this.props.isAuthenticated) {
            return this.props.children
        }

        return (
            <div className="bp-container">
                <Navbar fluid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            BluePass
                        </Navbar.Brand>
                        {this.props.isSaving && <Navbar.Text>Saving...</Navbar.Text>}
                    </Navbar.Header>
                    <Nav pullRight onSelect={this.onSelectMenuItem.bind(this)}>
                        <NavDropdown eventKey="settings" title="Settings" id="bc-settings-nav">
                            <MenuItem
                                eventKey={ACT_SETTINGS_PASSWORD}
                                disabled={this.props.isLocked}>
                                Change password
                            </MenuItem>
                        </NavDropdown>

                        <NavItem eventKey={ACT_LOGOUT}>
                            Logout ({this.props.userName})
                        </NavItem>
                    </Nav>
 
                </Navbar>
    
                <div className="bp-content">
                    {this.props.children}
                </div>

                <PasswordModal
                    show={this.state.action === ACT_SETTINGS_PASSWORD}
                    password={this.props.password}
                    onCancel={this.onCancelAction.bind(this)}
                    onSave={this.onSetPassword.bind(this)} />
            </div>
        )
    }

    onSelectMenuItem(item) {
        switch(item) {
        case ACT_LOGOUT:
            this.props.actionsAuth.logout();
            break;
        case ACT_SETTINGS_PASSWORD:
            //console.log('change password');
            this.setState({
                action: ACT_SETTINGS_PASSWORD
            });
            break;
        }
    }

    onCancelAction() {
        this.setState({action: null});
    }

    onSetPassword(newPassword) {
        console.log('pswd', newPassword);
        this.setState({action: null});
        this.props.actionsDb.setPassword(newPassword);
    }

}
