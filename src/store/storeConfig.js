import {createStore, combineReducers} from 'redux'
import UserReducer from './reducers/user'
import InventoryReducer from './reducers/inventorys'
import ShowModalReducer from './reducers/showModal'
import BarcodeReducer from './reducers/barcodes'
import NoticiasReducer from './reducers/noticiasRedux'


const reducers = combineReducers({
    user: UserReducer,
    inventorys: InventoryReducer,
    showModal: ShowModalReducer,
    barcodes: BarcodeReducer,
    noticias: NoticiasReducer

})

const storeConfig = createStore(reducers)

export default storeConfig