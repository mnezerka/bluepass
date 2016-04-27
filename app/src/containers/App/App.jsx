import React from 'react';
import {connect} from 'react-redux';
import Menu from 'containers/Menu';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'actions/Auth';

const mapStateToProps = (state) => ({
    isAuthenticating   : state.auth.isAuthenticating,
    isAuthenticated    : state.auth.isAuthenticated,
    statusText         : state.auth.statusText,
    userName           : state.auth.userName
});

const mapActionsToProps = (dispatch) => ({
        actions : bindActionCreators(actionCreators, dispatch)
});

@connect(mapStateToProps, mapActionsToProps)
export default class App extends React.Component{

    static contextTypes = {
        router: React.PropTypes.object
    }

   static propTypes = {
        isAuthenticated: React.PropTypes.bool,
        userName: React.PropTypes.string,
        children: React.PropTypes.object,
        actions: React.PropTypes.object
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
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={'/'} onSelect={this.onSelect}>Main</NavItem>
                    </Nav>
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

    onSelect = (path) => {
        this.context.router.push(path);
    }

    onLogout() {
        this.props.actions.logout();
    }

}
