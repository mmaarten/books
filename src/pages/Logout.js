import { Component } from "react";
import { Button, Container } from "react-bootstrap";
import { GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";

class Logout extends Component {
  constructor(props) {
    super(props);

    this.handleLogoutSuccess = this.handleLogoutSuccess.bind(this);

    this.state = {
      isLoggedIn: localStorage.getItem('google_access_token') ? true : false,
    };
  }

  handleLogoutSuccess() {
    localStorage.removeItem('google_access_token');

    this.setState({ isLoggedIn: false });
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <Container className="py-5">
        <h1>Logout</h1>
        { isLoggedIn && (
          <GoogleLogout
            clientId="888873762975-g59avl8icniefl1kl8vo1aa638q24ci7.apps.googleusercontent.com"
            render={renderProps => (
              <Button onClick={ renderProps.onClick } disabled={ renderProps.disabled }>Logout</Button>
            )}
            onLogoutSuccess={ this.handleLogoutSuccess }
            />
        ) }
        { ! isLoggedIn && (
          <p>You are logged out. <Link to="/login">Login</Link></p>
        ) }

      </Container>
    );
  }
}

export default Logout;
