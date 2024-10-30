import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

let rentals = [
    {
      _id: "1",
      customer: "João da Silva",
      renteditem: "123.456.789-00",
      rentaldate: "10/30/2024",
      renteditem: "Terminator",
    },
    
     {
       _id: "2",
       customer: "Maria Oliveira",
       renteditem: "Die Hard",
       rentaldate: "10/28/2024",
       rentaldays: "3",
     },
    // {
    //   _id: "3",
    //   customer: "Carlos Pereira",
    //   renteditem: "Get Out",
    //   rentaldate: "10/27/2024",
    //   rentaldays: "5",
    // },
    // {
    //   _id: "4",
    //   customer: "Ana Costa",
    //   renteditem: "Trip to Italy",
    //   rentaldate: "10/29/2024",
    //   rentaldays: "2",
    // },
    // {
    //   _id: "5",
    //   customer: "Roberto Santos",
    //   renteditem: "Airplane",
    //   rentaldate: "10/25/2024",
    //   rentaldays: "7",
    // },
    // {
    //   _id: "6",
    //   customer: "Patrícia Almeida",
    //   renteditem: "Wedding Crashers",
    //   rentaldate: "10/26/2024",
    //   rentaldays: "1",
    // },
    // {
    //   _id: "7",
    //   customer: "Fernando Lima",
    //   renteditem: "Gone Girl",
    //   rentaldate: "10/30/2024",
    //   rentaldays: "6",
    // },
    // {
    //   _id: "8",
    //   customer: "Luciana Rocha",
    //   renteditem: "The Sixth Sense",
    //   rentaldate: "10/24/2024",
    //   rentaldays: "3",
    // },
    // {
    //   _id: "9",
    //   customer: "Ricardo Martins",
    //   renteditem: "The Avengers",
    //   rentaldate: "10/31/2024",
    //   rentaldays: "2",
    // },

  ];

let customers = [
    {
      _id: "4",
      name: "João da Silva",
      cpf: "123.456.789-00",
      address: {
        street: "Rua das Flores",
        number: 123,
        city: "São Paulo",
        state: "SP",
      },
    },
    // {
    //   _id: "2",
    //   name: "Maria Oliveira",
    //   cpf: "987.654.321-00",
    //   address: {
    //     street: "Avenida Brasil",
    //     number: 456,
    //     city: "Rio de Janeiro",
    //     state: "RJ",
    //   },
    // },
    // {
    //   _id: "3",
    //   name: "Carlos Souza",
    //   cpf: "111.222.333-44",
    //   address: {
    //     street: "Rua das Palmeiras",
    //     number: 789,
    //     city: "Belo Horizonte",
    //     state: "MG",
    //   },
    // },
    // {
    //   _id: "4",
    //   name: "Ana Costa",
    //   cpf: "444.555.666-77",
    //   address: {
    //     street: "Praça da Liberdade",
    //     number: 101,
    //     city: "Curitiba",
    //     state: "PR",
    //   },
    // },
    // {
    //   _id: "5",
    //   name: "Lucas Mendes",
    //   cpf: "222.333.444-55",
    //   address: {
    //     street: "Rua do Comércio",
    //     number: 202,
    //     city: "Porto Alegre",
    //     state: "RS",
    //   },
    // },
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