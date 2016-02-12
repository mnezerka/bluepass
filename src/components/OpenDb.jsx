import React from 'react';
import BluePassDb from 'lib/BluePassDb';

export default class OpenDb extends React.Component{
    static propTypes = {            
        url: React.PropTypes.string,
        pw: React.PropTypes.string
    }             

    static defaultProps = {         
        url: 'http://localhost:9966/bluepass',
        pw: ''
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
        let dbUrl = React.findDOMNode(this.openUrl).value;
        let dbPw = React.findDOMNode(this.openPw).value;

        // try to open database
        console.log('open db', dbUrl, dbPw);
        let newDb = new BluePassDb();
        newDb.loadFromUrl(dbUrl, dbPw); 
    }
}
