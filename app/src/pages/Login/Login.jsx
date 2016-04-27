import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Input from 'react-bootstrap/lib/Input';
import ButtonInput from 'react-bootstrap/lib/ButtonInput';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Alert from 'react-bootstrap/lib/Alert';
import * as actionCreators from 'actions/Auth';
import './Login.styl';

const mapStateToProps = (state) => ({
    isAuthenticating   : state.auth.isAuthenticating,
    statusText         : state.auth.statusText,
    error              : state.auth.error
});

const mapActionsToProps = (dispatch) => ({
    actions : bindActionCreators(actionCreators, dispatch)
});

@connect(mapStateToProps, mapActionsToProps)
export default class LoginPage extends React.Component {

    static propTypes = {
        isAuthenticating: React.PropTypes.bool,
        statusText: React.PropTypes.string,
        error: React.PropTypes.bool,
        actions: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
    }

    validationState(ctrl) {
        let value;
        switch (ctrl) {
        case 'login':
            value = this.state.login;
            break;
        case 'password':
            value = this.state.password;
            break;
        default:
            return 'success';
        }

        if (value.length === 0) {
            return 'warning'; 
        }

        return 'success';
    }

    render() {
        return (
            <div className="saas-login-form">
                <PageHeader>Welcome to SaaSOps</PageHeader>
                {this.props.isAuthenticating &&
                    <Alert bsStyle="info">Authenticating...</Alert>}        

                {this.props.error &&
                    <Alert bsStyle="danger">Authentication failed ({this.props.statusText})</Alert>}        

                {!this.props.error && this.props.statusText !== null &&
                    <Alert bsStyle="info">{this.props.statusText}</Alert>}        

                <form>
                    <Input
                        type="text"
                        value={this.state.login}
                        label="Login"
                        onChange={this.onChange.bind(this, 'login')}
                        bsStyle={this.validationState('login')}
                        placeholder="Enter login" />

                    <Input
                        type="password"
                        value={this.state.password}
                        label="Password"
                        onChange={this.onChange.bind(this, 'password')}
                        bsStyle={this.validationState('password')}
                        placeholder="Enter password" />

                    <ButtonInput
                        type="submit"
                        onClick={this.onLogin.bind(this)}
                        value="Login" />
                </form>
            </div>
       );
    }

    onChange(ctrl, value) {
        this.setState({[ctrl]: value.target.value});
    }

    onLogin(e) {
        e.preventDefault();
        this.props.actions.loginUser(this.state.login, this.state.password, '/');
    }
}


