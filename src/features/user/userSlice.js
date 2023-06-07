import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import { addUserToLocalStorage, getUserFromLocalStorage } from '../../utils/localStorage'

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
}

export const registerUser = createAsyncThunk('user/registerUser', async (user, thunkApi) => {
  try {
    const response = await customFetch.post('/auth/register', user)
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.msg)
  }
})

export const loginUser = createAsyncThunk('user/loginUser', async (user, thunkApi) => {
  try {
    const response = await customFetch.post('/auth/login', user)
    return response.data
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.msg)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      const { user } = payload
      state.user = user
      state.isLoading = false
      addUserToLocalStorage(user)
      toast.success(`Hello there ${user.name}`)
    })
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    })
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      const { user } = payload
      state.user = user
      state.isLoading = false
      addUserToLocalStorage(user)
      toast.success(`Welcome back ${user.name}`)
    })
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    })
  },
})

export default userSlice.reducer
