/**
 * @format
 */
import React from 'react'
import {Provider} from 'react-redux'
import Routes from './src/routes/index';

import storeConfig from './src/store/storeConfig'
const App = () =>{
return(

        <Provider store = {storeConfig}>
            <Routes></Routes>
        </Provider>
)
}

export default App;
