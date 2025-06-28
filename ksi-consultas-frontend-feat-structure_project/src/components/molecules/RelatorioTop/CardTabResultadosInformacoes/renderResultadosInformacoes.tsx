import TableRestricoesSinteticas from "@/components/atoms/RelatorioTop/Tables/TableRestricoesSinteticas/TableRestricoesSinteticas";
import TableInfo from "@/components/atoms/RelatorioTop/Tables/TableInfo/TableInfo";
import TableParticipacaoSocietaria from "@/components/atoms/RelatorioTop/Tables/TableParticipacaoSocietaria/TableParticipacaoSocietaria";
import TableInfoAlertasRestricoes from "@/components/atoms/RelatorioTop/Tables/TableInfoAlertasRestricoes/TableInfoAlertasRestricoes";
import TablePassagemComerciais from "@/components/atoms/RelatorioTop/Tables/TablePassagensComerciais/TablePassagensComerciais";
import TableAcoesCiveis from "@/components/atoms/RelatorioTop/Tables/TableAcoesCiveis/TableAcoesCiveis";
import InfoOpcional from "../InfoOpcional/InfoOpcional";
                
interface renderResultadosInformacoesProps {
    personType: string;
    opcionalSelected: string[];
}

export default function renderResultadosInformacoes({personType, opcionalSelected}: renderResultadosInformacoesProps) {
    return (
    <div className="w-full mb-4">
        <TableRestricoesSinteticas/>
        <TableInfo personType={personType}/>
        <TableParticipacaoSocietaria/>
        <TableInfoAlertasRestricoes/>
        <TablePassagemComerciais/>
        <TableAcoesCiveis/>
        {opcionalSelected.length > 0 && <InfoOpcional opcionalSelected={opcionalSelected} personType={personType}/>}
    </div>
    );
  }