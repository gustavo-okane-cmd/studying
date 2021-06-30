import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    arr_ativos: [],
    nomes_ativos: [],
};

export const ativosSlice = createSlice({
    name: "ativos",
    initialState,

    reducers: {
        setAtivos(state, action) {
            state.arr_ativos = action.payload[0];
            state.nomes_ativos = action.payload[1];
        },
        adicionarAtivo(state, action) {e_ativos: [...state.nomes_ativos, action.payload[1]],
            // };
            state.arr_ativos = [...state.arr_ativos, action.payload[0]];
            state.nomes_ativos = [...state.nomes_ativos, action.payload[1]];
        },
        removerAtivo(state, action) {
            state.arr_ativos = state.arr_ativos.filter((e) => {
                return e == action.payload;
            });
        },
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log("HYDRATE", state, action.payload);
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { setAtivo, adicionarAtivo, removerAtivo } = ativosSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selecionarAtivos = (state) => state.arr_ativos;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

// export const fetchSubject = (id) => async (dispatch) => {
//   const timeoutPromise = (timeout) =>
//     new Promise((resolve) => setTimeout(resolve, timeout));

//   await timeoutPromise(200);

//   dispatch(
//     subjectSlice.actions.setEnt({
//       [id]: {
//         id,
//         name: `Subject ${id}`,
//       },
//     })
//   );
// };

// export const selectSubject = (id) => (state) =>
//   state?.[subjectSlice.name]?.[id];

export default ativosSlice.reducer;
