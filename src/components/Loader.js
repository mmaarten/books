import { Spinner } from "react-bootstrap";

export const Loader = ({ ...props }) => {
  return (
    <div id="loader" { ...props }>
      <Spinner animation="border" variant="primary" />
    </div>
  )
};
