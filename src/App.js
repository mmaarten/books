import "popper.js";
import "jquery";
import "bootstrap";
import "./App.scss";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Component } from "react";
import Search from "./pages/Search";
import { Container, Nav, Navbar } from "react-bootstrap";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Bookshelves from "./pages/Bookshelves";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <header>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="#home">My Library</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Link to="/" className="nav-link">Home</Link>
                  <Link to="/search" className="nav-link">Search</Link>
                  <Link to="/bookshelves" className="nav-link">Bookshelves</Link>
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/logout" className="nav-link">Logout</Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Routes>
            <Route path="/" element={ <Home /> }></Route>
            <Route path="/search" element={ <Search /> }></Route>
            <Route path="/bookshelves" element={ <Bookshelves /> }></Route>
            <Route path="/bookshelves/:id" element={ <Bookshelves /> }></Route>
            <Route path="/bookshelves/:id/:page" element={ <Bookshelves /> }></Route>
            <Route path="/login" element={ <Login /> }></Route>
            <Route path="/logout" element={ <Logout /> }></Route>
            <Route path="/book/:id" element={ <Book /> }></Route>
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
