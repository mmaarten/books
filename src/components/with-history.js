import { useNavigate } from "react-router-dom";

const withNavigate = (Component) => {
  return props => <Component {...props} navigate={ useNavigate() } />;
}

export default withNavigate;
