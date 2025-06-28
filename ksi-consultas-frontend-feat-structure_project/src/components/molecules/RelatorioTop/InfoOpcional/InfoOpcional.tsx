import TableRendaFamiliar from "@/components/atoms/RelatorioTop/Tables/TablesInfoOpcional/TableRendaFamiliar/TableRendaFamiliar";
import TableAcoesJudiciais from "@/components/atoms/RelatorioTop/Tables/TablesInfoOpcional/TableAcoesJudiciais/TableAcoesJudiciais";
import TableSCR from "@/components/atoms/RelatorioTop/Tables/TablesInfoOpcional/TableSCR/TableSCR";
import TableCadin from "@/components/atoms/RelatorioTop/Tables/TablesInfoOpcional/TableCadin/TableCadin";
import TableObito from "@/components/atoms/RelatorioTop/Tables/TablesInfoOpcional/TableObito/TableObito";

interface InfoOpcionalProps {
    opcionalSelected: string[];
    personType: string;
}

export default function InfoOpcional({opcionalSelected, personType}: InfoOpcionalProps) {
    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full">
            <h2>Informações Opcionais</h2>
            {opcionalSelected.includes('rendaFamiliar') && <TableRendaFamiliar personType={personType} />}
            {opcionalSelected.includes('acaoJudicial') && <TableAcoesJudiciais />}
            {opcionalSelected.includes('SCR') && <TableSCR />}
            {opcionalSelected.includes('cadin') && <TableCadin />}
            {opcionalSelected.includes('obito') && <TableObito />}
        </div>
    )
}