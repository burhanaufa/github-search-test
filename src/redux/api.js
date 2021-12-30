import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDataRepos = createAsyncThunk(
	"list/repos",
	async (payload, { rejectWithValue, getState, dispatch }) => {
		if (!payload.q) return null;
		try {
			const { data } = await axios.get(
				`https://api.github.com/search/repositories`,
				{
					params: payload,
				}
			);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error.response.data);
		}
	}
);

export const fetchDataUsers = createAsyncThunk(
	"list/user",
	async (payload, { rejectWithValue, getState, dispatch }) => {
		if (!payload.q) return null;
		try {
			const { data } = await axios.get(`https://api.github.com/search/users`, {
				params: payload,
			});
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error.response.data);
		}
	}
);

const reposSlices = createSlice({
	name: "repos",
	initialState: {},
	extraReducers: (builder) => {
		builder.addCase(fetchDataRepos.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(fetchDataRepos.fulfilled, (state, action) => {
			state.dataRepos = action?.payload;
			state.loading = false;
			state.error = undefined;
		});
		builder.addCase(fetchDataRepos.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.dataRepos = undefined;
		});
		builder.addCase(fetchDataUsers.pending, (state, action) => {
			state.loading = true;
			state.dataUser = null;
		});
		builder.addCase(fetchDataUsers.fulfilled, (state, action) => {
			state.dataUser = action?.payload;
			state.loading = false;
			state.error = undefined;
		});
		builder.addCase(fetchDataUsers.rejected, (state, action) => {
			state.loading = false;

			state.dataUser = undefined;
			state.error = action.payload;
		});
	},
});

export default reposSlices.reducer;
