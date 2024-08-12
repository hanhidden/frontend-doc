import { configureStore,Tuple   } from '@reduxjs/toolkit'
import counterReducer from './counterslice.js'
import documentslice  from './documentslice.js'


export default configureStore({
  reducer: {
    counter: counterReducer,
    document: documentslice,
  }
})



