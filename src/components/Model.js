import axios from "axios";

class Model {

  static getBook(bookId) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
  }

  static getBooks(params) {
    return axios.get('https://www.googleapis.com/books/v1/volumes', { params });
  }

  static getFrontCover(bookId, height = 160) {
    return `https://books.google.be/books/content?id=${bookId}&printsec=frontcover&img=1&zoom=1&h=${height}&stbn=1`;
  }
}

export default Model;
