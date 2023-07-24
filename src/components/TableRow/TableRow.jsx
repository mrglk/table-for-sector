import { TableCell } from "../TableCell/TableCell";

export const TableRow = ({ id, title, body }) => {
  return (
    <tr className="TableRow">
      {[id, title, body].map((cell) => (
        <TableCell key={cell} data={cell} />
      ))}
    </tr>
  );
};
