import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import ListBooks from './components/ListBooks';

class BooksApp extends React.Component {

    constructor(props) {
        super(props);
        this.changeCategory = this.changeCategory.bind(this);
    }

    state = {
        books: [],
        showSearchPage: false,
        query: '',
        searchResult: [],
    }

    componentDidMount() {
        this.getBooks();
    }

    getBooks = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        });
    }

    changeCategory(book, shelf) {
        BooksAPI.update(book, shelf).then(() => {
            this.setState((state) => ({
                books: state.books.filter((c) => {
                    if (c.id !== book.id) {
                        book.shelf = shelf;
                    }
                    return book;
                })
            }));
        });
    }

    updateQuery = (query) => {
        this.setState({query: query});
        BooksAPI.search(query).then((searchResult) => {
            if(searchResult.length){
                this.setState((state) => ({
                    searchResult: searchResult.map((result) => {
                        const book = this.state.books.find(book =>  result.id === book.id);
                        if(book !== undefined){
                            result.shelf = book.shelf;
                        }
                        return result;
                    })
                }));
            }
        });
    }

    goBack = () => {
        this.getBooks();
        this.setState({showSearchPage: false});
    }

    render() {
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <a className="close-search" onClick={() => this.goBack()}>Close</a>
                            <div className="search-books-input-wrapper">
                                <input type="text"
                                       placeholder="Search by title or author"
                                       onChange={(event) => this.updateQuery(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ListBooks title="Result of Search:" searchResult={this.state.searchResult} books={this.state.books} shelf="" changeCategory={this.changeCategory}/>
                        </div>
                    </div>
                ) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <ListBooks title="Currently Reading" books={this.state.books} shelf="currentlyReading" changeCategory={this.changeCategory}/>
                                <ListBooks title="Want to Read" books={this.state.books} shelf="wantToRead" changeCategory={this.changeCategory}/>
                                <ListBooks title="Read" books={this.state.books} shelf="read" changeCategory={this.changeCategory}/>
                            </div>
                        </div>
                        <div className="open-search">
                            <a onClick={() => this.setState({showSearchPage: true})}>Add a book</a>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default BooksApp
