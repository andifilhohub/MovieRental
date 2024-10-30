import React, { Component } from "react";
import CustomersTable from './customersTable';
import paginate from '../utils/paginate';
import axios from "axios";
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';

class Customers extends Component {
    state = {
        customers: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: { path: 'title', order: 'asc' }
    };

    async componentDidMount() {
        const { data: customers } = await axios.get("http://localhost:5000/customers/new");
        this.setState({ customers });
    }

    handleDelete = (movie) => {
        const customers = this.state.customers.filter(m => m._id !== movie._id);
        this.setState({ customers });
    };

    handleLike = (movie) => {
        const customers = [...this.state.customers];
        const index = customers.indexOf(movie);
        customers[index] = { ...customers[index] };
        customers[index].liked = !customers[index].liked;
        this.setState({ customers });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
    };
    
    handleSearch = (query) => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    getPageData = () => {
        const { 
            pageSize, 
            currentPage,
            sortColumn, 
            selectedGenre,
            searchQuery, 
            customers: allCustomers, 
        } = this.state;

        let filtered = allCustomers;
        if (searchQuery)
            filtered = allCustomers.filter(m => 
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (selectedGenre && selectedGenre._id)
            filtered = allCustomers.filter(m => m.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const customers = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: customers };
    };
    
    render() {
        const { length: count } = this.state.customers;
        const { 
                sortColumn,
                searchQuery
            } = this.state;
        
        if (count === 0) return <p> There are no customers in the database. </p>;

        const { totalCount, data } = this.getPageData();

        return (
            <div className="row">
                
                <div className="col">
                    <Link 
                        to="/customers/new"
                        className="btn btn-primary"
                        style={{ marginBottom: 20 }}
                    >
                        New Customers
                    </Link>
                    <p> Showing: {totalCount} customers in the database. </p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <CustomersTable 
                        customers={data}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                        
                </div>
            </div>
        );
    }
}

export default Customers;