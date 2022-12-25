import { find, get } from "lodash";
import { Component } from "react";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import { getLanguage, parseDate } from "../components/Helpers";
import Loader from "../components/Loader";
import { getFrontCover, getVolume } from "../components/Model";
import Rating from "../components/Rating";
import withNavigate from "../components/with-navigate";
import withParams from "./../components/with-params";

class Book extends Component {

  constructor(props) {
    super(props);

    this.onBackButtonClick = this.onBackButtonClick.bind(this);

    this.state = {
      data     : null,
      isLoading: false,
      error    : '',
    };
  }

  componentDidMount() {
    const { params } = this.props;
    const { id } = params;

    this.setState({ isLoading: true, error: '' });

    /**
     * Load book
     */
    getVolume(id)

    .then(response => {
      console.log('response', response);
      this.setState({ data: response.data });
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

  onBackButtonClick() {
    const { navigate } = this.props;

    navigate(-1);
  }

  render() {
    const { data, isLoading, error } = this.state;

    const title         = get(data, 'volumeInfo.title', '(Untitled)');
    const description   = get(data, 'volumeInfo.description', '(No description available)');
    const authors       = get(data, 'volumeInfo.authors', []);
    const categories    = get(data, 'volumeInfo.categories', []);
    const language      = get(data, 'volumeInfo.language');
    const publisher     = get(data, 'volumeInfo.publisher');
    const publishedDate = get(data, 'volumeInfo.publishedDate');
    const pageCount     = get(data, 'volumeInfo.pageCount');
    const image         = data ? getFrontCover(data.id): '';
    const rating        = get(data, 'volumeInfo.averageRating', false);
    const ratingsCount  = get(data, 'volumeInfo.ratingsCount', 0);
    const industryIdentifiers = get(data, 'volumeInfo.industryIdentifiers');
    const isbn10 = get( find(industryIdentifiers, value => value.type === 'ISBN_10'), 'identifier');
    const isbn13 = get( find(industryIdentifiers, value => value.type === 'ISBN_13'), 'identifier');

    return (
      <Container className="book-detail py-5">
        { isLoading && (
          <Loader />
        ) }
        { error && (
          <Alert variant="danger">
            <Alert.Heading>Error</Alert.Heading>
            { error }
          </Alert>
        ) }
        { data && (
          <Row>
            <Col className="order-lg-last mb-3 mb-lg-0" lg={ 8 }>
              <h1 className="book-detail-title">{ title }</h1>
              <div className="book-detail-description" dangerouslySetInnerHTML={{ __html: description }}></div>
              <div className="mt-4">
                <Button variant="primary" onClick={ this.onBackButtonClick }>Back</Button>
              </div>
            </Col>
            <Col className="order-lg-first" lg={ 4 }>
              <img className="book-image mb-3" src={ image } alt={ title } />
              <Table className="book-meta" bordered>
                <tbody>
                  { authors.length > 0 && (
                    <tr>
                      <th>Author</th>
                      <td>{ authors.join(', ') }</td>
                    </tr>
                  ) }
                  { categories.length > 0 && (
                    <tr>
                      <th>Category</th>
                      <td>{ categories.join(', ') }</td>
                    </tr>
                  ) }
                  { language && (
                    <tr>
                      <th>Language</th>
                      <td>{ get( getLanguage(language), 'int', language )}</td>
                    </tr>
                  ) }
                  { publisher && (
                    <tr>
                      <th>Publisher</th>
                      <td>{ publisher }</td>
                    </tr>
                  ) }
                  { publishedDate && (
                    <tr>
                      <th>Published Date</th>
                      <td>{ parseDate(publishedDate) }</td>
                    </tr>
                  ) }
                  { pageCount && (
                    <tr>
                      <th>Pages</th>
                      <td>{ pageCount }</td>
                    </tr>
                  ) }
                  <tr>
                    <th>Rating</th>
                    <td><Rating amount={ rating } count={ ratingsCount } /></td>
                  </tr>
                  { isbn10 && (
                    <tr>
                      <th>ISBN 10</th>
                      <td>{ isbn10 }</td>
                    </tr>
                  ) }
                  { isbn13 && (
                    <tr>
                      <th>ISBN 13</th>
                      <td>{ isbn13 }</td>
                    </tr>
                  ) }
                </tbody>
              </Table>
            </Col>
          </Row>
        ) }
      </Container>
    );
  }
}

export default withNavigate(withParams(Book));
