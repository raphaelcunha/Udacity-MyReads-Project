import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Books from './components/Books';
import BooksSearch from './components/BooksSearch';

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
                this.setState({searchResult})
            }
        });
    }


    render() {
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <a className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</a>
                            <div className="search-books-input-wrapper">
                                <input type="text"
                                       placeholder="Search by title or author"
                                       onChange={(event) => this.updateQuery(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="search-books-results">

                            //TODO: mover para book, livro por livro
                            <BooksSearch title="Search Results" books={this.state.searchResult} changeCategory={this.changeCategory}/>
                        </div>
                    </div>
                ) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <Books title="Currently Reading" books={this.state.books} shelf="currentlyReading" changeCategory={this.changeCategory}/>
                                <Books title="Want to Read" books={this.state.books} shelf="wantToRead" changeCategory={this.changeCategory}/>
                                <Books title="Read" books={this.state.books} shelf="read" changeCategory={this.changeCategory}/>
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
