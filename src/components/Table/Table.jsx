import "./Table.css";
import { TableRow } from "../TableRow/TableRow";
import { ReactComponent as Arrow } from "../../assets/svg/arrow.svg";
import * as cx from "classnames";
import { TableHeadCell } from "../TableHeadData/TableHeadCell";

const headData = [
  {
    title: "ID",
    label: "id",
  },
  {
    title: "Заголовок",
    label: "title",
  },
  {
    title: "Описание",
    label: "body",
  },
];

export function Table({ data, handleSort, sortConfig }) {

  return (
    <table className="Table">
      <thead>
        <tr className="Table__headRow">
          {headData.map(({ title, label }) => (
            <TableHeadCell
              key={label}
              title={title}
              label={label}
              isDescending={
                sortConfig.key === label &&
                sortConfig.direction === "descending"
              }
              onClick={() => handleSort(label)}
            />
          ))}
        </tr>
      </thead>
      <tbody className="Table__body">
        {data.map(({ id, title, body }) => (
          <TableRow key={id} id={id} title={title} body={body} />
        ))}
      </tbody>
    </table>
  );
}
