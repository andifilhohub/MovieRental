import React, {useEffect, useState} from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import './CustomersForm.css'; // Importação do CSS local


export const cpfMask = (value) => {
    return value
        .replace(/\D/g, '') 
        .replace(/(\d{3})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};

const Customers = () => {
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cpf, setCpf] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [insereCustomers, setInsereCustomers] = useState(false);

    function limpar() {
        setNome('');
        setEndereco('');
        setCpf('');
        setNumero('');
        setComplemento('');
        setCidade('');
        setEstado('');
    }
   
  

    function handleInsert() {
        setInsereCustomers(true);
    }

    useEffect(() => {
        if(insereCustomers) {
            setInsereCustomers(false);
            let customers = {}
            customers = {
                "_id"      : parseInt(new Date().getTime().toString()),
                "name"     : nome,
                "cpf"      : cpf,
                "address"  : {"street":endereco,"number":numero,"city":cidade,"state":estado,},
            };
            console.log(nome,cpf);
            fetch("http://localhost:5000/customers/new", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "POST",
                body: JSON.stringify({customers})
              })
                .then((response) => response.json())
                .then((data) => {
                    console.log("DATA");
                    console.log(data);                    
                })
                .catch((error) => console.log(error));
        }
    }, [insereCustomers,nome, cpf, endereco, cidade, estado, numero, id]);

    return (
        <div className="container mt-4">
            <h1 className="text-center">Customers Register</h1>
            <div className="Formulario">
                <Form>
                    <Row className="mb-3">
                        <Col sm={6}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="type your name"
                            />
                        </Col>
                        <Col sm={6}>
                            <Form.Label>CPF</Form.Label>
                            <Form.Control
                                value={cpf}
                                onChange={(e) => setCpf(cpfMask(e.target.value))}
                                placeholder="type your cpf"
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col sm={12}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                                placeholder="Type your address"
                            />
                        </Col>
                        
                    </Row>

                    <Row className="mb-3">
                        <Col sm={4}>
                            <Form.Label>Number</Form.Label>
                            <Form.Control
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                placeholder="House number"
                            />
                        </Col>
                        <Col sm={4}>
                            <Form.Label>Complement</Form.Label>
                            <Form.Control
                                value={complemento}
                                onChange={(e) => setComplemento(e.target.value)}
                                placeholder="Complement"
                            />
                        </Col>
                        <Col sm={4}>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                                placeholder="City"
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col sm={12}>
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                placeholder="State"
                            />
                        </Col>
                        
                    </Row>

                    <div className="d-flex justify-content-end">
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


export default Customers;
