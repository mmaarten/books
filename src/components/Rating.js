import classNames from "classnames";
import { Icon } from "./Icon";

export const Rating = ({ ...props }) => {
  const { amount = false, total = 5, count, className, ...otherProps } = props;

  const myClassName = classNames('rating', className);

  const votes = count === 1 ? 'vote' : 'votes';

  let altCount = count;

  if (altCount > 1000) {
    altCount = (altCount / 1000).toFixed(1) + 'k';
  }

  if (amount === false) {
    return (
      <div className={ myClassName } { ...otherProps }>
        not rated
      </div>
    )
  }

  return (
    <div className={ myClassName } { ...otherProps }>
      <Icon className="small" name="star-fill" variant="warning" /> { amount }/{ total } • { altCount } { votes }
    </div>
  )
};
