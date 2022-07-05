import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories, getFeaturedPlaylists, getNewReleases } from "./operations";
import { getToken } from "./operations/operations";
//axios api

const initialState = {
    newReleasesList: [],
    featuredPlaylistsList: [],
    categoriesList: [],
    newReleaseLoading: true,
    featuredListLoading: true,
    categoryLoading: true,
    error: "",
};

export const fetchNewReleasesList = createAsyncThunk(
    "music/fetchNewReleasesList",
    async ( os, { rejectWithValue }) => {
        try {
            const list = await getNewReleases(os);
            return list;
        } catch (err) {
            if (err.message === "Request failed with status code 401") {
                getToken();
            }
            return rejectWithValue([], err);
        }
    }
);

export const fetchFeaturedPlaylistsList = createAsyncThunk(
    "music/fetchFeaturedPlaylistsList",
    async (_, { rejectWithValue }) => {
        try {
            const list = await getFeaturedPlaylists();
            return list;
        } catch (err) {
            if (err.message === "Request failed with status code 401") {
                getToken();
            }
            return rejectWithValue([], err);
        }
    }
);

export const fetchCategoriesList = createAsyncThunk(
    "music/fetchCategoriesList",
    async (os, { rejectWithValue }) => {
        try {
            const list = await getCategories(os);
            return list;
        } catch (err) {
            if (err.message === "Request failed with status code 401") {
                getToken();
            }
            return rejectWithValue([], err);
        }
    }
);

const { actions, reducer } = createSlice({
    name: "music",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchNewReleasesList.fulfilled]: (state, { payload }) => {
            state.newReleasesList = payload;
            state.newReleaseLoading = false;
        },
        [fetchNewReleasesList.pending]: (state) => {
            state.newReleaseLoading = true;
        },
        [fetchNewReleasesList.rejected]: (state, { payload, error }) => {
            state.newReleaseLoading = false;
            state.newReleasesList = payload;
            state.error = error;

        },
        [fetchFeaturedPlaylistsList.fulfilled]: (state, { payload }) => {
            state.featuredPlaylistsList = payload;
            state.featuredListLoading = false;
        },
        [fetchFeaturedPlaylistsList.pending]: (state) => {
            state.featuredListLoading = true;
        },
        [fetchFeaturedPlaylistsList.rejected]: (state, { payload, error }) => {
            state.featuredListLoading = false;
            state.featuredPlaylistsList = payload;
            state.error = error;
        },
        [fetchCategoriesList.fulfilled]: (state, { payload }) => {
            state.categoriesList = payload;
            state.categoryLoading = false;
        },
        [fetchCategoriesList.pending]: (state) => {
            state.categoryLoading = true;
        },
        [fetchCategoriesList.rejected]: (state, { payload, error }) => {
            state.categoryLoading = false;
            state.categoriesList = payload;
            state.error = error;
        },
    },
});

export { actions, reducer };