import { memo } from "react";
import "./TableHeadCell.css";
import { ReactComponent as Arrow } from "../../assets/svg/arrow.svg";
import * as cx from "classnames";

export const TableHeadCell = memo(({ title, onClick, isDescending }) => {
  return (
    <th className="Table__headData">
      {title}
      <button
        className={cx("Table__headButton", {
          "Table__headButton--active": isDescending,
        })}
        onClick={onClick}
      >
        <Arrow />
      </button>
    </th>
  );
});
