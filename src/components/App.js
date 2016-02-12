import React from 'react';
import BluePassDb from 'lib/BluePassDb';
import Home from 'components/Home';

export class Menu extends React.Component{
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
                    onOpen={this.onOpen.bind(this)}
                    onCreate={this.onCreate.bind(this)} />
                <div className="bp-content">
                    {this.props.children}

                </div>
            </div>
        )
    }

    onOpen() {
        this.props.history.push('open')
    }

    onCreate() {
        this.props.history.push('create')
    }
}
