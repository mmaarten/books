import { Pagination as VendorPagination } from "react-bootstrap";
import { Icon } from "./Icon";

export const Pagination = ({ ...props }) => {
  const { current, total, span = 3, onClick, ...otherProps } = props;

  if (total === 1) {
    return <></>
  }

  let items = [];
  for (let n = 1; n <= total; n++) {
    if (n === 1 || n === total || (n >= current - span && n <= current + span)) {
      items.push(
        <VendorPagination.Item
          key={ n }
          active={ n === current }
          onClick={ () => onClick(n) }
        >
          { n }
        </VendorPagination.Item>
      );
    }
  }

  const prev = current - 1;
  const next = current + 1;

  return (
    <VendorPagination { ...otherProps }>
      <VendorPagination.Prev
        disabled={ prev < 1 }
        onClick={ () => onClick(prev) }
      >
        <Icon name="arrow-left" />
      </VendorPagination.Prev>
      { items }
      <VendorPagination.Next
        disabled={ next > total }
        onClick={ () => onClick(next) }
        >
          <Icon name="arrow-right" />
      </VendorPagination.Next>
    </VendorPagination>
  );
};
