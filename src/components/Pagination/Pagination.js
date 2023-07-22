import "./Pagination.css";
import * as cx from "classnames";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export const Pagination = ({ setPage, page, totalPages }) => {
  const { width } = useWindowDimensions();
  return (
    <div className="Pagination">
      <button
        className="Pagination__navButton"
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page === 1}
      >
        Назад
      </button>
      <div className="Pagination__numbers">
        {Object.keys(Array(totalPages).fill()).map((_, i) => (
          // let currentPage = i + 1;
          // (width < 650 || page > 10) && (          
            <button
            key={i}
              onClick={() => setPage(i + 1)}
              className={cx("Pagination__numberButton", {
                  "Pagination__numberButton--active": (i + 1) === page,
                })}
            >
              {i + 1}
            </button>
        ))}
      </div>
      <button
        className="Pagination__navButton"
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page === totalPages}
      >
        Далее
      </button>
    </div>
  );
};
