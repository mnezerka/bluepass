import React from 'react'
import { connect } from 'react-redux'
import { addItem} from '../actions'


let AddItem = ({ dispatch }) => {
    let name
    let pw 

    return (
        <div className="bp-form">
            <i>Add new item</i>
            <div className="bp-form-field">
                <label>Name/Login</label><br/>
                <input ref={node => {name = node}} />
            </div>

            <div className="bp-form-field">
                <label>Password</label><br/>
                <input ref={node => {pw = node}} />
            </div>

            <button onClick={() => {
                dispatch(addItem(name.value, pw.value))
                name.value = ''
                pw.value = ''
            }}>
            Add Item 
            </button>
        </div>
    )
}
AddItem = connect()(AddItem)

export default AddItem
