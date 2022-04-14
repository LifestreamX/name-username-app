import { createSlice } from '@reduxjs/toolkit';
import { UsersData } from '../DummyData';

export const userSlice = createSlice({
  name: 'users',
  initialState: { value: UsersData },
  reducers: {
    addUser: (state, action) => {
      state.value.push(action.payload);
    },

    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    },

    updateUsername: (state, action) => {
      state.value.map((user) => {
        if (action.payload.username.length === 0) {
          return;
        } else if (user.id === action.payload.id) {
          user.username = action.payload.username;
        }
      });
    },
  },
});

export const { addUser } = userSlice.actions;
export const { updateUsername } = userSlice.actions;
export const { deleteUser } = userSlice.actions;
export default userSlice.reducer;
