import React from 'react';
import { connect } from 'react-redux'
import {metaDb} from 'actions';

const mapStateToProps = (state) => {
    return {
        name: state.pdb.name,
        pw: state.pdb.pw,
    }
}

let Meta = ({dispatch, name, pw}) => {
    let ctrlName
    let ctrlPw 

    return (
        <div className="bp-form">
            <h2>Meta</h2>
            <div className="bp-form-field">
                <label>Name</label><br/>
                <input defaultValue={name} ref={node => {ctrlName = node}} />
            </div>

            <div className="bp-form-field">
                <label>Password</label><br/>
                <input type="password" defaultValue={pw} ref={node => {ctrlPw = node}} />
            </div>

            <button onClick={() => {
                dispatch(metaDb(ctrlName.value, ctrlPw.value))
                //ctrlName.value = ''
                //ctrlPw.value = ''
            }}>
            Save</button>
        </div>
    )
}
Meta = connect(mapStateToProps)(Meta)

export default Meta 
