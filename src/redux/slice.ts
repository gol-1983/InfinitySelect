import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IState {
    title: {id: any; name: string;}[];
}

const initialState: IState = {
    title: [{id:"", name:''}],
};

export const SelectSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    updateTitle: (state, {payload}) => {
        state.title = [...state.title, payload];
    },
    updateAllTitles: (state, {payload}) => {
        state.title = [...payload];
    }
  },
});



export const { updateTitle, updateAllTitles } = SelectSlice.actions;
export const authReducer = SelectSlice.reducer;
