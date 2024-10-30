import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from './common/table';


class CustomersTable extends Component { 
    columns = [
        { 
            path: 'name', 
            label: 'Name', 
            content: (customer) => <Link to={`/customers/${customer._id}`}> {customer.name} </Link>
        },
        { path: 'cpf', label: 'CPF' },
        { 
            path: 'address.street', 
            label: 'Street' 
        },
        { 
            path: 'address.number', 
            label: 'Number' 
        },
        { 
            path: 'address.city', 
            label: 'City' 
        },
        { 
            path: 'address.state', 
            label: 'State' 
        },
        { 
            key: 'delete',
            content: (customer) => (
                <button 
                    onClick={() => this.props.onDelete(customer)} 
                    className="btn btn-danger btn-sm"
                > Delete </button>
            )
        }
    ];

    render() { 
        const { customers, onSort, sortColumn } = this.props;
        
        return (
            <Table 
                columns={this.columns}
                data={customers}
                sortColumn={sortColumn}
                onSort={onSort}
            />
         );
    }
}
 
export default CustomersTable;
