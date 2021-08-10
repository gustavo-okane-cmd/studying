import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    setOpen,
    setOptions,
    selectLoadingAutocomplete,
    selectOpen,
    selectOptions,
    fetchAutocomplete,
} from "../store/reducers/autocompleteSlice";

import TextField from "@material-ui/core/TextField";
// import {
//     Autocomplete,
//     createFilterOptions,
// } from "@material-ui/lab/Autocomplete";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const ListTitle = styled.h2`
    margin: 0;
    font-size: 0.9em;
    font-weight: 600;
`;

const ListDescription = styled.h3`
    padding-top: 0;
    margin: 0;
    font-weight: 400;
    font-size: 0.75em;
`;

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const AutocompleteField = () => {
    const dispatch = useDispatch();
    // const [open, setOpen] = React.useState(false);
    // const [options, setOptions] = React.useState([]);
    // const loading = open && options.length === 0;
    const loadingAutocomplete = useSelector(selectLoadingAutocomplete);
    const open = useSelector(selectOpen);
    const options = useSelector(selectOptions);
    let typingTimeout = 0;
    console.log("options", options);

    const testFunc = () => {
        console.log("teste");
    };

    // React.useEffect(() => {
    //     let active = true;

    //     if (!loadingAutocomplete) {
    //         return undefined;
    //     }

    //     (async () => {
    //         const response = await axios.get(
    //             // "https://jsonplaceholder.typicode.com/posts"
    //             "https://www.env6.node2.comdinheiro.com.br/Clientes/INTER_COMPARADOR/autocomplete.php?term=petro&ativos="
    //         );

    //         await sleep(1e3); // For demo purposes.

    //         const dados = await response.data;

    //         if (active) {
    //             dispatch(
    //                 // setOptions(Object.keys(dados).map((key) => dados[key]))
    //                 setOptions(dados)
    //             );
    //         }
    //     })();

    //     return () => {
    //         active = false;
    //     };
    // }, [loadingAutocomplete]);

    React.useEffect(() => {
        if (!open) {
            dispatch(setOptions([]));
        }
    }, [open]);

    // filter={(s, k) =>
    //     s.length >= 3 && AutoComplete.caseInsensitiveFilter(s, k)
    // }

    return (
        <Autocomplete
            id="asynchronous-demo"
            style={{ width: 300 }}
            open={open}
            autoSelect
            filterOptions={(x) => x}
            onOpen={() => {
                dispatch(setOpen(true));
                console.log("!abriu");
            }}
            onClose={() => {
                dispatch(setOpen(false));
                console.log("!fechou");
            }}
            onChange={(event, newValue) => {
                console.log(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                //settar opções
                // console.log(newInputValue);
                // if (typingTimeout) {
                //     // clearTimeout(self.state.typingTimeout);
                //     dispatch(clearTypingTimeout);
                // }

                // dispatch(
                //     setTypingTimeout(
                //         setTimeout(() => {
                //             console.log("hue teste" + newInputValue);
                //         }, 2000)
                //     )
                // );

                if (typingTimeout) {
                    clearTimeout(typingTimeout);
                }

                typingTimeout = setTimeout(() => {
                    console.log("hue teste" + newInputValue);
                    dispatch(fetchAutocomplete(newInputValue));
                }, 300);
            }}
            getOptionSelected={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.title}
            renderOption={(option, state) => (
                <div>
                    <ListTitle>{option.title}</ListTitle>
                    <ListDescription>{option.description}</ListDescription>
                </div>
            )}
            options={options}
            loading={loadingAutocomplete}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Asynchronous"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loadingAutocomplete ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}
export default AutocompleteField