import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from './common/table';


class  RentalsTable extends Component { 
    columns = [
        { 
            path: 'customer', 
            label: 'Customer', 
            content: (rental) => <Link to={`/rentals/${rental._id}`}> {rental._id} </Link>
        },
       
        { 
            path: 'renteditem', 
            label: 'Rented item' 
        },
        { 
            path: 'rentaldate', 
            label: 'Rental date' 
        },
        { 
            path: 'rentaldays', 
            label: 'Rented days' 
        },
       
        { 
            key: 'delete',
            content: (rental) => (
                <button 
                    onClick={() => this.props.onDelete(rental)} 
                    className="btn btn-danger btn-sm"
                > Delete </button>
            )
        }
    ];

    render() { 
        const { rentals, onSort, sortColumn } = this.props;
        
        return (
            <Table 
                columns={this.columns}
                data={rentals}
                sortColumn={sortColumn}
                onSort={onSort}
            />
         );
    }
}
 
export default RentalsTable;
