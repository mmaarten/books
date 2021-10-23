import classNames from "classnames";
import { Icon } from "./Icon";

export const Rating = ({ ...props }) => {
  const { amount = false, total = 5, count, className, ...otherProps } = props;

  const myClassName = classNames('rating', className);

  if (amount === false) {
    return (
      <div className={ myClassName } { ...otherProps }>
        not rated
      </div>
    )
  }

  return (
    <div className={ myClassName } { ...otherProps }>
      <Icon className="small" name="star-fill" variant="warning" /> { amount }/{ total } • { count }
    </div>
  )
};
