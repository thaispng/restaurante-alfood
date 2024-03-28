import { useState, useEffect} from "react";
import Restaurante from "../../../interfaces/IRestaurante";
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, Button } from "@mui/material";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Link } from "react-router-dom";
import http from "../../../http";

const AdministracaoRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);


    // useEffect(() => {
    //     axios.get<IRestaurante[]>("http://localhost:8000/api/v2/restaurantes/")
    //         .then((resposta) => {
    //             setRestaurantes(resposta.data);
    //         })
    // }, []);


    useEffect(() => {
        http.get<IRestaurante[]>("restaurantes/")
            .then((resposta) => {
                setRestaurantes(resposta.data);
            })
    }, []);

    // const excluir = (restauranteAhSerExcluido: IRestaurante) => {
    //     axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteAhSerExcluido.id}/`)
    //         .then(() => {
    //             const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id)
    //             setRestaurantes([ ...listaRestaurante ])
    //         })
    // }

    const excluir = (restauranteAhSerExcluido: IRestaurante) => {
        http.delete(`restaurantes/${restauranteAhSerExcluido.id}/`)
            .then(() => {
                const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id)
                setRestaurantes([ ...listaRestaurante ])
            })
    }


    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>editar</TableCell>
                        <TableCell>excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                   {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
                        <TableCell>{restaurante.nome}</TableCell>
                        <TableCell>
                           <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>
                        </TableCell>
                        <TableCell>
                        <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>)}
                    </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AdministracaoRestaurantes;