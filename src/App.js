import "popper.js";
import "jquery";
import "bootstrap";
import "./App.scss";
import Search from "./components/Search";
import { BrowserRouter, Route } from "react-router-dom";
import { Component } from "react";
import BookDetailModal from "./components/BookDetailModal";

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="books">
        <div className="App">
          <main className="App-main py-5">
            <Search />
            <Route
              path="/book/:id"
              render={ props => (
                <BookDetailModal bookId={ props.match.params.id } />
              ) }
            />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
