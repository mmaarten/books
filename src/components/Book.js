import { get } from "lodash";
import { Link } from "react-router-dom";
import { getFrontCover } from "./Model";
import Rating from "./Rating";

const Book = ( props ) => {
  const { data } = props;

  const title        = get(data, 'volumeInfo.title', '(Untitled)');
  const authors      = get(data, 'volumeInfo.authors', []);
  const image        = getFrontCover(data.id);
  const rating       = get(data, 'volumeInfo.averageRating', false);
  const ratingsCount = get(data, 'volumeInfo.ratingsCount', 0);

  return (
    <div className="book">
      <img className="book-image" src={ image } alt={ title } />
      <Rating className="book-rating" amount={ rating } count={ ratingsCount } />
      <h3 className="book-title" title={ title }>{ title }</h3>
      { authors && (
        <div className="book-authors">
          { authors.join(', ') }
        </div>
      ) }
      <Link className="stretched-link" to={ `/book/${data.id}` }></Link>
    </div>
  );
}

export default Book;
