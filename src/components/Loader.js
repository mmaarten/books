import { Spinner } from "react-bootstrap";

export const Loader = ({ ...props }) => {
  const { visible = true, ...otherProps } = props;
  return (
    <>
      { visible && (
        <div id="loader" { ...otherProps }>
          <Spinner animation="border" variant="primary" />
        </div>
      ) }
    </>
  )
};
