import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import './ItemsTable.styl';

export default class ItemsTable extends React.Component{

    static propTypes = {
        items: React.PropTypes.array,
        show: React.PropTypes.bool,
        onEdit: React.PropTypes.func,
        onDelete: React.PropTypes.func
    }

    renderItem(item) {
        return (
            <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td className="bp-item-actions">
                    <Glyphicon glyph="pencil" onClick={this.onItemClick.bind(this, item, 'edit')} />
                    {' '}
                    <Glyphicon glyph="trash" onClick={this.onItemClick.bind(this, item, 'delete')} />
                </td>
            </tr>
        );
    }

    render() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {this.props.items.map((item) => { return this.renderItem(item); })}
                </tbody>
            </Table>
        )
    }

    onItemClick(item, action) {
        switch(action) {
        case 'edit':
            this.props.onEdit(item);
            break;
        case 'delete':
            this.props.onDelete(item);
            break;
        }
    }
}
