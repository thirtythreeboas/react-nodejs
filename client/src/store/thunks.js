import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API = axios.create({
  baseURL: 'http://localhost:8000'
})

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (userInfo) => {
    try {
      const res = await API.post('/login', { 
        email: userInfo.email, 
        password: userInfo.password 
      })
      if (res.status === 200) {
        console.log(res.status)
      }
      return true
    } catch (error) {
      console.log('Error: src/store/thunk/loginThunk')
      return false
    }
  }
)

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (userInfo) => {
    try {
      console.log(userInfo)
      const res = await API.post('/signup', {
        name: userInfo.name,
        email: userInfo.email, 
        password: userInfo.password,
        birthDate: userInfo.date,
        gender: userInfo.gender,
        photo: userInfo.photo
      })
      if (res.status === 200) {
        console.log(res.status)
      }
      return true
    } catch (error) {
      console.log('Error: src/store/thunk/loginThunk')
      return false
    }
  }
)