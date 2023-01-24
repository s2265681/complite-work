import { createSlice, createAsyncThunk } from "../../package/redux-toolkit";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
    pending: false,
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

  // object or function 收集 reducer
  extraReducers: {
    "counter/fetchHitokoto/pending": (state, action) => {
      state.pending = true;
    },
    "counter/fetchHitokoto/fulfilled": (state, action) => {
      state.hitokoto = action.payload.hitokoto;
      state.pending = false;
    },
    "counter/fetchHitokoto/rejected": (state, action) => {
      state.hitokoto = "error";
      state.pending = false;
    },
  },
  // 集成了 redux-thunk 中间件
  // extraReducers: (builder) => {
  //   // 将 actions 进行收集
  //   builder.addCase(fetchHitokoto.pending, (state, action) => {
  //     state.pending = true;
  //   });
  //   builder.addCase(fetchHitokoto.fulfilled, (state, action) => {
  //     state.hitokoto = action.payload.hitokoto;
  //     state.pending = false;
  //   });
  //   builder.addCase(fetchHitokoto.rejected, (state, action) => {
  //     state.hitokoto = "error";
  //     state.pending = false;
  //   });
  // },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
