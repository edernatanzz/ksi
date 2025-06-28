'use client'

import { useState } from "react";
import { RatingProvider } from "@/contexts/RatingContext/RatingContext";
import DescriptionIcon from "@mui/icons-material/Description";
import { ResultadosTemplate } from "@/components/template/ResultadosTemplate/ResultadosTemplate";
import { CreditClassificationSection } from "@/components/organisms/RatingBancario/CreditClassificationSection/CreditClassificationSection";
import { CreditLimitSection } from "@/components/organisms/RatingBancario/CreditLimitSection/CreditLimitSection";
import { CreditPortfolioSection } from "@/components/organisms/RatingBancario/CreditPortfolioSection/CreditPortfolioSection";
import { FormularioConsulta } from "@/components/molecules/RatingBancario/FormConsulta/FormConsulta";
import { ResultadoConsulta } from "@/components/molecules/RatingBancario/ResultadoConsulta/ResultadoConsulta";
import { DetailedPortfolioSection } from "@/components/organisms/RatingBancario/DetailedPortfolioSection/DetailedPortfolioSection";
import  CopyRight  from "@/components/atoms/CopyRight/CopyRight";

export default function RatingBancarioPage() {
  const [personType, setPersonType] = useState("fisica")
  const [document, setDocument] = useState("")
  const [newConsultation, setNewConsultation] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  const renderConsultaPage = () => (
    <RatingProvider>
      <div className="flex-1 flex flex-col">
        <div className="flex-col h-full flex px-4 sm:px-10 lg:px-16 xl:px-28 py-4 space-y-4">
          {/* Page Content */}
          <div className="flex-1 flex flex-col">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <DescriptionIcon className="text-[#e02725] w-6 h-6" />
                <h1 className="text-xl md:text-2xl font-bold text-[#112331]">Rating Bancário</h1>
              </div>
              <p className="text-sm md:text-base text-gray-600">Relatório analítico de crédito - Rating</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
              <div className="w-full lg:w-1/3">
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
              <div className="w-full lg:w-2/3">
                <ResultadoConsulta dataTestId="resultado-consulta" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </RatingProvider>
  )
  
  const renderResultadosPage = () => (
    <ResultadosTemplate title={"Rating Bancário"} document={document} personType={personType} onNovaConsulta={handleNovaConsulta}>
      <CreditClassificationSection personType={personType} document={document} onNovaConsulta={handleNovaConsulta} />
      <CreditLimitSection personType={personType} />
      <CreditPortfolioSection personType={personType} />
      <DetailedPortfolioSection onVoltar={handleNovaConsulta} personType={personType} />
      <CopyRight />
    </ResultadosTemplate>
  )

  return showResults ? renderResultadosPage() : renderConsultaPage();
}
