import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

let rentals = [
    {
      _id: "1",
      name: "João da Silva",
      cpf: "123.456.789-00",
      address: {
        street: "Rua das Flores",
        number: 123,
        city: "São Paulo",
        state: "SP",
      },
    },
    {
      _id: "2",
      name: "Maria Oliveira",
      cpf: "987.654.321-00",
      address: {
        street: "Avenida Brasil",
        number: 456,
        city: "Rio de Janeiro",
        state: "RJ",
      },
    },
    {
      _id: "3",
      name: "Carlos Souza",
      cpf: "111.222.333-44",
      address: {
        street: "Rua das Palmeiras",
        number: 789,
        city: "Belo Horizonte",
        state: "MG",
      },
    },
    {
      _id: "4",
      name: "Ana Costa",
      cpf: "444.555.666-77",
      address: {
        street: "Praça da Liberdade",
        number: 101,
        city: "Curitiba",
        state: "PR",
      },
    },
    {
      _id: "5",
      name: "Lucas Mendes",
      cpf: "222.333.444-55",
      address: {
        street: "Rua do Comércio",
        number: 202,
        city: "Porto Alegre",
        state: "RS",
      },
    },
  ];

let customers = [
    {
      _id: "1",
      name: "João da Silva",
      cpf: "123.456.789-00",
      address: {
        street: "Rua das Flores",
        number: 123,
        city: "São Paulo",
        state: "SP",
      },
    },
    {
      _id: "2",
      name: "Maria Oliveira",
      cpf: "987.654.321-00",
      address: {
        street: "Avenida Brasil",
        number: 456,
        city: "Rio de Janeiro",
        state: "RJ",
      },
    },
    {
      _id: "3",
      name: "Carlos Souza",
      cpf: "111.222.333-44",
      address: {
        street: "Rua das Palmeiras",
        number: 789,
        city: "Belo Horizonte",
        state: "MG",
      },
    },
    {
      _id: "4",
      name: "Ana Costa",
      cpf: "444.555.666-77",
      address: {
        street: "Praça da Liberdade",
        number: 101,
        city: "Curitiba",
        state: "PR",
      },
    },
    {
      _id: "5",
      name: "Lucas Mendes",
      cpf: "222.333.444-55",
      address: {
        street: "Rua do Comércio",
        number: 202,
        city: "Porto Alegre",
        state: "RS",
      },
    },
  ];


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    let retorno = {}
    retorno = {"mensagem": "Servidor TWM"};
    console.log("Alguém acessou o endereço root");
    res.send(retorno);
})

app.get("/customers", (req, res) => {
    let retorno = {}
    retorno = {"mensagem": "Dentro do About"};
    console.log("Alguém entrou no /about");
    res.send(retorno);
})

app.post("/customers/new", (req, res) => {
    let dados = req.body;
    let retorno ={}
    customers._id = new Date().getTime().toString();
    customers.push(dados['customers']);
    console.log(customers);
    retorno = {"mensagem": "Dentro do POST"};
    res.send(retorno);
})

app.get("/customers/new", (req, res) => {
    res.send(customers);
    
})

app.post("/rentals/new", (req, res) => {
    let dados = req.body;
    let retorno ={}
    rentals._id = new Date().getTime().toString();
    rentals.push(dados['rentals']);
    console.log(rentals);
    retorno = {"mensagem": "Dentro do POST"};
    res.send(retorno);
})

app.get("/rentals/new", (req, res) => {
    res.send(rentals);
    
})

app.listen(port, () => {
    console.log(`Servidor em execução na porta ${port}`);
});