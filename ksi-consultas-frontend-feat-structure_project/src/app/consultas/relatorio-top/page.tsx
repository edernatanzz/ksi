'use client'

import { useState } from "react";
import { RatingProvider } from "@/contexts/RatingContext/RatingContext";
import DescriptionIcon from "@mui/icons-material/Description";
import { ResultadosTemplate } from "@/components/template/ResultadosTemplate/ResultadosTemplate";
import { FormularioConsulta } from "@/components/molecules/RatingBancario/FormConsulta/FormConsulta";
import CardDescription from "@/components/molecules/RelatorioTop/CardDescription/CardDescription";
import CardOptionalData from "@/components/molecules/RelatorioTop/CardOptionalData/CardOptionalData";
import { AnaliseIA } from "@/components/atoms/RelatorioTop/AnaliseIA/AnaliseIA";
import { FinanceiroData } from "@/components/molecules/RelatorioTop/FinanceiroData/FinanceiroData";
import { TabPainel } from "@/components/organisms/RelatorioTop/TabPainel/TabPainel";
import { renderResultadosCreditos } from "@/components/molecules/RelatorioTop/CardTabResultadosCredito/renderResultadosCreditos";
import { renderResultadosContato } from "@/components/molecules/RelatorioTop/CardTabResultadosContato/renderResultadosContato";
import renderResultadosInformacoes from "@/components/molecules/RelatorioTop/CardTabResultadosInformacoes/renderResultadosInformacoes";
import CopyRight from "@/components/atoms/CopyRight/CopyRight";

export default function RelatorioTopPage() {
  const [personType, setPersonType] = useState("fisica")
  const [document, setDocument] = useState("")
  const [newConsultation, setNewConsultation] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [opcionalSelected, setOpcionalSelected] = useState<string[]>([])

  const handleNovaConsulta = () => {
    setShowResults(false);
    setDocument("");
    setNewConsultation(true);
  }

  const handleConsultar = () => {
    if (document.trim()) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setShowResults(true)
      }, 1500)
    }
  }

  const itensDescription = [
    {item: "Score Positivo."},
    {item: "Faturamento anual presumido PJ."},
    {item: "Renda mensal presumida PF."},
    {item: "Capacidade mensal de pagamento."},
    {item: "Limite de Crédito."},
    {item: "Pontualidade pagamentos."},
    {item: "Quadro Societário."},
    {item: "Participação Societária"},
    {item: "Capital Social."},
    {item: "Situação na Receita Federal."},
    {item: "Data de Fundação"},
    {item: "Registro Geral de Inadimplência."},
    {item: "Restrições de varejo."},
    {item: "Pendências financeiras."},
    {item: "Protesto nacional."},
    {item: "CCF - Cheques sem fundos Nacionais."},
    {item: "Participação societária."},
    {item: "Recuperação judicial ou falência."},
    {item: "Endereços."},
    {item: "Telefones."},
    {item: "E-mails."},
    {item: "Pessoas de contato (referências)."},
    {item: "Consulta de cheque contra-ordem GRATUITO."},
  ]

  const itensOptionalData = [
    {item: "CADIN Federal, Estadual e Municipal", id: "cadin"},
    {item: "Renda familiar", id: "rendaFamiliar"},
    {item: "Ação Judicial Nacional", id: "acaoJudicial"},
    {item: "SCR - Banco Central", id: "SCR"},
    {item: "Óbito (NOVO)", id: "obito"},
  ]

  const renderConsultaPage = () => (
    <RatingProvider>
            <div className="flex-1 flex flex-col">
                <div className="flex-col h-full lg:flex-row flex px-4 sm:px-10 lg:px-20 2xl:px-72 py-4 space-y-4">
                {/* Page Content */}
                    <div className="flex-1 flex flex-col lg:w-1/2 m-3">

                        <div className="mb-6">
                          <div className="flex items-center space-x-2 mb-2">
                              <DescriptionIcon className="text-[#e02725] w-6 h-6" />
                              <h1 className="text-xl md:text-2xl font-bold text-[#112331]">Relatório Top</h1>
                          </div>
                          <p className="text-sm md:text-base text-gray-600">Análise completa de crédito e score</p>
                        </div>
                        {/* Card dos dados opcionais reutilizável */}
                        <CardOptionalData 
                          title="Dados Opcionais" 
                          data={itensOptionalData} 
                          opcionalSelected={opcionalSelected} 
                          setOpcionalSelected={setOpcionalSelected}
                        />

                        <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-4">
                          <p className="text-red-600 text-sm text-center font-medium">
                          OS OPCIONAIS SERÃO COBRADOS COMO ADICIONAIS DA CONSULTA.
                          <br />
                          EM CASO DE DÚVIDAS ENTRAR EM CONTATO COM SEU CONSULTOR CORPORATIVO
                          </p>
                        </div>

                        <div className="flex flex-col gap-4 ">
                        {isLoading && (
                          <div data-testid="loading" className="text-center text-red-600 font-medium">
                            Carregando...
                          </div>
                        )}
                        <div className="w-full">
                          <FormularioConsulta 
                            personType={personType}
                            document={document}
                            newConsultation={newConsultation}
                            isLoading={isLoading}
                            onPersonTypeChange={setPersonType}
                            onDocumentChange={setDocument}
                            onNewConsultationChange={setNewConsultation}
                            onSubmit={handleConsultar}
                            dataTestId="form-consulta"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Card da descrição do relatório, reutulizável */}
                    <CardDescription title="Descrição" data={itensDescription} />

                </div>
            </div>
    </RatingProvider>
  )

  const mockContatoData = {
  data: [
    { email: "contato@empresa.com" },
    { telefone: "(11) 99999-9999" }
  ],
  enderecos: [
    {
      logradouro: "Rua Exemplo",
      numero: "123",
      bairro: "Centro", 
      cidade: "São Paulo",
      estado: "SP"
    }
  ],
  pessoas: [
    { nome: "João da Silva", documento: "05565485245", descricao: "Irmão" }
  ]
};

const itensTabPainel = [
  { label: "Pendências", id: "creditos", content: () => renderResultadosCreditos() },
  { label: "Informações", id: "informacoes", content: () => renderResultadosInformacoes({ personType, opcionalSelected }) },
  { label: "Contato", id: "contato", content: () => renderResultadosContato(mockContatoData) },
]
  
  const renderResultadosPage = () => (
    <ResultadosTemplate title={"Relatório TOP"} document={document} personType={personType} onNovaConsulta={handleNovaConsulta}>
      <div className="flex flex-col w-full gap-4 lg:flex-row lg:gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 w-full justify-center">
            <AnaliseIA />
            <FinanceiroData rendaEstimada={3000} limiteDeCredito={0} pontualidade={17} scorePositivo={264} personType={personType} />
          </div>
      </div>
        <div className="flex justify-center">
        <TabPainel label={itensTabPainel}/>
      </div>
      <CopyRight />
    </ResultadosTemplate>
  )
  return showResults ? renderResultadosPage() : renderConsultaPage();
}
