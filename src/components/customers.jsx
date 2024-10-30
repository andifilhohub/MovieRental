import React, { Component } from "react";
import CustomersTable from './customersTable';
import Pagination from './common/pagination';
import paginate from '../utils/paginate';
import { getCustomers } from "../services/fakeCustomersService";
import { getGenres } from "../services/fakeGenreService";
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';

class Customers extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: { path: 'title', order: 'asc' }
    };

    componentDidMount() {
        const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];

        this.setState({ movies: getCustomers(), genres });
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
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
            movies: allCustomers, 
        } = this.state;

        let filtered = allCustomers;
        if (searchQuery)
            filtered = allCustomers.filter(m => 
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (selectedGenre && selectedGenre._id)
            filtered = allCustomers.filter(m => m.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies };
    };
    
    render() {
        const { length: count } = this.state.movies;
        const { pageSize, 
                currentPage,
                sortColumn,
                searchQuery
            } = this.state;
        
        if (count === 0) return <p> There are no movies in the database. </p>;

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
                    <Pagination 
                        itemsCount={totalCount} 
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange} />    
                </div>
            </div>
        );
    }
}

export default Customers;