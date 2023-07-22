
import { memo } from "react";
import { TableCell } from "../TableCell/TableCell";

export const TableRow = ({id, title, body}) => {
  return (
    <tr className="TableRow">
      <TableCell data={id} />
      <TableCell data={title} />
      <TableCell data={body} />
      {/* {values.map((value) => <TableCell key={value} />)} */}
    </tr>
  );
};