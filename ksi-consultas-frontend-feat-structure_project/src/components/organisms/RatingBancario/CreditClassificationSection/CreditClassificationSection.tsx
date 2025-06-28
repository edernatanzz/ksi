'use client'

import { Paper, Box, Typography, Grid, Avatar } from "@mui/material";

import { ClassificationList } from "@/components/atoms/RatingBancario/ClassificationList/ClassificationList";
import { Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

interface CreditClassificationSectionProps {
    personType: string
    onNovaConsulta: () => void
    document: string
}

export function CreditClassificationSection({
    personType,
}: CreditClassificationSectionProps) {
    //Apenas um exemplo de classificação de crédito
    const userClassification = "AA"
    const classifications = ["AAA", "AA", "A", "BBB", "BB", "B", "C", "C-"]

    return (
        <Paper elevation={2} sx={{p: 1, backgroundColor: "#FFFCF9", mb: 4}}>
            <Paper className="flex flex-row"
                sx={{
                    p: 1.5,
                    backgroundColor: "#112331",
                    color: "#fdf6ef",
                    my: 4,
                }}>
                <Typography variant="h6" className="font-bold">
                    Classificação de Risco de Crédito
                </Typography>
                <Tooltip 
                    title={
                    <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                        A faixa de classificação fornecida visa estimar a classe ou perfil no qual {personType === "fisica" ? "um indivíduo" : "uma empresa"} se insere, com base nas melhores práticas e modelos
                        estatísticos disponíveis. No entento, esta estimativa pode não refletir com precisão a renda real {personType === "fisica" ? "do indivíduo" : "da empresa"}. 
                        A decisão final de aprovação ou recusa é de responsabilidade exclusiva do cedente. As informações fornecidas 
                        pela nosssa empresa têm o objetivo de subsidiar a tomada de decisões, mas, em hipótese alguma, devem ser usadas 
                        como critério decisivo para a aprovação ou recusa de {personType === "fisica" ? "um indivíduo" : "uma empresa"}. 
                        Outros fatores relevantes devem ser considerados pelo concedente ao tomar sua decisão. 
                        O resultado é calculado com base nos dados disponíveis nas melhores bases no momento da consulta.
                    </Typography>
                    }
                    placement="top"
                    aria-label="Classificação de Risco de Crédito"
                    arrow
                    >
                    <IconButton className="text-[#FFFCF9] hover:text-[#64748b]">
                        <InfoIcon className="text-base" />
                    </IconButton>
                </Tooltip>
            </Paper>

            <Grid container spacing={4} justifyContent={"center"}> 
                <Grid className="xs={12} md={6}">
                    <Box className="flex justify-center items-center h-full">
                        <Avatar
                            sx={{
                                width: 120,
                                height: 120,
                                backgroundColor: "transparent",
                                border: "8px solid #94a3b8", // Cor cinza claro
                                fontSize: "2.5rem",
                                fontWeight: "bold",
                                color: "#112331", // Cor cinza escuro
                            }}>
                            {userClassification}
                        </Avatar>
                    </Box>
                </Grid>
                <Grid className="xs={12}">
                    <Box>
                        <ClassificationList classifications={classifications} activeClassification={userClassification} />
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}