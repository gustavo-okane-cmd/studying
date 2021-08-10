import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";

export const fetchAutocomplete = createAsyncThunk(
    "fetchAutocomplete",
    async (searchTerm, { getState, requestId }) => {
        const response = await axios.get(
            `https://www.env2.node2.comdinheiro.com.br/Clientes/INTER_COMPARADOR/autocomplete.php?term=${searchTerm}&ativos=`
        );
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
        setOpen(state, action) {
            state.open = action.payload;
        },
        setOptions(state, action) {
            state.options = action.payload;
        },
    },
    extraReducers: {
        [fetchAutocomplete.pending]: (state, action) => {
            state.loadingAutocomplete = true;
        },
        [fetchAutocomplete.fulfilled]: (state, action) => {
            state.options = action.payload;
            state.loadingAutocomplete = false;
        },
        [fetchAutocomplete.rejected]: (state, action) => {
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
