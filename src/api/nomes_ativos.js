import axios from "axios";

export default async (ativos) => {
    var data = JSON.stringify({ ativos });

    var config = {
        method: "post",
        url: "https://www.env6.node2.comdinheiro.com.br/Clientes/INTER_COMPARADOR/GET_NOMES.php",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    };

    return await axios(config);
};
