import { get } from "lodash";
import { Link } from "react-router-dom";
import Model from "./Model";
import { Rating } from "./Rating";

export const Book = ({ ...props }) => {
  const { data } = props;

  const title        = get(data, 'volumeInfo.title', '(Untitled)');
  const authors      = get(data, 'volumeInfo.authors', []);
  const image        = Model.getFrontCover(data.id);
  const rating       = get(data, 'volumeInfo.averageRating', false);
  const ratingsCount = get(data, 'volumeInfo.ratingsCount', 0);

  return (
    <div className="Book position-relative text-center">
      <img className="Book-image mb-2" src={ image } alt={ title } />
      <Rating className="Book-rating small text-muted mb-1" amount={ rating } count={ ratingsCount } />
      <h3 className="Book-title h6 ellipsis mb-1">{ title }</h3>
      { authors.length > 0 && (
        <div className="Book-authors small ellipsis">{ authors.join(', ') }</div>
      ) }
      <Link className="stretched-link" to={ `/book/${data.id}` }></Link>
    </div>
  )
};
