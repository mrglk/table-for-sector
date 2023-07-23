import "./TableHeadCell.css";
import { ReactComponent as Arrow } from "../../assets/svg/arrow.svg";

export function TableHeadCell({ title, onClick }) {
  return (
    <th className="Table__headData">
      {title}
      <button className="Table__headButton" onClick={onClick}>
        <Arrow />
      </button>
    </th>
  );
}
