import { assign, map } from "lodash";
import { Component, createRef } from "react";
import { Alert, Button, Col, Collapse, Container, Form, InputGroup, Row } from "react-bootstrap";
import { collect } from "react-recollect";
import Book from "../components/Book";
import { getLanguages, getUserLanguage, scrollTo } from "../components/Helpers";
import Loader from "../components/Loader";
import { getVolumes } from "../components/Model";
import Pagination from "../components/Pagination";

const USER_LANGUAGE    = getUserLanguage().substring(0, 2);
const DEFAULT_LANGUAGE = USER_LANGUAGE;
let LANGUAGES          = ['nl', 'fr', 'en', 'es', 'it', 'de'];

if (LANGUAGES.indexOf(USER_LANGUAGE) === -1) {
  LANGUAGES.push(USER_LANGUAGE);
}

let LANGUAGE_OPTIONS = {}
map(getLanguages(LANGUAGES), lang => {
  LANGUAGE_OPTIONS[lang.code] = lang.int;
});

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = assign({
      term        : '',
      subject     : 'intitle',
      language    : DEFAULT_LANGUAGE,
      orderBy     : 'relevance',
      printType   : 'books',
      itemsPerPage: 24,
      isLoading   : false,
      result      : null,
      error       : '',
      page        : 1,
      isAdvanced  : false,
    }, this.props.store);

    this.handleFormSubmit      = this.handleFormSubmit.bind(this);
    this.handleTermChange      = this.handleTermChange.bind(this);
    this.handleSubjectChange   = this.handleSubjectChange.bind(this);
    this.handleLanguageChange  = this.handleLanguageChange.bind(this);
    this.handleOrderByChange   = this.handleOrderByChange.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
    this.onAdvancedSearchClick = this.onAdvancedSearchClick.bind(this);

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

    getVolumes({
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
      scrollTo(this.scrollToRef.current);
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

  handleLanguageChange(event) {
    this.setState({ language: event.target.value });
  }

  handleOrderByChange(event) {
    this.setState({ orderBy: event.target.value });
  }

  handlePaginationClick(page) {
    this.setState({ page });
    setTimeout(() => this.getBooks(), 200);
  }

  onAdvancedSearchClick() {
    const { isAdvanced } = this.state;

    this.setState({ isAdvanced: !isAdvanced })
  }

  render() {
    const { term, subject, language, orderBy, isLoading, result, error, page, itemsPerPage, isAdvanced } = this.state;
    return (
      <Container className="py-5">
        <form id="search-form" onSubmit={ this.handleFormSubmit }>
          <Row>
            <Col className="offset-md-3" md={ 6 }>
              <InputGroup  size="lg" className="mb-3">
                <Form.Select className="flex-grow-0 w-auto" defaultValue={ subject } onChange={ this.handleSubjectChange }>
                  <option value="intitle">Title</option>
                  <option value="inauthor">Author</option>
                  <option value="isbn">ISBN</option>
                </Form.Select>
                <Form.Control value={ term } onChange={ this.handleTermChange } required placeholder="Search…" />
                <Button variant="primary" type="submit">Search</Button>
              </InputGroup>
              <Collapse id="advanced-search" in={ isAdvanced }>
                <Row className="g-3 mb-3">
                  <Col md={ 6 }>
                    <Form.Label htmlFor="search-language">Language</Form.Label>
                    <Form.Select id="search-language" defaultValue={ language } onChange={ this.handleLanguageChange }>
                      { map(LANGUAGE_OPTIONS, (text, value) => (
                        <option value={ value } key={ value }>{ text }</option>
                      )) }
                    </Form.Select>
                  </Col>
                  <Col md={ 6 }>
                    <Form.Label htmlFor="search-order-by">Order By</Form.Label>
                    <Form.Select id="search-order-by" defaultValue={ orderBy } onChange={ this.handleOrderByChange }>
                      <option value="relevance">Relevance</option>
                      <option value="newest">Published Date</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Collapse>
              <div className="text-center">
                <Button
                  variant="link"
                  aria-expanded={ isAdvanced ? 'true' : 'false' }
                  aria-controls="advanced-search"
                  onClick={ this.onAdvancedSearchClick }
                >Toggle advanced</Button>
              </div>
            </Col>
          </Row>
        </form>
        { isLoading && (
          <Loader />
        ) }
        { error && (
          <Alert variant="danger" id="search-error">
            { error }
          </Alert>
        ) }
        { result && result.totalItems !== undefined && (
          <div id="search-meta" ref={ this.scrollToRef }>
            Found <strong>{ result.totalItems }</strong> books.
          </div>
        ) }
        { result && result.items && (
          <>
            <div id="search-result">
              <Row className="g-4" xs={ 2 } sm={ 2 } md={ 3 } lg={ 4 } xl={ 6 }>
                { map(result.items, (item, i) => (
                  <Col>
                    <Book key={ i } data={ item } />
                  </Col>
                )) }
              </Row>
            </div>
            <Pagination
              id="search-pagination"
              current={ page }
              total={ Math.ceil(result.totalItems / itemsPerPage) }
              onClick={ this.handlePaginationClick }
            />
          </>
        ) }
      </Container>
    );
  }
}

export default collect(Search);
