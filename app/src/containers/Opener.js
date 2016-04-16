import {connect} from 'react-redux'
import {loadDb} from '../actions'
import OpenDb from 'components/OpenDb';

const mapStateToProps = (state) => {
    return {
        url: state.pdb.url,
        pw: state.pdb.pw
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOpen: (url, pw) => {
            dispatch(loadDb(url, pw))
        }
    }
}

let Opener = connect(mapStateToProps, mapDispatchToProps)(OpenDb)

export default Opener
