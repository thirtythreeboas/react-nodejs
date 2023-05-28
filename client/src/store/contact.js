import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchUserById.fulfilled, (state, action) => {
    //   state.entities.push(action.payload)
    // })
  }
})

export const { increment, decrement, incrementByAmount } = contactSlice.actions

export default contactSlice.reducer