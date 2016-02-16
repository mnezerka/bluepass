import {connect} from 'react-redux';
import Items from 'components/Items';

const mapStateToProps = (state) => {
    console.log('map state called', state);
    return {
        items: state.pdb.items
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log('map dispatch called');
    return {
        onToDoClick: (id) => {
            dispatch(toggleTodo(id))
        }
    }
}

const VisibleItems = connect(
    mapStateToProps,
    mapDispatchToProps)(Items)

export default VisibleItems 
