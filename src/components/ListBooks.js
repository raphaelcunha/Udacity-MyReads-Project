import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book';

class List extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        searchResult: PropTypes.array,
        shelf: PropTypes.string.isRequired,
        changeCategory: PropTypes.func.isRequired,
    };

    state = {
        value: this.props.shelf
    };

    change = (book, shelf) => {
        this.props.changeCategory(book, shelf);
    };


    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.shelf ? (
                            this.props.books
                                .filter((item) => item.shelf === this.props.shelf)
                                .map((book, key) => (
                                    <div key={key}>
                                        <Book book={book} key={key} shelf={book.shelf} changeCategory={this.change}/>
                                    </div>
                                ))
                        ) : (
                            this.props.searchResult.map((book, key) => (
                                <div key={key}>
                                    <Book book={book} key={key} shelf={book.shelf} changeCategory={this.change}/>
                                </div>
                            ))
                        )}
                    </ol>
                </div>
            </div>

        )
    }
}

export default List;
