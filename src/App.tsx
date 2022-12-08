import "./App.css";

import Forms from "./components/Forms";
import { Button } from "./components/Button";
import ModalRender from "./components/ModalRender";
import "./components/Modal.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [modalOpen, setModal] = useState(false);
    const [data, setData] = useState({ hits: [] });
    const [query, setQuery] = useState("redux");

    function openModal() {
        setModal(true);
    }

    return (
        <div className="App">
            <header className="App-header">
                <Forms>
                    {/* Inputs estilizados usando MUI */}
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="standard-basic"
                            label="Name"
                            variant="standard"
                            onBlur={(e) => setName(e.target.value)}
                        />
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="standard-basic"
                            label="E-mail"
                            variant="standard"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="standard-basic"
                            label="Password"
                            variant="standard"
                            type="password"
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </Box>
                </Forms>

                {/* Button estilizado usando style-components */}
                <Button
                    onClick={() => {
                        openModal();
                        //REQUISIÇÃO:
                        const fetchData = async () => {
                            const result = await axios(
                                `http://hn.algolia.com/api/v1/search?query=${query}`
                            );

                            console.log(result.data);
                            setData(result.data);
                        };

                        fetchData();
                    }}
                >
                    Confirmar
                </Button>
                {modalOpen ? (
                    <ModalRender onClose={() => setModal(false)}>
                        <b>Nome: {name}</b>
                        <b>Email: {email}</b>
                        <b>Senha: {pass}</b>
                    </ModalRender>
                ) : (
                    <></>
                )}
            </header>
        </div>
    );
}

export default App;
