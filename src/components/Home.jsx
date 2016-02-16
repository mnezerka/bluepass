import React from 'react';
import AddItem from 'containers/AddItem';
import VisibleItems from 'containers/VisibleItems';

export default class Home extends React.Component{

    static propTypes = {            
        dbName: React.PropTypes.string
    }             

    static defaultProps = {         
        dbName: null 
    }       

    render() {
        return (
            <div>
                <VisibleItems/>
                <AddItem />
            </div>)
    }
}
