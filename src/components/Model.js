import axios from "axios";
import { assign } from "lodash";

class Model {

  static getBook(bookId) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`, {
      params : { key: process.env.REACT_APP_GOOGLE_API_KEY },
    });
  }

  static getBooks(params) {
    return axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: assign({ key: process.env.REACT_APP_GOOGLE_API_KEY }, params),
    });
  }

  static getFrontCover(bookId, height = 160) {
    return `https://books.google.be/books/content?id=${bookId}&printsec=frontcover&img=1&zoom=1&h=${height}&stbn=1`;
  }
}

export default Model;
