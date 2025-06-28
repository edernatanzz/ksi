'use client'

import { Paper, Typography, Box } from "@mui/material"
import { Button } from "@/components/atoms/Button/Button"
import { CreditDetailTable } from "@/components/molecules/RatingBancario/CreditDetailTable/CreditDetailTable"
import { AlertsTable } from "@/components/molecules/RatingBancario/AlertsTable/AlertsTable"
import { TablePassagemComercial } from "@/components/molecules/RatingBancario/TablePassagemComercial/TablePassagemComercial"

interface DetailedPortfolioSectionProps {
    onVoltar: () => void
    personType: string
}

interface PassagemComercial {
    data: string
    tipo: string
    valor: string
    status: string
}

export function DetailedPortfolioSection({ onVoltar, personType }: DetailedPortfolioSectionProps) {
    const isPessoaFisica = personType === "fisica"

    const creditDataFisica = [
        {category: "EMPRÉSTIMOS", resumo: "CARTAO DE CREDITO ? COMPRA, FATURA PARCELADA OU SAQUE FINANCIADO PELA INSTITUICAO EMITENTE DO CARTAO",
        items: [{description: "TOTAL", value: "R$ 203,74", percentage: "1,90%"},
                { description: "CREDITOS A VENCER ATE 30 DIAS", value: "R$ 5,33", percentage: "0,05%" },
                { description: "CREDITOS A VENCER DE 31 A 60 DIAS", value: "R$ 163,15", percentage: "1,52%" },
                { description: "CREDITOS A VENCER DE 61 A 90 DIAS", value: "R$ 35,26", percentage: "0,33%" }]},
        {category: "OUTROS CREDITOS", resumo: "CARTAO DE CREDITO - COMPRA A VISTA E PARCELADO LOJISTA",
        items: [{description: "TOTAL", value: "R$ 3.273,23", percentage: "30,59%"},
                { description: "CREDITOS A VENCER ATE 30 DIAS", value: "R$ 2.524,56", percentage: "23,60%" },
                { description: "CREDITOS A VENCER DE 31 A 60 DIAS", value: "R$ 471,03", percentage: "4,40%" },
                { description: "CREDITOS A VENCER DE 61 A 90 DIAS", value: "R$ 277,64", percentage: "2,59%" }]},
        {category: "LIMITE", resumo: "CARTAO DE CREDITO",
        items: [{ description: "TOTAL", value: "R$ 7.222,44", percentage: "67,50%" },
                { description: "LIMITE DE CREDITO COM VENCIMENTO ATE 360 DIAS", value: "R$ 7.222,44", percentage: "67,50%" }]},
    ]

    const creditDataJuridica = [
        {category: "ADIANTAMENTOS A DEPOSITANTES", resumo: "ADIANTAMENTOS A DEPOSITANTES",
        items: [{ description: "TOTAL", value: "R$ 0,79", percentage: "0,00%" },
                { description: "CREDITOS A VENCER ATE 30 DIAS", value: "R$ 0,79", percentage: "0,00%" }]},
        {category: "OUTROS CREDITOS", resumo: "CARTAO DE CREDITO - COMPRA A VISTA E PARCELADO LOJISTA",
        items: [{description: "TOTAL", value: "R$ 337.178,12", percentage: "15,98%"},
                { description: "CREDITOS A VENCER ATE 30 DIAS", value: "R$ 238.280,25", percentage: "11,29%" },
                { description: "CREDITOS A VENCER DE 31 A 60 DIAS", value: "R$ 32.244,86", percentage: "1,53%" },
                { description: "CREDITOS A VENCER DE 61 A 90 DIAS", value: "R$ 9.438,06", percentage: "0,45%" },
                { description: "CREDITOS A VENCER DE 91 A 180 DIAS", value: "R$ 28.314,18", percentage: "1,34%" },
                { description: "CREDITOS A VENCER DE 181 A 360 DIAS", value: "R$ 28.900,77", percentage: "1,37%" }]},
        {category: "LIMITE", resumo: "CARTAO DE CREDITO",
        items: [{ description: "TOTAL", value: "R$ 1.772.822,90", percentage: "84,02%" },
                { description: "LIMITE DE CREDITO COM VENCIMENTO ATE 360 DIAS", value: "R$ 304.370,75", percentage: "14,43%" },
                {description: "LIMITE DE CREDITO COM VENCIMENTO ACIMA DE 360 DIAS", value: "R$ 1.468.452,15", percentage: "69,59%"}]}
    ]

    const creditData = isPessoaFisica ? creditDataFisica : creditDataJuridica

    const alertasDataFisica = [
        {
        info: "STATUS CADASTRO POSITIVO",
        descricao: "CLIENTE NOTIFICADO, PERIODO DE RESPOSTA ENCERRADO, DADOS PRONTOS PARA SEREM USADOS",
        },
        { info: "CONSULTAS 30 DIAS", descricao: "QUANTIDADE TOTAL: 0" },
        { info: "CONSULTAS 31 A 60 DIAS", descricao: "QUANTIDADE TOTAL: 0" },
        { info: "CONSULTAS 61 A 90 DIAS", descricao: "QUANTIDADE TOTAL: 0" },
        { info: "CONSULTAS 90+ DIAS", descricao: "QUANTIDADE TOTAL: 0" },
    ]

    const alertasDataJuridica = [
        { info: "MATRIZ/FILIAL", descricao: "FILIAL" },
        { info: "TEMPO DE ATUAÇÃO", descricao: "21 a 30 anos" },
        { info: "AERONAVES", descricao: "NENHUM REGISTRO ENCONTRADO NAS BASES CONSULTADAS" },
        { info: "IMOVEIS", descricao: "NENHUM REGISTRO ENCONTRADO NAS BASES CONSULTADAS" },
        { info: "SITES", descricao: "aspa.org.br /" },
        { info: "REPRESENTANTE", descricao: "CPF/CNPJ: 03701553866 - MARLINTON SOUZA LOPES" },
        { info: "CNAES SECUNDARIOS", descricao: "9430800-ATIVIDADES DE ASSOCIACOES DE DEFESA DE DIREITOS SOCIAIS /" },
    ]

  const alertasData = isPessoaFisica ? alertasDataFisica : alertasDataJuridica

  // Dados de exemplo para a tabela de passagens comerciais
  const passagensComerciaisData: PassagemComercial[] = [] // Quando houver integração com API, os dados virão aqui

  return (
    <Paper elevation={2} sx={{ p: 3, backgroundColor: "#FFFCF9" }}>
      <Typography className="text-secondary-800" variant="h5" fontWeight="bold" textAlign="center" mb={3}>
        Carteira de Crédito Detalhada
      </Typography>

      <Box mb={4}>
        <CreditDetailTable data={creditData} />
      </Box>

      <Box mb={4}>
        <AlertsTable data={alertasData} title="Informações Alertas Restrições" />
      </Box>

      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold" color="text.secondary" mb={2}>
          Passagens Comerciais
        </Typography>
        <div className="mb-4">
          <span className="font-bold">✚ Ocorrências :</span>
        </div>
        <TablePassagemComercial data={passagensComerciaisData} />
      </Box>

      <Box textAlign="center" mb={4}>
        <Button className="bg-gray-600 hover:bg-gray-700 text-white" onClick={onVoltar}>
          Fazer nova consulta
        </Button>
      </Box>
    </Paper>
  )

}