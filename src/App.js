import "popper.js";
import "jquery";
import "bootstrap";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Component } from "react";
import Search from "./pages/Search";
import Book from "./pages/Book";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={ <Search /> }></Route>
            <Route path="/book/:id" element={ <Book /> }></Route>
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
