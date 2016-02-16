import React from 'react';
import ReactDOM from 'react-dom';

export default class OpenDb extends React.Component{
    static propTypes = {            
        url: React.PropTypes.string,
        pw: React.PropTypes.string,
        onOpen: React.PropTypes.func
    }             

    static defaultProps = {         
        url: 'http://localhost:9966/bluepass/index.php',
        pw: '',
        onOpen: () => {}
    }       

    render() {
        return(
            <form action="" onSubmit={this.onSubmit.bind(this)}>
                <div className="bp-form-field">
                    <label>Database URL</label><br/>
                    <input defaultValue={this.props.url} ref={(ref) => this.openUrl = ref}/><br/>
                </div>
                <div className="bp-form-field">
                    <label>Master password</label><br/>
                    <input defaultValue={this.props.pw} type="password" ref={(ref) => this.openPw = ref}/><br/>
                </div>
                <button>Open</button><br/>
            </form>
        );
    }

    onSubmit(e) {
        e.preventDefault();

        let dbUrl = ReactDOM.findDOMNode(this.openUrl).value;
        let dbPw = ReactDOM.findDOMNode(this.openPw).value;

        this.props.onOpen(dbUrl, dbPw);


        return;
    }
}
