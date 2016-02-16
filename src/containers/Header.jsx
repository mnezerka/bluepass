import React from 'react';
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        name: state.pdb.name,
        items: state.pdb.items,
        modified: state.pdb.modified,
        fetching: state.pdb.fetching
    }
}

let Header = ({name, items, modified, fetching}) => {
    return (
        <div className="bp-header">
            BluePass <b>{name}</b> items:{items.length} modified:{modified ? 'yes' : 'no'}
            {fetching ? 'fetching' : ''}
        </div>
    )
}
Header = connect(mapStateToProps)(Header)

export default Header 
