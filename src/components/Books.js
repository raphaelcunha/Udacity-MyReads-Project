import React from 'react'
import PropTypes from 'prop-types'


class Books extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        shelf: PropTypes.string.isRequired,
        changeCategory: PropTypes.func.isRequired,
    };

    state = {
        value: this.props.shelf
    };

    change = (event, book) => {
        this.props.changeCategory(book, event.target.value);
    };


    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books
                            .filter((item) => item.shelf === this.props.shelf)
                            .map((book, key) => (
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
                                    <div className="book-title">{ book.title }</div>
                                    {book.authors.map((author, key) => (
                                        <div className="book-authors" key={key}>{author}</div>
                                    ))}
                                </div>
                            </li>
                        ))}

                    </ol>
                </div>
            </div>

        )
    }
}

export default Books;
