import React from 'react';
import Item from 'lib/Item';

class ItemRow extends React.Component{
    constructor(props) {
        super(props);
        this.name = null;
        this.pw = null;
        this.type = null;
    }

    static propTypes = {            
        item: React.PropTypes.object.isRequired,
        onModify: React.PropTypes.func,
        onSave: React.PropTypes.func,
        onDelete: React.PropTypes.func
    }             

    static defaultProps = {
        onModify: () => {},
        onSave: () => {},
        onDelete: () => {} 
    }       

    renderModified() {
        return(
            <tr>
                <td>{this.props.item.id}</td>
                <td>
                    <input
                        defaultValue={this.props.item.name}
                        ref={node => {this.name = node}} />
                </td>
                <td>
                    <input
                        defaultValue={this.props.item.pw}
                        ref={node => {this.pw = node}} />
                </td>
                <td>
                    <input
                        defaultValue={this.props.item.type}
                        ref={node => {this.type = node}} />
                </td>
                <td onClick={this.onSave.bind(this)}><span className="bp-icon-save">&#x2714;</span></td>
            </tr>
        );
    }

    renderView() {
        return(
            <tr>
                <td>{this.props.item.id}</td>
                <td onClick={this.onClick.bind(this)}>{this.props.item.name}</td>
                <td onClick={this.onClick.bind(this)}>{this.props.item.pw}</td>
                <td onClick={this.onClick.bind(this)}>{this.props.item.type}</td>
                <td onClick={this.onDelete.bind(this)}><span className="bp-icon-delete">&#x2718;</span></td>
            </tr>
        );
    }

    render() {
        if (this.props.item.isModified) {
            return this.renderModified();
        }

        return this.renderView();
    }

    onClick() {
        if (!this.props.item.isModified) {
            this.props.onModify(this.props.item);
        }
    }

    onSave() {
        if (this.props.item.isModified) {
            let item = new Item(this.props.item);
            item.name = this.name.value;
            item.pw = this.pw.value;
            item.type = this.type.value;
            this.props.onSave(item);
        }
    }

    onDelete() {
        this.props.onDelete(this.props.item);
    }

}

export default class Items extends React.Component{

    static propTypes = {            
        items: React.PropTypes.array,
        onModify: React.PropTypes.func,
        onSave: React.PropTypes.func,
        onDelete: React.PropTypes.func
    }             

    static defaultProps = {
        onModify: () => {},
        onSave: () => {},
        onDelete: () => {} 
    }       

    render() {
        return(
            <div>
                <h2>Items</h2>
                <table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Password</td>
                            <td>Type</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.items.map((item) => {
                            return (<ItemRow
                                onModify={this.props.onModify}
                                onSave={this.props.onSave}
                                onDelete={this.props.onDelete}
                                key={item.id}
                                item={item}/>);
                        })}
                        <ItemRow
                            onSave={this.props.onSave}
                            key="0"
                            item={new Item({isModified: true})}
                            />
                    </tbody>
                </table>
            </div>
        );
    }
}
