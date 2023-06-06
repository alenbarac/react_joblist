import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'

const initialState = {
  isLoading: false,
  user: null,
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
  console.log(`Login User; ${user}`)
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
      toast.success(`Hello there ${user.name}`)
    })
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    })
  },
})

export default userSlice.reducer
