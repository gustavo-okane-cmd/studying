import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";

export const fetchAutocomplete = createAsyncThunk(
    "fetchAutocomplete",
    async (searchTerm, { getState, requestId }) => {
        const { loading } = getState().autocomplete;
        // if (loading !== "pending" || requestId !== currentRequestId) {
        // if (loading !== "pending") {
        //     return;
        // }
        const response = await axios.get(
            `https://www.env6.node2.comdinheiro.com.br/Clientes/INTER_COMPARADOR/autocomplete.php?term=${searchTerm}&ativos=`
        );

        // const todos = await response.data;

        // if (active) {
        //     dispatch(setOptions(Object.keys(todos).map((key) => todos[key])));
        // }

        return response.data;
    }
);

const autocompleteSlice = createSlice({
    name: "autocomplete",
    initialState: {
        options: [],
        open: false,
        loading: "idle",
        loadingAutocomplete: false,
        term: "",
        waiting: null,
    },
    reducers: {
        setLoadingAutocomplete(state, action) {
            state.loadingAutocomplete = action.payload;
        },
        setOpen(state, action) {
            state.open = action.payload;
            state.loadingAutocomplete = !action.payload;
        },
        setOptions(state, action) {
            state.options = action.payload;
        },
    },
    extraReducers: {
        [fetchAutocomplete.pending]: (state, action) => {
            // if (state.loading === "idle") {
            //     state.loading = "pending";
                // state.currentRequestId = action.meta.requestId;
            // }
        },
        [fetchAutocomplete.fulfilled]: (state, action) => {
            // const { requestId } = action.meta;
            // if (
            //     state.loading === "pending"
            //     // state.loading === "pending" &&
            //     // state.currentRequestId === requestId
            // ) {
            //     state.loading = "idle";
            //     // state.currentRequestId = undefined;

            // }
            state.options = action.payload;
        },
        [fetchAutocomplete.rejected]: (state, action) => {
            // const { requestId } = action.meta;
            // if (
            //     state.loading === "pending"
            //     // state.loading === "pending" &&
            //     // state.currentRequestId === requestId
            // ) {
            //     state.loading = "idle";
            //     // state.currentRequestId = undefined;

            //     state.error = action.error;
            // }
            console.log(action);
        },
        [HYDRATE]: (state, action) => {
            console.log("HYDRATE", state, action.payload);
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

// export const { setAtivo, adicionarAtivo, removerAtivo } = ativosSlice.actions;
export const { setLoasetLoadingAutocompleteding, setOpen, setOptions } =
    autocompleteSlice.actions;

export const selectLoadingAutocomplete = (state) =>
    state.autocomplete.loadingAutocomplete;
export const selectOpen = (state) => state.autocomplete.open;
export const selectOptions = (state) => state.autocomplete.options;

export default autocompleteSlice.reducer;
