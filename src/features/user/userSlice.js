import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'

const initialState = {
  isLoading: false,
  user: null,
}

export const registerUser = createAsyncThunk('user/registerUser', async (user, thunkApi) => {
  try {
    const response = await customFetch.post('/auth/testingRegister', user)
    console.log(response)
  } catch (error) {
    toast.error(error.response.data.msg)
    console.log(error.response)
  }
})

export const loginUser = createAsyncThunk('user/loginUser', async (user, thunkApi) => {
  console.log(`Login User; ${user}`)
})

const userSlice = createSlice({ name: 'user', initialState })

export default userSlice.reducer
