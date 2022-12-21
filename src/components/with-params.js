import { useParams } from "react-router-dom";

const withParams = (Component) => {
  return props => <Component {...props} params={ useParams() } />;
}

export default withParams;
