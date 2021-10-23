import { find, get } from "lodash";
import { Component } from "react";
import { Badge, Col, Container, Row, Table } from "react-bootstrap";
import Helpers from "./Helpers";
import { Loader } from "./Loader";
import Model from "./Model";
import { Rating } from "./Rating";

class BookDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data     : null,
      isLoading: false,
      error    : '',
    };
  }

  getBook() {
    const { bookId } = this.props;

    this.setState({ isLoading: true, error: '' });

    Model.getBook(bookId)

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

  componentDidMount() {
    this.getBook();
  }

  render() {
    const { isLoading, data } = this.state;

    const title         = get(data, 'volumeInfo.title', '(Untitled)');
    const description   = get(data, 'volumeInfo.description', '(No description available)');
    const authors       = get(data, 'volumeInfo.authors', []);
    const categories    = get(data, 'volumeInfo.categories', []);
    const language      = get(data, 'volumeInfo.language');
    const publisher     = get(data, 'volumeInfo.publisher');
    const publishedDate = get(data, 'volumeInfo.publishedDate');
    const pageCount     = get(data, 'volumeInfo.pageCount');
    const isEbook       = get(data, 'saleInfo.isEbook', false);
    const image         = data ? Model.getFrontCover(data.id): '';
    const rating        = get(data, 'volumeInfo.averageRating', false);
    const ratingsCount  = get(data, 'volumeInfo.ratingsCount', 0);
    const industryIdentifiers = get(data, 'volumeInfo.industryIdentifiers');
    const isbn10 = get( find(industryIdentifiers, value => value.type === 'ISBN_10'), 'identifier');
    const isbn13 = get( find(industryIdentifiers, value => value.type === 'ISBN_13'), 'identifier');

    return (
      <div className="BookDetail">
        <Container>
          { isLoading && (
            <Loader className="BookDetail-loader" />
          ) }
          { data && (
            <Row>
              <Col className="order-lg-last mb-3 mb-lg-0" lg={ 8 }>
                <h1 className="BookDetail-title">{ title }</h1>
                <div className="BookDetail-description" dangerouslySetInnerHTML={{ __html: description }}></div>
              </Col>
              <Col className="order-lg-first" lg={ 4 }>
                <img className="BookDetail-image mb-3" src={ image } alt={ title } />
                <div className="mb-3">
                  { isEbook && <Badge>Ebook</Badge> }
                  { ! isEbook && <Badge>Print</Badge> }
                </div>
                <Table className="BookDetail-meta" bordered>
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
                        <td>{ get( Helpers.getLanguage(language), 'int', language )}</td>
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
                        <td>{ Helpers.parseDate(publishedDate) }</td>
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
      </div>
    );
  }
};

export default BookDetail;
