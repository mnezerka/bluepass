import {connect} from 'react-redux';
import Items from 'components/Items';
import {modifyItem, saveItem, deleteItem} from 'actions';

const mapStateToProps = (state) => {
    return {
        items: state.pdb.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onModify: (item) => {
            dispatch(modifyItem(item))
        },
        onSave: (item) => {
            dispatch(saveItem(item))
        },
        onDelete: (item) => {
            dispatch(deleteItem(item))
        }
    }
}

const VisibleItems = connect(
    mapStateToProps,
    mapDispatchToProps)(Items)

export default VisibleItems 
