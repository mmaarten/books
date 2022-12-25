import { Component } from "react";
import { Button, Container } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);

    this.state = {
      isLoggedIn: localStorage.getItem('google_access_token') ? true : false,
    };
  }

  handleLoginSuccess(response) {
    console.log(response);

    localStorage.setItem('google_access_token', response.accessToken);

    this.setState({ isLoggedIn: true });
  }

  handleLoginFailure() {

  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <Container className="py-5">
        <h1>Login</h1>
        { isLoggedIn && (
          <p>You are logged in. <Link to="/logout">Logout</Link></p>
        ) }
        { ! isLoggedIn && (
          <GoogleLogin
            clientId="888873762975-g59avl8icniefl1kl8vo1aa638q24ci7.apps.googleusercontent.com"
            render={renderProps => (
              <Button onClick={ renderProps.onClick } disabled={ renderProps.disabled }>Login</Button>
            )}
            onSuccess={ this.handleLoginSuccess }
            onFailure={ this.handleLoginFailure }
          />
        ) }

      </Container>
    );
  }
}

export default Login;
