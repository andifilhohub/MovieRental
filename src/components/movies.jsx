import React, { Component } from "react";
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import paginate from '../utils/paginate';
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';
class Movies extends Component {
    state = {
        movies: [], // Array que armazenará os filmes
        genres: [], // Array que armazenará os gêneros dos filmes
        currentPage: 1, // Página atual da tabela de filmes
        pageSize: 4, // Número de filmes por página
        searchQuery: "", // Termo de pesquisa para filtrar filmes
        selectedGenre: null, // Gênero atualmente selecionado
        sortColumn: { path: 'title', order: 'asc' } // Coluna usada para ordenação e a ordem (ascendente ou descendente)
    };

    componentDidMount() {
        // Método que é chamado quando o componente é montado
        const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()]; // Obtendo os gêneros disponíveis

        // Atualizando o estado com a lista de filmes e gêneros
        this.setState({ movies: getMovies(), genres });
    }

    handleDelete = (movie) => {
        // Método chamado para excluir um filme
        const movies = this.state.movies.filter(m => m._id !== movie._id); // Filtrando o filme que será removido
        this.setState({ movies }); // Atualizando o estado com a nova lista de filmes
    };

    handleLike = (movie) => {
        // Método chamado para alternar o status de "curtido" de um filme
        const movies = [...this.state.movies]; // Criando uma cópia do estado atual dos filmes
        const index = movies.indexOf(movie); // Encontrando o índice do filme na lista
        movies[index] = { ...movies[index] }; // Criando uma cópia do filme
        movies[index].liked = !movies[index].liked; // Alternando o status de "curtido"
        this.setState({ movies }); // Atualizando o estado
    };

    handlePageChange = (page) => {
        // Método chamado para mudar a página atual da tabela
        this.setState({ currentPage: page }); // Atualizando o estado com a nova página
    };

    handleGenreSelect = (genre) => {
        // Método chamado quando um gênero é selecionado na lista de gêneros
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 }); // Atualizando o estado com o gênero selecionado e resetando a pesquisa e a página atual
    };
    
    handleSearch = (query) => {
        // Método chamado quando o usuário faz uma busca
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 }); // Atualizando o estado com a nova consulta de pesquisa, limpando o gênero selecionado e resetando a página atual
    };

    handleSort = (sortColumn) => {
        // Método chamado para alterar a coluna de ordenação
        this.setState({ sortColumn }); // Atualizando o estado com a nova coluna de ordenação
    };

    getPageData = () => {
        // Método que obtém os dados da página a serem exibidos
        const { 
            pageSize, 
            currentPage,
            sortColumn, 
            selectedGenre,
            searchQuery, 
            movies: allMovies, 
        } = this.state;

        let filtered = allMovies; // Iniciando a lista filtrada com todos os filmes
        if (searchQuery)
            // Filtrando filmes com base na consulta de pesquisa
            filtered = allMovies.filter(m => 
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (selectedGenre && selectedGenre._id)
            // Filtrando filmes com base no gênero selecionado
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

        // Ordenando os filmes filtrados
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        // Paginação dos filmes ordenados
        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies }; // Retornando a contagem total e os dados da página
    };
    
    render() {
        const { length: count } = this.state.movies; // Obtendo a contagem de filmes
        const { pageSize, 
                currentPage,
                sortColumn,
                searchQuery
            } = this.state;
        
        if (count === 0) return <p> There are no movies in the database. </p>; // Mensagem caso não haja filmes

        const { totalCount, data } = this.getPageData(); // Obtendo os dados da página

        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup 
                        items={this.state.genres} // Passando os gêneros para o componente de lista
                        selectedItem={this.state.selectedGenre} // Passando o gênero selecionado
                        onItemSelect={this.handleGenreSelect} // Passando o método para selecionar o gênero
                    />
                </div>
                <div className="col">
                    <Link 
                        to="/movies/new"
                        className="btn btn-primary"
                        style={{ marginBottom: 20 }}
                    >
                        New Movie
                    </Link>
                    <p> Showing: {totalCount} movies in the database. </p> {/* Exibindo a contagem de filmes */}
                    <SearchBox value={searchQuery} onChange={this.handleSearch} /> {/* Campo de busca */}
                    <MoviesTable 
                        movies={data} // Passando os dados da página para o componente de tabela
                        sortColumn={sortColumn} // Passando a coluna de ordenação
                        onLike={this.handleLike} // Passando o método de like
                        onDelete={this.handleDelete} // Passando o método de delete
                        onSort={this.handleSort} // Passando o método de sort
                    />
                    <Pagination 
                        itemsCount={totalCount} // Passando a contagem total de filmes
                        pageSize={pageSize} // Passando o tamanho da página
                        currentPage={currentPage} // Passando a página atual
                        onPageChange={this.handlePageChange} // Passando o método para mudar a página
                    />    
                </div>
            </div>
        );
    }
}

export default Movies;