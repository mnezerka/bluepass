import React from 'react';
import Header from 'containers/Header';
import Menu from 'containers/Menu';

export default class App extends React.Component{

    static contextTypes = {
        router: React.PropTypes.object
    }

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
                <Header />
                <Menu
                    onHome={this.onHome.bind(this)}
                    onOpen={this.onOpen.bind(this)}
                    onMeta={this.onMeta.bind(this)}
                    onSave={this.onSave.bind(this)} />
                <div className="bp-content">
                    {this.props.children}
                </div>
            </div>
        )
    }

    onHome() {
        this.context.router.push('home');
    }

    onOpen() {
        this.context.router.push('open');
    }

    onMeta() {
        this.context.router.push('meta');
    }


    onCreate() {
        this.context.router.push('create');
    }

    onSave() {
        console.log('save db');



    }
}
