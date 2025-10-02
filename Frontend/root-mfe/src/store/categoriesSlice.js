import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async(_, {rejectWithValue}) => {
        try{
            const res = await fetch("http://localhost:4000/api/categories");
            if (!res.ok) throw new Error("Failed to fetch categories");
            const data = await res.json();
            return data;
        } catch(err){
            return rejectWithValue(err.message);
        }
        }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default categoriesSlice.reducer;