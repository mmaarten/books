import classNames from "classnames";

const Icon = ({ ...props }) => {
  const { name, className, variant, ...otherProps } = props;

  const myClassName = classNames('bi', {
    [`bi-${name}`]: name,
    [`text-${variant}`]: variant,
  }, className);

  return (
    <i className={ myClassName } { ...otherProps }></i>
  );
};

export default Icon;
