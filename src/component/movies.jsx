
import React, { Component } from 'react';
import { deleteMovie, getMovies } from "../services/movieServices";
import Pagination from './common/pagination';
import { Paginate } from "../utils/paginate";
import Listbox from '../utils/listbox';
import { getGenres } from "../services/genreService";
import MoviesTable from './moviesTable';
import Head from './header';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './search';
import { toast } from 'react-toastify';
class Movies extends Component {
    state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
                        };
    async componentDidMount() {
        const {data} = await getGenres();
        const {data:movies}= await getMovies();

        const genres =[{ _id:"",name:"All Genres"},...data]
        // console.log(movies);
    this.setState({movies,genres})
    }
    header = {
        fontSize: 20,
        color: "#02fac4",
        fontFamily: "cursive",
        fontWeight: "bold"
    }
   
    tableH = {
        fontSize: 25,
        fontWeight: "bold",
        color: "orange"
    }
    handleDelete = async (movie) => {
        const origanlMovies = this.state.movies;
        const movies =origanlMovies.filter(m => m._id !== movie._id);
        this.setState({ movies: movies });
        try{

            await deleteMovie(movie._id);
        }
        catch(ex)
        {
            if(ex.response && ex.response.status ===404)
            toast.error("This Movies is already deleted.");
            this.setState({movies:origanlMovies});
        }
        
    }
    handleLike = (movie) => {
        // console.log("clicked", movie);
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });

    };
    handlePage = (page) => {
        this.setState({ currentPage: page });
        
        // console.log("page no",currentPage)
    }
    handleList = (genre) => {
        this.setState({ selectedGenre: genre,searchQuery:'', currentPage: 1 });
        
    };
    handleSort = (sortColumn) => {
      
        this.setState({sortColumn})
    }
    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    }
    getPageData = () => {
         const {currentPage,pageSize,movies:allMovies,selectedGenre,sortColumn,searchQuery}=this.state
        let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = Paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
    }
    render() {
        const {user}=this.props;
        const { length: count } = this.state.movies;
         const {currentPage,pageSize,sortColumn}=this.state
        const { totalCount, data:movies } = this.getPageData();
          if (totalCount === 0) return <p style={this.header}>There Is No Movie To Show For</p>;
        return (
            <div className="row">
                <div className="col-3" style={{ marginTop: 20 }}>
                    <Listbox
                       choose={ this.handleList}
                        items={this.state.genres}
                        selectedGenre={this.state.selectedGenre} />
                   {user && <Link to="/movies/new"
                        className="btn btn-primary"
                        style={{ marginTop: 20 }}>
                        New Movie
                    </Link>}
                </div>
              
                <div className="col" >
                 
                    <SearchBox value={this.searchQuery} onChange={this.handleSearch}/>
                    <MoviesTable
                        movies={movies}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        tableH={this.tableH}
                        onSort={this.handleSort}
                        sortColumn={ sortColumn}/>
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePage} />
                    <Head
                        header={this.header}
                        length={totalCount}
                    />
                </div>
               
                
            </div>
            
        )
       
    }
}

    export default Movies;
