import { find, map } from "lodash";
import { Component } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Authentication from "../components/Authentication";
import Book from "../components/Book";
import Loader from "../components/Loader";
import { getBookshelfVolumes, getBookshelves } from "../components/Model";
import Pagination from "../components/Pagination";
import withParams from "../components/with-params";

class Bookshelves extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookshelves : [],
      bookshelf: null,
      books: [],
      page: 1,
      itemsPerPage: 8,
      isLoading: false,
      error: null,
    };

    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentDidMount() {
    // Get bookshelves.
    getBookshelves().then(response => {
      console.log(response);
      this.setState({ bookshelves: response.data.items });
    });
  }

  componentDidUpdate() {
    const { params } = this.props;
    const { id } = params;
    const { bookshelves, bookshelf } = this.state;

    // Get bookshelf.
    if (id && (! bookshelf || bookshelf && bookshelf.id != id)) {
      const shelf = find(bookshelves, item => (item.id == id));
      if (shelf) {
        this.setState({ bookshelf: shelf });
        setTimeout(() => {
          this.getBooks();
        }, 1000)

      }
    }
  }

  getBooks() {
    const { bookshelf, page, itemsPerPage } = this.state;

    console.log('bookshelf', bookshelf);

    this.setState({ isLoading: true, books: [], error: null });

    getBookshelfVolumes(bookshelf.id, {
      startIndex  : (page - 1) * itemsPerPage,
      maxResults  : itemsPerPage,
    })

    .then(response => {
      console.log('getBookshelfVolumes', response);
      this.setState({ books: response.data });
    })

    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        this.setState({ error: error.response.data.error.message });

      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        this.setState({ error: error.message });
      }
      console.log(error.config);
    })

    .then(() => {
      this.setState({ isLoading: false });
    });
  }

  handlePaginationClick(page) {
    this.setState({ page });
    setTimeout(() => {
      this.getBooks();
    }, 1000)
  }

  render() {
    const { bookshelves, bookshelf, books, page, itemsPerPage, isLoading, error } = this.state;
    console.log('bookshelf', bookshelf);
    return (
      <Authentication>
        <Container className="py-5">
          <Row>
            <Col md={ 4 }>
              { bookshelves && (
                <ul className="list-unstyled">
                  { map(bookshelves, item => (
                    <li key={ item.id }>
                      <Link to={ `/bookshelves/${item.id}` }>
                        { item.title }
                        { item.volumeCount !== undefined && (
                          <> ({ item.volumeCount })</>
                        )}
                      </Link>
                    </li>
                  )) }
                </ul>
              ) }
            </Col>
            <Col md={ 8 }>
              { isLoading && (
                <Loader />
              ) }
              { error && (
                <Alert variant="danger">
                  { error }
                </Alert>
              ) }
              { bookshelf && (
                <h1 className="bookshelf-title text-center">{ bookshelf.title }</h1>
              ) }
              { books && books.totalItems !== undefined && (
                <div id="search-meta">
                  Found <strong>{ books.totalItems }</strong> books.
                </div>
              ) }
              { books && books.items && (
                <>
                  <Row className="g-4" xs={ 2 } sm={ 2 } md={ 3 } lg={ 4 } xl={ 4 }>
                    { map(books.items, (item, i) => (
                      <Col>
                        <Book key={ i } data={ item } />
                      </Col>
                    )) }
                  </Row>
                  <Pagination
                    id="search-pagination"
                    current={ page }
                    total={ Math.ceil(books.totalItems / itemsPerPage) }
                    onClick={ this.handlePaginationClick }
                  />
                </>
              ) }
            </Col>
          </Row>
        </Container>
      </Authentication>
    );
  }
}

export default withParams(Bookshelves);
