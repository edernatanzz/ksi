'use client'

import { Paper, Box, Typography } from "@mui/material"
import { Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { DataTable } from "@/components/molecules/RatingBancario/DataTable/DataTable"
import { LimitInfoTable } from "@/components/molecules/RatingBancario/LimitInfoTable/LimitInfoTable"


interface CreditLimitSectionProps {
    personType: string
}

export function CreditLimitSection({ personType }: CreditLimitSectionProps) {
    const isPessoaFisica = personType === "fisica"

    const resumoDataFisica = [
        { item: "RGI do Brasil", quantidade: "-", ultimaOcorrencia: "-", pontuacao: "APROVADO", valorTotal: "-" },
        { item: "Cheque Sem Fundo", quantidade: "-", ultimaOcorrencia: "-", pontuacao: "APROVADO", valorTotal: "-" },
        { item: "Protesto Nacional", quantidade: "-", ultimaOcorrencia: "-", pontuacao: "APROVADO", valorTotal: "-" },
        {item: "Recuperação Judicial e Falência", quantidade: "-", ultimaOcorrencia: "-", pontuacao: "APROVADO", valorTotal: "-"},
        { item: "Limite de crédito", quantidade: "0,00", ultimaOcorrencia: "-", pontuacao: "-", valorTotal: "-" },
        {item: "Classificação do Risco de Crédito", quantidade: "AA", ultimaOcorrencia: "-", pontuacao: "-", valorTotal: "-"}
    ]

    const resumoDataJuridica = [
        { item: "RGI do Brasil", quantidade: "273", ultimaOcorrencia: "-", pontuacao: "-", valorTotal: "R$ 113.173,63" },
        { item: "Cheque Sem Fundo", quantidade: "-", ultimaOcorrencia: "-", pontuacao: "APROVADO", valorTotal: "-" },
        { item: "Protesto Nacional", quantidade: "-", ultimaOcorrencia: "-", pontuacao: "APROVADO", valorTotal: "-" },
        {item: "Recuperação Judicial e Falência", quantidade: "-", ultimaOcorrencia: "-", pontuacao: "APROVADO", valorTotal: "-"},
        { item: "Faturamento Presumido", quantidade: "R$: 0,00", ultimaOcorrencia: "-", pontuacao: "-", valorTotal: "-" },
        {item: "Classificação do Risco de Crédito", quantidade: "AA", ultimaOcorrencia: "-", pontuacao: "-", valorTotal: "-"}
    ]

    const resumoData = isPessoaFisica ? resumoDataFisica : resumoDataJuridica

    const resumoInfoFisica = [
        { item: "Início de Relacionamento", info: "26/06/2020"},
        { item: "Quantidade de Instituições", info: "3"},
        { item: "Quantidade de Operações", info: "10"},
        { item: "Quantidade de Operações com Manifestação por Discordência", info: "NADA CONSTA"},
        { item: "Quantidade de Operações Amparadas por Sub-Judice", info: "NADA CONSTA"},
    ]

    const resumoInfoJuridica = [
        { item: "Início de Relacionamento", info: "26/06/2020"},
        { item: "Quantidade de Instituições", info: "3"},
        { item: "Quantidade de Operações", info: "10"},
        { item: "Quantidade de Operações com Manifestação por Discordência", info: "NADA CONSTA"},
        { item: "Quantidade de Operações Amparadas por Sub-Judice", info: "NADA CONSTA"},
    ]

    const resumoInfo = isPessoaFisica ? resumoInfoFisica : resumoInfoJuridica

    return (
        <Paper elevation={2} sx={{ p: 3, backgroundColor: "#FFFCF9", mb: 4 }}>
            <Box display="flex" alignItems="center" gap={1} mb={3}>
                <Typography variant="h5" fontWeight="bold" color="#112331">
                    {isPessoaFisica ? "LIMITE DE CRÉDITO" : "FATURAMENTO MENSAL PRESUMIDO"}
                </Typography>
                <Tooltip 
                    title={
                    <Typography variant="body1">
                        {isPessoaFisica
                        ? "Informa, por meio de faixa de valores em reais, um limite mensal de concessão de crédito para um determinado grupo ou perfil no qual o indivíduo está inserido. É um modelo estatístico que utiliza informações sobre a renda mensal estimada."
                        : "O faturamento mensal presumido representa uma estimativa do potencial de geração de receita mensal com base em informações relevantes sobre a renda da empresa e outros dados financeiros. Esse valor reflete o perfil econômico de um grupo, proporcionando uma visão clara de sua capacidade fincanceira. O cálculo leva em conta práticas estatísticas e dados do mercado, oferencendo uma análise precisa do cenário econômico. Essa informação tem como objetivo proporcionar uma compreensão mais ampla do potencial financeiro do indivíduo, sendo útil em diversos contextos financeiros. Contudo, é importante obsevar que as decisões relacionadas a análise de crédito devem considerar outros fatores além do faturamento, a fim de garantir uma visão completa e equilibrada. As informações fornecidas são importantes são confidenciais e geridas de acordo com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709, de 14 de agosto de 2018)."}
                    </Typography>
                    }
                    placement="top"
                    arrow
                    >
                    <IconButton className="text-[#112331] hover:text-[#64748b]">
                        <InfoIcon className="text-lg" />
                    </IconButton>
                </Tooltip>
            </Box>

            <Typography variant="h3" fontWeight="bold" color="primary" mb={3}>
                R$ 0,00
            </Typography>

            <Box sx={{ borderTop: 1, borderColor: "divider", pt: 3 }}>
                <DataTable data={resumoData} title="Resumo" />
                <LimitInfoTable data={resumoInfo} title="Resumo" />
            </Box>
        </Paper>
    )
}

