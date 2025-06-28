import { Card } from "@mui/material";

interface TableRendaFamiliarProps{
    personType: string;
    renda?: number;
}



export default function TableRendaFamiliar({personType, renda}: TableRendaFamiliarProps) {
    const valorRenda = renda !== undefined ? renda : 5500.00;
    return (
        <Card className="flex flex-col gap-4 justify-center items-center lg:w-1/3 p-4 bg-secondary-100">
            <h3>Renda Familiar</h3>
            {personType === 'fisica' && (
                <div>
                    {valorRenda > 0
                        ? valorRenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                        : '-'}
                </div>
            )}
            {personType === 'juridica' && (
                <div></div>
            )}
        </Card>
    )
}