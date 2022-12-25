import { map } from "lodash"
import { Component, useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import Loader from "./Loader"
import { addVolumeToBookshelf, getBookshelves } from "./Model"

export class Bookshelves extends Component {
  render() {
    const { show, bookId, onHide } = this.props;
    return (
      <Modal show={ show } onHide={ onHide }>
        <Modal.Header closeButton>
          <Modal.Title>Bookshelves</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookshelvesForm bookId={ bookId }/>
        </Modal.Body>
      </Modal>
    );
  }
}

export class BookshelvesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookshelves : [],
      isLoading: false,
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    const { bookId } = this.props;
    event.preventDefault();

    const form = document.getElementById('bookshelves-form');
    const checkboxes = form.querySelectorAll('input[type=checkbox]:checked');

    let items = [];
    map(checkboxes, item => {
      items.push(item.value);

      addVolumeToBookshelf(item.value, bookId).then(response => {
        console.log('response', response);
      })
    })

    console.log('items', items);
  }

  componentDidMount() {
    // Load bookshelves.
    this.setState({ isLoading: true });
    getBookshelves()
      .then(response => {
        this.setState({ bookshelves: response.data.items });
      }).then(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { isLoading, bookshelves } = this.state;
    return (
      <>
        { isLoading && (
          <Loader />
        ) }
        { bookshelves && (
          <form id="bookshelves-form" method="post" onSubmit={ this.handleFormSubmit }>
            <ul className="list-unstyled">
              { map(bookshelves, bookshelf => (
                <li key={ bookshelf.id }>
                  <Form.Check
                    name="bookshelves[]"
                    value={ bookshelf.id }
                    type="checkbox"
                    label={ bookshelf.title }
                  />
                </li>
              )) }
            </ul>
            <Button type="submit">Update</Button>
          </form>
        ) }
      </>
    )
  }
}
