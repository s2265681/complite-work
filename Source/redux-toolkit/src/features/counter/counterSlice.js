import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { createSlice } from "../../package/redux-toolkit";

export const fetchHitokoto = createAsyncThunk(
  "counter/fetchHitokoto",
  async () => {
    return await fetch("https://v1.hitokoto.cn/").then((response) =>
      response.json()
    );
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    hitokoto: "",
    padding: false,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHitokoto.pending, (state, action) => {
      state.padding = true;
    });
    builder.addCase(fetchHitokoto.fulfilled, (state, action) => {
      state.hitokoto = action.payload.hitokoto;
      state.padding = false;
    });
    builder.addCase(fetchHitokoto.rejected, (state, action) => {
      state.hitokoto = "error";
      state.padding = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
