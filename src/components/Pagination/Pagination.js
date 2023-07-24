import "./Pagination.css";
import * as cx from "classnames";
import { Link } from "react-router-dom";

export const Pagination = ({ setPage, page, totalPages }) => {
  return (
    <div className="Pagination">
      <Link
        to={`/${page - 1}`}
        className={cx("Pagination__navButton", {
          "Pagination__navButton--disabled": page === 1,
        })}
        onClick={() => setPage((prev) => prev - 1)}
      >
        Назад
      </Link>
      <div className="Pagination__numbers">
        {Array(totalPages)
          .fill()
          .map((_, i) => (
            <Link
              to={`/${i + 1}`}
              key={i}
              onClick={() => setPage(i + 1)}
              className={cx("Pagination__numberButton", {
                "Pagination__numberButton--active": i + 1 === page,
              })}
            >
              {i + 1}
            </Link>
          ))}
      </div>
      <Link
        to={`/${page + 1}`}
        className={cx("Pagination__navButton", {
          "Pagination__navButton--disabled": page === totalPages,
        })}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Далее
      </Link>
    </div>
  );
};
