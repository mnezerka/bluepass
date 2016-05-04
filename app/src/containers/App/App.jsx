import React from 'react';
import {connect} from 'react-redux';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import * as actionCreatorsAuth from 'actions/Auth';
import * as actionCreatorsDb from 'actions/Db';
import './App.styl';

const mapStateToProps = (state) => ({
    isAuthenticated    : state.auth.isAuthenticated,
    userName           : state.auth.userName,
    isSaving           : state.db.isSaving
});

const mapActionsToProps = (dispatch) => ({
    actionsAuth : bindActionCreators(actionCreatorsAuth, dispatch),
    actionsDb : bindActionCreators(actionCreatorsDb, dispatch)
});

@connect(mapStateToProps, mapActionsToProps)
export default class App extends React.Component{

    static contextTypes = {
        router: React.PropTypes.object
    }

    static propTypes = {
        isAuthenticated: React.PropTypes.bool,
        isSaving: React.PropTypes.bool,
        userName: React.PropTypes.string,
        children: React.PropTypes.object,
        actionsAuth: React.PropTypes.object,
        actionsDb: React.PropTypes.object
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
                    <Nav pullRight>
                        <NavItem
                            eventKey={'logout'}
                            onSelect={this.onLogout.bind(this)}>
                            Logout ({this.props.userName})
                        </NavItem>
                    </Nav>
 
                </Navbar>
    
                <div className="bp-content">
                    {this.props.children}
                </div>

            </div>
        )
    }
   
    onLogout() {
        this.props.actionsAuth.logout();
    }


}
