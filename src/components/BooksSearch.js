import React from 'react'
import PropTypes from 'prop-types'

class BooksSearch extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        changeCategory: PropTypes.func.isRequired,
    };

    state = {
        value: 'none'
    };

    change = (event, book) => {
        this.props.changeCategory(book, event.target.value);
    };

    render() {
        return (
            <ol className="books-grid">
                {this.props.books.map((book, key) => (
                    <li key={key}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                                <div className="book-shelf-changer">
                                    <select onChange={(event) => this.change(event, book)} value={this.state.value}>
                                        <option value="none" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title} - {book.shelf}</div>
                            <div className="book-authors">{book.authors} </div>
                        </div>
                    </li>
                ))}
            </ol>
        )
    }
}

export default BooksSearch;
