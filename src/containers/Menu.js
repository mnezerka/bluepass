import React from 'react'
import {connect} from 'react-redux'
import {save} from '../actions'

const mapStateToProps = (state) => {
    return {
        pdb: state.pdb
    }
}

let Menu = ({dispatch, pdb, onHome, onOpen}) => {
    return (
        <div className="bp-menu">
            <li onClick={onHome}>Home</li>
            <li onClick={onOpen}>Open</li>
            <li onClick={() => {
                dispatch(save(pdb))
            }}>Save DB</li>
        </div>
    )
}

Menu = connect(mapStateToProps)(Menu)

export default Menu

