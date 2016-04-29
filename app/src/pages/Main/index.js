import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'actions/Db';
import Tree from 'components/Tree';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import AuthModal from 'components/AuthModal';

var treeData = [
    {
        label: 'Pavoucek',
    },
    {
        label: 'Synology',
    }
];

const mapStateToProps = (state) => ({
    db: state.db
});

const mapActionsToProps = (dispatch) => ({
    actions : bindActionCreators(actionCreators, dispatch)
});

@connect(mapStateToProps, mapActionsToProps)
export default class MainPage extends React.Component {

    static propTypes = {
        db: React.PropTypes.object,
        actions: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticating: false
        }
    }

    componentWillMount() {
        this.props.actions.fetchDb();
    }

    renderNode() {
        return (<div>ahoj</div>);
    }

    render() {
        return (
            <div className="bp-page bp-page-main">
                <h1></h1>
                <Grid>
                    <Row>
                        <Col sm={6} md={3}>
                            {!this.props.db.isDecrypted && 
                                <div className="bp-locked" onClick={this.onUnlock.bind(this)}>
                                    <Glyphicon glyph="lock" />
                                    Locked database
                                </div>
                            }
                            {this.props.db.isDecrypted && 
                                <Tree
                                    items={treeData}
                                    onSelect={this.onSelectTreeItem.bind(this)}  // renderNode(node) return react element
                                />
                            }
                        </Col>
                        <Col sm={6} md={3}>
                            Content
                        </Col>
                    </Row>
                </Grid>

                <AuthModal
                    show={this.state.isAuthenticating}
                    onAuthenticate={this.onAuthenticate.bind(this)}/>

            </div>
       );
    }

    onAuthenticate(password) {
        this.props.actions.authenticateDb(password);
        this.setState({isAuthenticating: false});
    }

    onUnlock() {
        this.setState({isAuthenticating: true});
    }

    onSelectTreeItem(item) {
        console.log(item);
    }

}


