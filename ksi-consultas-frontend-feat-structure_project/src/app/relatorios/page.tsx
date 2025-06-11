'use client';

import ConsultaForm from "@/components/organisms/ConsultaForm/Consulta.form";
import { ConsultaProvider } from "@/contexts/ConsultaContext";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Sistema de Consultas CPF/CNPJ</h1>
        
        <ConsultaProvider>
          <ConsultaForm />
        </ConsultaProvider>
      </div>
    </main>
  );
}