import React, { Component } from "react";
import RentalsTable from './rentalsTable';
import paginate from '../utils/paginate';
import axios from "axios";
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';

class Rentals extends Component {
    state = {
        rentals: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: { path: 'title', order: 'asc' }
    };

    async componentDidMount() {
        const { data: rentals } = await axios.get("http://localhost:5000/rentals/new");
        this.setState({ rentals });
    }

    handleDelete = (movie) => {
        const rentals = this.state.rentals.filter(m => m._id !== movie._id);
        this.setState({ rentals });
    };

    handleLike = (movie) => {
        const rentals = [...this.state.rentals];
        const index = rentals.indexOf(movie);
        rentals[index] = { ...rentals[index] };
        rentals[index].liked = !rentals[index].liked;
        this.setState({ rentals });
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
            rentals: allRentals, 
        } = this.state;

        let filtered = allRentals;
        if (searchQuery)
            filtered = allRentals.filter(m => 
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (selectedGenre && selectedGenre._id)
            filtered = allRentals.filter(m => m.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const rentals = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: rentals };
    };
    
    render() {
        const { length: count } = this.state.rentals;
        const { 
                sortColumn,
                searchQuery
            } = this.state;
        
        if (count === 0) return <p> There are no rentals in the database. </p>;

        const { totalCount, data } = this.getPageData();

        return (
            <div className="row">
                
                <div className="col">
                    <Link 
                        to="/rentals/new"
                        className="btn btn-primary"
                        style={{ marginBottom: 20 }}
                    >
                        New Rentals
                    </Link>
                    <p> Showing: {totalCount} rentals in the database. </p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <RentalsTable 
                        rentals={data}
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

export default Rentals;