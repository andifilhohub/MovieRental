import React, {useEffect, useState} from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import './CustomersForm.css'; // Importação do CSS local
import { functionsIn } from 'lodash';

export const cpfMask = (value) => {
    return value
        .replace(/\D/g, '') 
        .replace(/(\d{3})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};

const Customers = () => {
    const [id, setId]                   = useState('');
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [insereCustomers, setInsereCustomers] = useState(false);

    function limpar() {
        setNome('');
        setEndereco('');
        setCpf('');
        setEmail('');
        setNumero('');
        setComplemento('');
        setCidade('');
        setEstado('');
    }
    function teste_backend() {
        fetch("http://localhost:5000/customers/new", {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
            method: "GET"
            })
            .then((response) => {
                if(response) console.log("Maravilha");
                else console.log("Problemas");
                return response.json();
            })
            .then((data) => {
                console.log("DATA");
                console.log(data['mensagem']);
            })
            .catch((error) => {
                console.log(error);
                console.log('VIXEEE');
            }); 
    }
    function mensagem() {
        let objetoJson = {
            'Nome': nome,
            'Endereço': endereco,
            'Cpf': cpf,
            'Email': email,
            'Numero': numero,
            'Complemento': complemento,
            'Cidade': cidade,
            'Estado': estado
        };
        console.log(objetoJson);
    }

    function handleInsert() {
        setInsereCustomers(true);
    }

    useEffect(() => {
        if(insereCustomers) {
            setInsereCustomers(false);
            let customers = {}
            customers = {
                "_id"      : parseInt(id),
                "name"     : nome,
                "address"  : {"street":endereco,"number":numero,"city":cidade,"state":estado},
                "cpf"      : cpf
            };
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
            <h1 className="text-center">Cadastro de Customers</h1>
            <div className="Formulario">
                <Form>
                    <Row className="mb-3">
                        <Col sm={6}>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Digite o nome"
                            />
                        </Col>
                        <Col sm={6}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Digite o email"
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col sm={6}>
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                                placeholder="Digite o endereço"
                            />
                        </Col>
                        <Col sm={6}>
                            <Form.Label>CPF</Form.Label>
                            <Form.Control
                                value={cpf}
                                onChange={(e) => setCpf(cpfMask(e.target.value))}
                                placeholder="Digite o CPF"
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col sm={4}>
                            <Form.Label>Número</Form.Label>
                            <Form.Control
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                placeholder="Número"
                            />
                        </Col>
                        <Col sm={4}>
                            <Form.Label>Complemento</Form.Label>
                            <Form.Control
                                value={complemento}
                                onChange={(e) => setComplemento(e.target.value)}
                                placeholder="Complemento"
                            />
                        </Col>
                        <Col sm={4}>
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                                placeholder="Cidade"
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col sm={12}>
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                placeholder="Estado"
                            />
                        </Col>
                        <Col sm={12}>
                            <div className="txtID" >
                                <Form.Label className="text-left" style={{ width: "100%" }}>ID</Form.Label>
                                <Form.Control                                         
                                    value={id}
                                    onChange={e=>setId(e.target.value)}
                                    />                                        
                            </div>
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
