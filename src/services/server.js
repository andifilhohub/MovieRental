import customers from './fakeCustomersService.js';
import express from 'express';
import cors from 'cors';
//const express = require("express");
const app = express();
const port = 5000;
//const cors = require("cors");

//let alunos = [
  //  {
    //    "id": 1,
      //  "nome" : "Miguel",
       // "cpf" : "123.456.789-10"
   // }
// ]

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    let retorno = {}
    retorno = {"mensagem": "Servidor TWM"};
    console.log("Alguém acessou o endereço root");
    res.send(retorno);
})

app.get("/about", (req, res) => {
    let retorno = {}
    retorno = {"mensagem": "Dentro do About"};
    console.log("Alguém entrou no /about");
    res.send(retorno);
})

app.post("/customers", (req, res) => {
    let dados = req.body;
    console.log("eu sou bonitao", dados);
    customers.push(customers['customers']);
    retorno = {"mensagem": "Dentro do POST"};
    res.send(retorno);
})


app.delete("/alunos", (req, res) => {
    let dados = req.body;
    console.log(dados['id']);
    id = parseInt(dados['id']);
    let i = 0;
    let index = 0;

    for(i=0; i<alunos.length; i++) {
        if(alunos[i]['id'] === id) {
            console.log('Achei o elemento');
            index = i;
            break;
        }
        console.log(alunos[i]['nome']);
    }
    console.log(alunos[index]['nome']);
    const x = alunos.splice(index, 1);
    console.log(alunos);
    retorno = {"mensagem": "Dentro do DELETE"};
    res.send(retorno);
})


app.get("/customers/new", (req, res) => {
    res.send(customers);
    console.log(customers)
})


app.listen(port, () => {
    console.log(`Servidor em execução na porta ${port}`);
});