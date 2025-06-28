import TableNoInfo from "@/components/atoms/RelatorioTop/Tables/TableNoInfo/TableNoInfo";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

function createData(
    descricao: string,
    resultado: string,
 ) {
    return { descricao, resultado };    
 }

interface RowData {
  descricao: string;
  resultado: string;
}

interface TableInfoAlertasRestricoesProps {
  rows?: RowData[];
}

export default function TableInfoAlertasRestricoes({ rows }: TableInfoAlertasRestricoesProps) {
  const defaultRows = [
    createData("STATUS CADASTRO POSITIVO", "CLIENTE NOTIFICADO, PERIODO DE RESPOSTA ENCERRADO, DADOS PRONTOS PARA SEREM USADOS"),
    createData("CONSULTAS 30 DIAS", "0"),
    createData("CONSULTAS 31 A 60 DIAS", "0"),
    createData("CONSULTAS 61 A 90 DIAS", "0"),
    createData("CONSULTAS MAIS DE 90 DIAS", "0"),
  ];
  const dataRows = rows ?? defaultRows;

  return(
      <div>
          <h3 className="p-2 flex justify-center align-itens">Informações Alertas Restrições</h3>
          <TableContainer className="mb-4" component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                  <TableRow sx={{ backgroundColor: "#112331" }}>
                      <TableCell className="text-white font-bold">Informação</TableCell>
                      <TableCell className="text-white font-bold" align="right">Descrição</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "#f1f5f9" }}>
                  {dataRows.length > 0 ? (
                          dataRows.map((row, index) => (
                              <TableRow
                                  key={row.descricao}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  className={index % 2 === 0 ? 'bg-secondary-100' : 'bg-white'}
                              >
                                  <TableCell component="th" scope="row">
                                  {row.descricao}
                                  </TableCell>
                                  <TableCell align="right">{row.resultado}</TableCell>
                              </TableRow>
                              ))
                      ) : (
                          <TableNoInfo text="Nada consta"/>
                      )}
              </TableBody>
              </Table>
          </TableContainer>
      </div>
  )
}