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

export const getFrontCover = (bookId, height = 160) => {
  return `https://books.google.be/books/content?id=${bookId}&printsec=frontcover&img=1&zoom=1&h=${height}&stbn=1`;
}
