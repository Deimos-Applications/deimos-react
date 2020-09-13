import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExampleState {
  counter: number;
}

const initialState: ExampleState = {
  counter: 0,
};

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    setCounter: (state, { payload }: PayloadAction<number>) => {
      state.counter = payload;
    },
  },
});

export const { setCounter } = exampleSlice.actions;

export const exampleSelector = (state: { example: ExampleState }) =>
  state.example;

export default exampleSlice.reducer;
