import React from 'react';
import Header from 'containers/Header';
import Menu from 'containers/Menu';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Tree from 'react-ui-tree';

var treeData = {
    label: 'ahoj',
    children: [
        { 
            label: 'ahoj2'
        }
    ]
} 

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

    renderNode() {
        return (<div>ahoj</div>);
    }

    render() {
        return (
            <div className="bp-container">
                <Navbar fluid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            BluePass
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem>Dashboard</NavItem>
                    </Nav>
                </Navbar>

                <Tree
                    paddingLeft={20}
                    tree={treeData}
                    renderNode={this.renderNode}  // renderNode(node) return react element
                />

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
