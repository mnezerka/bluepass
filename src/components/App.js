import React from 'react';
import BluePassDb from 'lib/BluePassDb';

export default class Home extends React.Component{
    render() {
        if (this.props.db === null) {
            return (<span>Welcome to BluePass</span>)
        } else {
            console.log(this.props.db);
            return (<span>Current DB: {this.props.db.name}</span>)
        }
    }
}

export default class OpenDb extends React.Component{
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
}

export default class Menu extends React.Component{
    render() {
        return (
            <div className="bp-menu">
                <li onClick={this.props.onOpen}>Open DB</li>
                <li onClick={this.props.onCreate}>Create DB</li>
                <li className="disabled">Save DB</li>
                <li className="disabled">Add item</li>
            </div>
        )
    }
}

export default class App extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            db: null, 
            dbUrl: 'http://localhost:9966/bluepass/index.php',
            dbPw: '',
            action: null
        }
    }

    render() {

        return (
            <div className="bp-container">
                <Menu
                    onOpen={this.onAction.bind(this, 'open')}
                    onCreate={this.onAction.bind(this, 'create')} />
                <div className="bp-content">
                    {this.state.action === null && <Home db={this.state.db}/>}
                    {this.state.action === 'open' && <OpenDb
                        onOpen={this.onOpenDb.bind(this)}
                        dbUrl={this.state.dbUrl}
                        dbPw={this.state.dbPw} />}
                </div>
            </div>
        )
    }

    onAction(action) { 
        console.log('action', action);
        this.setState({action});

        if (action === 'create') {
            let newDb = new BluePassDb();
            this.setState({
                db: newDb,
                dbUrl: 'http://localhost:9966/bluepass/index.php',
                dbPw: '',
                action: null});
        }
    } 


    onOpenDb(dbUrl, dbPw) { 
        console.log('open db', dbUrl, dbPw);

        // try to open database
        let newDb = new BluePassDb();
        newDb.loadFromUrl(dbUrl, dbPw); 

        //this.setState({dbUrl, dbPw});
    } 
}
