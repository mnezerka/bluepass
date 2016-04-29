import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'actions/Db';
import Tree from 'react-ui-tree';

var treeData = {
    label: 'ahoj',
    children: [
        { 
            label: 'ahoj2'
        }
    ]
} 
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

    componentWillMount() {
        this.props.actions.fetchDb();
    }

    renderNode() {
        return (<div>ahoj</div>);
    }


    render() {
        return (
            <div className="bp-page bp-page-main">
                <h1>Main page</h1>
                <Tree
                    paddingLeft={20}
                    tree={treeData}
                    renderNode={this.renderNode}  // renderNode(node) return react element
                />

            </div>
       );
    }
}


