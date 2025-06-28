import { Card, CardContent, CardHeader } from "@mui/material"
import { Mail, MapPin, Phone, Users } from "lucide-react"

// Interfaces para tipagem
interface EmailData {
    email: string;
}

interface TelefoneData {
    telefone: string;
}

interface EnderecoData {
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
}

interface PessoaData {
    nome: string;
    documento: string;
    descricao: string;
}

interface Props {
  data: (EmailData | TelefoneData)[];
  enderecos: EnderecoData[];
  pessoas: PessoaData[];
}

// Função para formatar telefone
export const formatarTelefone = (telefone: string) => {
    // Remove todos os caracteres não numéricos
    const numeros = telefone.replace(/\D/g, '');
    
    // Aplica a formatação baseada no número de dígitos
    if (numeros.length === 11) {
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
    } else if (numeros.length === 10) {
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    } else {
        // Se não tiver 10 ou 11 dígitos, retorna o número original
        return telefone;
    }
};

export function renderResultadosContato({ data, enderecos, pessoas }: Props){
    const telefones = data.filter((item): item is TelefoneData => 'telefone' in item);

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-secondary-100">
                <CardHeader
                    title={
                        <span className="text-lg flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Emails
                        </span>
                    }
                    subheader={
                        <div className="flex flex-col space-y-1 text-sm md:text-base text-gray-600">
                            {data.length > 0 ? (
                                data.filter(item => 'email' in item).length + ' emails encontrados'
                            ) : (
                                <span>Nenhum email encontrado</span>
                            )}
                        </div>
                    }
                />
                <CardContent>
                    <ul className="space-y-2">
                        {data.filter((item): item is EmailData => 'email' in item).map((email, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm md:text-base">
                                {email.email}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card className="bg-secondary-100">
                <CardHeader
                    title={
                        <span className="text-lg flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Telefones
                        </span>
                    }
                    subheader={
                        <div className="flex flex-col space-y-1 text-sm md:text-base text-gray-600">
                            {telefones.length > 0 ? (
                            `${telefones.length} telefones encontrados`
                            ) : (
                            <span>Nenhum telefone encontrado</span>
                            )}
                        </div>
                    }
                />
                <CardContent>
                    <ul className="space-y-2">
                        {data.filter((item): item is TelefoneData => 'telefone' in item).map((telefone, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm md:text-base">
                                {formatarTelefone(telefone.telefone)}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card className="bg-secondary-100">
                <CardHeader
                    title={
                        <span className="text-lg flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Endereços
                        </span>
                    }
                    subheader={
                        <div className="flex flex-col space-y-1 text-sm md:text-base text-gray-600">
                            {enderecos.length > 0 ? (
                                enderecos.length + ' endereços encontrados'
                            ) : (
                                <span>Nenhum endereço encontrado</span>
                            )}
                        </div>
                    }
                />
                <CardContent>
                    <div className="space-y-2">
                        {enderecos.map((endereco, index) => (
                            <div key={index} className="border rounded-md">
                                <p className="text-sm">
                                    {endereco.logradouro}, {endereco.numero} - {endereco.bairro} - {endereco.cidade} - {endereco.estado}
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-secondary-100">
                <CardHeader
                    title={
                        <span className="text-lg flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Pessoas para contatos
                        </span>
                    }
                    subheader={
                        <div className="flex flex-col space-y-1 text-sm md:text-base text-gray-600">
                            {pessoas.length > 0 ? (
                                pessoas.length + ' contatos encontrados'
                            ) : (
                                <span>Nenhum contato encontrado</span>
                            )}
                        </div>
                    }
                />
                <CardContent>
                    <ul className="space-y-2">
                        {pessoas.map((pessoa, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm md:text-base">
                                {pessoa.nome} - {pessoa.documento} - {pessoa.descricao}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
} 