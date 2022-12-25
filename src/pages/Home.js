import axios from "axios";
import { map } from "lodash";
import { Component } from "react";
import { Container } from "react-bootstrap";
import { getBookshelfVolumes, getBookshelves } from "../components/Model";

class Home extends Component {
  componentDidMount() {

    // axios.post('http://localhost:8888/books/api/book/get', {
    //   book_id: 'o-7XBgAAQBAJ',
    //   user_id: 0,
    // }).then(response => {
    //   console.log('response', response);
    // })

    // // Get bookshelves.
    // getBookshelves().then(response => {
    //   const bookshelves = response.data.items;

    //   // Get books.
    //   map(bookshelves, bookshelf => {
    //     console.log('bookshelf', bookshelf.id);
    //     getBookshelfVolumes(bookshelf.id).then(response => {
    //       console.log('volumes',  response);

    //     });
    //   })
    // });
  }
  render() {
    // axios.get('http://localhost:8888/books/api/index.php').then(response => {
    //   console.log('response', response);
    // })
    return (
      <Container className="py-5">
        <h1>Home</h1>
      </Container>
    );
  }
}

export default Home;
