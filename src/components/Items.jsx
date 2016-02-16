import React from 'react';


class Item extends React.Component{

    static propTypes = {            
        item: React.PropTypes.object
    }             

    render() {
        return(
            <tr>
                <td>{this.props.item.name}</td>
                <td>pw</td>
            </tr>
        );
    }
}

export default class Items extends React.Component{

    static propTypes = {            
        items: React.PropTypes.array
    }             

    render() {
        return(
            <div>
                Items
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Password</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.items.map((item) => {
                            return <Item key={item.name} item={item}/>
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
