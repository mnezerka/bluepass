import React from 'react';
import './Tree.styl';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

export default class Tree  extends React.Component{

    static propTypes = {
        items: React.PropTypes.array,
        show: React.PropTypes.bool,
        onSelect: React.PropTypes.func
    }

    renderItem(item) {
        return (
            <ListGroupItem
                header={item.label}
                onClick={this.onItemClick.bind(this, item)}>
                {item.label}
            </ListGroupItem>
        );
    }

    render() {
        return (
            <ListGroup>
                {this.props.items.map((item) => { return this.renderItem(item); })}
            </ListGroup>
        )
    }

    onItemClick(item) {
        this.props.onSelect(item);
    }
}
