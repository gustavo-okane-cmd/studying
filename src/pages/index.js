import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
// import { wrapper } from "../store/store";
import {
    setAtivos,
    adicionarAtivo,
    selecionarAtivos,
} from "../store/reducers/ativosSlice";

import get_nomes from "../api/nomes_ativos";
import Autocomplete from "../components/Autocomplete";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const Title = styled.h1`
    color: red;
    font-size: 50px;
`;

const StyledButton = styled(Button)`
    background-color: #6772e5;
    color: #fff;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    padding: 7px 14px;
    &:hover {
        background-color: #5469d4;
    }
`;

export default function Index(props) {
    const { query } = useRouter();
    const dispatch = useDispatch();
    const ativos = useSelector(selecionarAtivos);
    if (props?.server_side?.success == true) {
        dispatch
    }
    console.log(props);
    // console.log(props.nomes_ativos);
    return (
        <Container maxWidth="md">
            {/* {console.log(ativos)} */}
            <Title>Home Page Title with styled-components</Title>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Next.js v4-beta example teste ã ´´ 11 '' `` ^^ ~~ ççç
                </Typography>
                <StyledButton
                    onClick={() => dispatch(adicionarAtivo(["BBDC4", "BBDC4"]))}
                >
                    teste
                </StyledButton>

                <Typography variant="h4" component="h1" gutterBottom>
                    {ativos?.map((nome, i) => {
                        console.log(nome);
                        return <div key={i}>{nome}</div>;
                    })}
                </Typography>
            </Box>
            <Box my={4}>
                <Autocomplete></Autocomplete>
            </Box>
            <Box my={4}>
                {props?.nomes_ativos?.map((nome, i) => {
                    // console.log(nome);
                    return <div key={i}>{nome}</div>;
                })}
                {/* <div>{console.log(props)}</div> */}
            </Box>
        </Container>
    );
}

export const getServerSideProps = async (ctx) => {
    // const res = await fetch('https://.../data')
    // const data = await res.json()
    try {
        const { query } = ctx;
        // const ativos = query?.ativos;
        // const response = await get_nomes(["PETR4", "09326708000101", "BOVA11"]);
        const response = await get_nomes(query.ativos.split(" "));

        console.log(response);

        return {
            props: {
                nomes_ativos: response.data,
                server_side: { success: true },
            },
        };
    } catch (error) {
        return {
            props: {
                passou: false,
            },
        };
    }
};

// export const getServerSideProps = wrapper.getServerSideProps(
//     async ({ ctx }) => {
//         // const res = await fetch('https://.../data')
//         // const data = await res.json()
//         try {
//             const dispatch = useDispatch();
//             const { query } = ctx;
//             // console.log(query);
//             if (typeof query.ativos !== undefined) {
//                 // const response = await get_nomes([
//                 //     "PETR4",
//                 //     "09326708000101",
//                 //     "BOVA11",
//                 // ]);
//                 const response = await get_nomes(query.split(" "));
//             }

//             return {
//                 props: {
//                     nomes_ativos: response.data ?? null,
//                     teste: query,
//                 },
//             };
//         } catch (error) {
//             return {
//                 props: {},
//             };
//         }
//     }
// );
