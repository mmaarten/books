import { first } from 'lodash';

class Helpers {

  static scrollTo(elem) {
    const offset = parseInt(getComputedStyle(elem).getPropertyValue('margin-top'));
    window.scrollTo(0, elem.offsetTop - offset);
  }

  static getUserLanguage() {
    return navigator.language || navigator.userLanguage;
  }

  static getLanguage(code) {
    const Model = require('lang-list');
    const list = Model.getList({ supportedLangs: [code] });
    return first(list);
  }

  static parseDate(value) {
    const parts = value.split('-');

    const year  = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day   = parseInt(parts[2]);

    let date = null;
    let options = {};

    if (year && month && day) {
      date = new Date(year, month - 1, day);
      options = { year: 'numeric', month: 'long', day: 'numeric' };
    }

    else if (year && month) {
      date = new Date(year, month - 1);
      options = { year: 'numeric', month: 'long' };
    }

    else if (year) {
      return year;
    }

    return date.toLocaleDateString(Helpers.getUserLanguage(), options);
  }
}

export default Helpers;
