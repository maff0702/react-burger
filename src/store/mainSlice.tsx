import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    isModal: false,
  },
  reducers: {
    openModal: (state) => {state.isModal = true},
    closeModal: (state) => {state.isModal = false},
  },
  extraReducers: {},
})

export const {
  openModal,
  closeModal,
} = mainSlice.actions;
export default mainSlice.reducer;
