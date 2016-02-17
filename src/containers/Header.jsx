import React from 'react';
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        name: state.pdb.name,
        items: state.pdb.items,
        modified: state.pdb.modified,
        fetching: state.pdb.fetching,
        error: state.pdb.error
    }
}

let Header = ({name, items, modified, fetching, error}) => {
    return (
        <div className="bp-header">
            <b>{name}</b> items:{items.length} modified:{modified ? 'yes' : 'no'}
            {fetching ? 'fetching' : null}
            {error && <span className="bp-error">fetching error</span>}
        </div>
    )
}
Header = connect(mapStateToProps)(Header)

export default Header 
