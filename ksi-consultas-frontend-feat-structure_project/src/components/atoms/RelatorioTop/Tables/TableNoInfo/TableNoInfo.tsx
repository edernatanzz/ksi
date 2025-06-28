import { TableCell, TableRow, Typography } from "@mui/material";

interface TableNoInfoProps {
  text?: string;
}

export default function TableNoInfo({ text = "Sem informações" }: TableNoInfoProps) {
  return (
    <TableRow>
      <TableCell align="center" colSpan={4}>
        <Typography variant="body1">{text}</Typography>
      </TableCell>
    </TableRow>
  );
};