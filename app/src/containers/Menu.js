import React from 'react'
import {connect} from 'react-redux'
import {saveDb} from '../actions'

const mapStateToProps = (state) => {
    return {
        pdb: state.pdb
    }
}

let Menu = ({dispatch, pdb, onHome, onOpen, onMeta}) => {
    return (
        <div className="bp-menu">
            <li onClick={onHome}>Home</li>
            <li onClick={onOpen}>Open</li>
            <li onClick={onMeta}>Meta</li>
            <li onClick={() => {
                dispatch(saveDb(pdb))
            }}>Save DB</li>
        </div>
    )
}

Menu = connect(mapStateToProps)(Menu)

export default Menu

