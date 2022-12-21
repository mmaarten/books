import { Spinner } from "react-bootstrap";

const Loader = ({ ...props }) => {
  return (
    <div id="loader" { ...props }>
      <Spinner animation="border" variant="primary" />
    </div>
  )
};

export default Loader;
