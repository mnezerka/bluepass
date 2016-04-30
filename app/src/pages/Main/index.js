import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'actions/Db';
import Tree from 'components/Tree';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import AuthModal from 'components/AuthModal';
import ItemModal from 'components/ItemModal';

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
            isAuthenticating: false,
            isAddingItem: false
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
                        <Col>
                            {this.props.db.isLocked&& 
                                <Button onClick={this.onUnlock.bind(this)}>
                                    <Glyphicon glyph="lock" />
                                    Unlock
                                </Button>
                            }
                            {!this.props.db.isLocked && 
                                <Button onClick={this.onLock.bind(this)}>
                                    <Glyphicon glyph="lock" />
                                    Lock 
                                </Button>
                            }
                            {!this.props.db.isLocked && 
                                <Button onClick={this.onAddItem.bind(this)}>Add Item</Button>
                            }
                        </Col>
                    </Row> 
                    <Row>
                        <Col sm={6} md={3}>
                            {!this.props.db.isLocked && 
                                <Tree
                                    items={this.props.db.data}
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

                <ItemModal
                    show={this.state.isAddingItem}
                    onCancel={this.onCancelItem.bind(this)}
                    onSave={this.onSaveItem.bind(this)}/>

            </div>
       );
    }

    onAuthenticate(password) {
        this.setState({isAuthenticating: false});
        this.props.actions.unlockDb(password);
    }

    onUnlock() {
        this.setState({isAuthenticating: true});
    }

    onLock() {
        this.props.actions.lockDb();
    }

    onSelectTreeItem(item) {
        console.log(item);
    }

    onAddItem() {
        this.setState({isAddingItem: true});
    }

    onSaveItem(item) {
        this.setState({isAddingItem: false});
        this.props.actions.addItem(item);
    }

    onCancelItem() {
        this.setState({isAddingItem: false});
    }

}


