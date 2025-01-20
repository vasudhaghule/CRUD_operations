import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    const response = await fetch(
      "https://6780cbe085151f714b07f070.mockapi.io/CRUDD",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const showUser = createAsyncThunk(
  "showUser",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "https://6780cbe085151f714b07f070.mockapi.io/CRUDD"
    );

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteuser = createAsyncThunk(
  "deleteUser",
  async (userId, { rejectWithValue }) => {
    const response = await fetch(
      `https://6780cbe085151f714b07f070.mockapi.io/CRUDD/${userId}`,
      {
        method: "DELETE",
      }
    );

    try {
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return userId; // Return the id of the deleted user for easy removal from the state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    console.log("updated data", data);
    const response = await fetch(
      `https://6780cbe085151f714b07f070.mockapi.io/CRUDD'/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: [],
  },



  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [showUser.pending]: (state) => {
      state.loading = true;
    },
    [showUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [showUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteuser.pending]: (state) => {
      state.loading = true;
    },
    [deleteuser.fulfilled]: (state, action) => {
      state.loading = false;
      const {id}= action.payload;
      if(id){
        state.users = state.users.filter((user) => user.id !== action.payload);
      }
  
    },
    [deleteuser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = state.users.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

  },
});

export default userDetail.reducer;


