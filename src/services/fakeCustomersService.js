const customers = [
    // {
    //   _id: "1",
    //   name: "João da Silva",
    //   cpf: "123.456.789-00",
    //   address: {
    //     street: "Rua das Flores",
    //     number: 123,
    //     city: "São Paulo",
    //     state: "SP",
    //   },
    // },
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

export default customers;

export function getCustomers() {
  return customers;
}
export function getCustomer(id) {
    return customers.find((c) => c._id === id);
  }
  
  // Função para salvar um cliente (criar ou atualizar)
  export function saveCustomer(customer) {
    let customerInDb = customers.find((c) => c._id === customer._id) || {};
    
    // Atualiza os campos do cliente
    customerInDb.name = customer.name;
    customerInDb.cpf = customer.cpf;
    customerInDb.address = {
      street: customer.address.street,
      number: customer.address.number,
      city: customer.address.city,
      state: customer.address.state,
    };
  
    // Se o cliente não existir, cria um novo
    if (!customerInDb._id) {
      customerInDb._id = Date.now().toString();
      customers.push(customerInDb);
    }
  
    return customerInDb;
  }
  
  // Função para excluir um cliente pelo ID
  export function deleteCustomer(id) {
    let customerInDb = customers.find((c) => c._id === id);
    if (customerInDb) {
      customers.splice(customers.indexOf(customerInDb), 1);
    }
    return customerInDb;
  }
