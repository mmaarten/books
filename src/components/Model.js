import axios from "axios"
import { assign } from "lodash"

/**
 * Get volumes
 *
 * @link https://developers.google.com/books/docs/v1/using#WorkingVolumes
 */
export const getVolumes = (params) => {
  return axios.get('https://www.googleapis.com/books/v1/volumes', {
    params: assign({}, params),
  });
}

/**
 * Get volume
 *
 * @link https://developers.google.com/books/docs/v1/using#RetrievingVolume
 */
export const getVolume = (id, params) => {
  return axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`, {
    params: assign({}, params),
  });
}

/**
 * Get bookshelves
 *
 * @link https://developers.google.com/books/docs/v1/using#RetrievingMyBookshelves
 */
export const getBookshelves = (params) => {
  return axios.get('https://www.googleapis.com/books/v1/mylibrary/bookshelves', {
    params: assign({}, params),
    headers: {
      Authorization: `Bearer ${localStorage.getItem('google_access_token')}`,
    },
  });
}

/**
 * Get bookshelf volumes
 *
 * @link https://developers.google.com/books/docs/v1/using#RetrievingMyBookshelves
 */
export const getBookshelfVolumes = (shelfId, params) => {
  return axios.get(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/volumes`, {
    params: assign({}, params),
    headers: {
      Authorization: `Bearer ${localStorage.getItem('google_access_token')}`,
    },
  });
}

export const addVolumeToBookshelf = (shelfId, volumeId) => {

  return axios.post(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/addVolume`, {
    volumeId: volumeId,
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('google_access_token')}`,
    }
  });
}

export const getFrontCover = (bookId, height = 160) => {
  return `https://books.google.be/books/content?id=${bookId}&printsec=frontcover&img=1&zoom=1&h=${height}&stbn=1`;
}
