import React from 'react';
import BluePassDb from 'lib/BluePassDb';

export default class CreateDb extends React.Component{
    render() {
        return(
            <form action="" onSubmit={this.onSubmit.bind(this)}>
                <div className="bp-form-field">
                    <label>Database URL</label><br/>
                    <input defaultValue={this.props.dbUrl} ref={(ref) => this.openUrl = ref}/><br/>
                </div>
                <div className="bp-form-field">
                    <label>Master password</label><br/>
                    <input defaultValue={this.props.dbPw} type="password" ref={(ref) => this.openPw = ref}/><br/>
                </div>
                <button>Open</button><br/>
            </form>
        );
    }

    onSubmit(e) {
        e.preventDefault();
        let dbUrl = React.findDOMNode(this.openUrl).value;
        let dbPw = React.findDOMNode(this.openPw).value;
        this.props.onOpen(dbUrl, dbPw);
    }

    /*

            let newDb = new BluePassDb();
            this.setState({
                db: newDb,
                dbUrl: 'http://localhost:9966/bluepass/index.php',
                dbPw: '',
                action: null});
        }
    */

}
