import { memo } from "react";
import "./TableCell.css";


export const TableCell = memo(({data}) => {
  return <td className="cell">{data}</td>;
})
