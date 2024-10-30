import React, {useEffect, useState, Component} from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import './CustomersForm.css'; // Importação do CSS local
import movies from '../services/fakeMovieService';
import axios from 'axios';


  


export const cpfMask = (value) => {
    return value
        .replace(/\D/g, '') 
        .replace(/(\d{3})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};


const Rentals = () => {
    const [_id        ,SetId] = useState('');
    const [movie, setMovie] = useState('');
    const [customers, setCustomers] = useState([]); // Inicializando a lista de customers
    const [customer, setCustomer] = useState('');
    const [renteditem, setItem] = useState('');
    const [renteddays, setDay] = useState('');
    const [insererentals, setInsererentals] = useState(false)

    useEffect(() => {
        const fetchCustomers = async () => {
          try {
            const { data } = await axios.get("http://localhost:5000/customers/new");
            setCustomers(data);
          } catch (error) {
            console.error("Erro ao buscar os clientes", error);
          }
        };
        fetchCustomers();
      }, []);

    function limpar() {
        setCustomer('');
        setItem('');
        setDay('');
    }
   
    function handleChange1(event) {
        const customer = event.target.value;
        return customer;
    }
    function handleChange2(event) {
        const movie = (event.target.value);
        return movie;
    }

    function handleInsert() {
        setInsererentals(true);
    }

    useEffect(() => {
        

        if(insererentals) {
            setInsererentals(false);
            const timestampISO = new Date().toISOString();
            const date = new Date(timestampISO);


            const month = String(date.getMonth() + 1).padStart(2, '0'); 
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();

            const formattedDate = `${month}/${day}/${year}`;
            let customers = {}
            console.log(customer,renteditem,renteddays);
            customers = {
               // "_id"        :   parseInt(new Date().getTime().toString()),
               "_id" : parseInt(_id),
                "customers"  :   customer,
                "renteditem" :   renteditem,
                "rentaldate" :   formattedDate,
                "renteddays" :   renteddays,
            };
            
            fetch("http://localhost:5000/rentals/new", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "POST",
                body: JSON.stringify({Rentals})
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);                    
                })
                .catch((error) => console.log(error));
        }
    }, [insererentals,customer,renteddays,renteditem]);


    return (
        <div className="containerRental mt-4 ">
            <h1 className="text-center">Rentals Register</h1>
            <div className="FormularioRental ">
                <Form>
                    <Row className="mb-3">
                        <Col sm={12}>
                        <Form.Label>Customer</Form.Label>
                        <Form.Control className='d-flex form-control' 
                                value={customer}
                                onChange={(e) => setCustomer (e.target.value)}
                                placeholder="Customer name"
                        />
                        </Col>
                        </Row>
                        <Row>
                        <Col sm={12}>
                            <Form.Label>Rented item</Form.Label>
                            <Form.Control className='d-flex form-control' 
                                value={renteditem}
                                onChange={(e) => setItem (e.target.value)}
                                placeholder="Choose the movie"
                        />
                        </Col>  
                        </Row>

                    

                    <Row className="mb-3">
                        <Col sm={12}>
                            <Form.Label>Rented days</Form.Label>
                            <Form.Control
                                value={renteddays}
                                onChange={(e) => setDay (e.target.value)}
                                placeholder="How much days"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={12}>
                            <Form.Label>Id</Form.Label>
                            <Form.Control
                                value={_id}
                                onChange={(e) => SetId (e.target.value)}
                                placeholder="Set id"
                            />
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-center">
                        <Button className="me-2" variant="danger" onClick={limpar}>
                            Excluir
                        </Button>
                        <Button variant="success" onClick={
                            () => handleInsert()
                        }>
                            Salvar
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Rentals;
