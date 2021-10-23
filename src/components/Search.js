import { assign, map } from "lodash";
import { Component, createRef } from "react";
import { Alert, Form, InputGroup, Button, Container, Row, Col } from "react-bootstrap";
import { collect } from "react-recollect";
import { Book } from "./Book";
import Helpers from "./Helpers";
import { Loader } from "./Loader";
import Model from "./Model";
import { Pagination } from "./Pagination";

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = assign({
      term        : '',
      subject     : 'intitle',
      language    : 'en',
      orderBy     : 'relevance',
      printType   : 'books',
      itemsPerPage: 24,
      isLoading   : false,
      result      : null,
      error       : '',
      page        : 1,
    }, this.props.store);

    this.handleFormSubmit      = this.handleFormSubmit.bind(this);
    this.handleTermChange      = this.handleTermChange.bind(this);
    this.handleSubjectChange   = this.handleSubjectChange.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);

    this.scrollToRef = createRef();
  }

  componentWillUnmount() {
    setTimeout(() => {
      map(this.state, (v, k) => this.props.store[k] = v);
    }, 200);
  }

  getBooks() {
    const { term, subject, language, orderBy, printType, page, itemsPerPage } = this.state;

    this.setState({ isLoading: true, error: '' });

    Model.getBooks({
      q           : `${subject}:${term}`,
      langRestrict: language,
      orderBy     : orderBy,
      printType   : printType,
      startIndex  : (page - 1) * itemsPerPage,
      maxResults  : itemsPerPage,
    })

    .then(response => {
      console.log('response', response);
      this.setState({ result: response.data });
      Helpers.scrollTo(this.scrollToRef.current);
    })

    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        this.setState({ error: error.response.data.error.message })

      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    })

    .then(() => {
      this.setState({ isLoading: false });
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.setState({ page: 1 });
    setTimeout(() => this.getBooks(), 200);
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  handleSubjectChange(event) {
    this.setState({ subject: event.target.value });
  }

  handlePaginationClick(page) {
    this.setState({ page });
    setTimeout(() => this.getBooks(), 200);
  }

  render() {
    const { term, subject, isLoading, result, error, page, itemsPerPage } = this.state;

    return (
      <div className="Search">
        <Container>
          <form className="Search-form mb-5" onSubmit={ this.handleFormSubmit }>
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <InputGroup>
                  <Form.Select className="flex-grow-0 w-auto" defaultValue={ subject } onChange={ this.handleSubjectChange }>
                    <option value="intitle">Title</option>
                    <option value="inauthor">Author</option>
                    <option value="isbn">ISBN</option>
                  </Form.Select>
                  <Form.Control value={ term } onChange={ this.handleTermChange } required />
                  <Button variant="primary" type="submit">Search</Button>
                </InputGroup>
              </div>
            </div>
          </form>
          { isLoading && (
            <Loader className="Search-loader" />
          ) }
          { error && (
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              { error }
            </Alert>
          ) }
          { result && typeof result.totalItems !== 'undefined' && (
            <div className="Search-meta my-5 text-center" ref={ this.scrollToRef }>
              Found <strong>{ result.totalItems }</strong> books.
            </div>
          ) }
          { result && result.items.length > 0 && (
            <>
              <div className="Search-result my-5">
                <Row sm={ 2 } md={ 3 } lg={ 4 } xl={ 6 } className="g-4">
                  { map(result.items, item => (
                    <Col key={ item.id }>
                      <Book data={ item } />
                    </Col>
                  ))}
                </Row>
              </div>
              <Pagination
                className="justify-content-center mt-5"
                current={ page }
                total={ Math.floor(result.totalItems / itemsPerPage) }
                onClick={ this.handlePaginationClick }
              />
            </>
          ) }
        </Container>
      </div>
    );
  }
}

export default collect(Search);
