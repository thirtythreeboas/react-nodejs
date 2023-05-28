import { configureStore } from '@reduxjs/toolkit'
import contactReducer from '../store/contact'

export const store = configureStore({
  reducer: {
    contact: contactReducer
  }
})