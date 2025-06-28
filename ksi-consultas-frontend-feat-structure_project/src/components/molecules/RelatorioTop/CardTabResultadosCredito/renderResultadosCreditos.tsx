"use client"

import { TableChequeSemFundo } from "@/components/atoms/RelatorioTop/Tables/TableChequeSemFundo/TableChequeSemFundo";
import { TableRGIPendencias } from "@/components/atoms/RelatorioTop/Tables/TableRGIPendencias/TableRGIPendencias";
import { TableResumoPendencias } from "@/components/atoms/RelatorioTop/Tables/TableResumoPendencias/TableResumoPendencias";
import { TableProtestoNacional } from "@/components/atoms/RelatorioTop/Tables/TableProtestoNacionall/TableProtestoNacional";

export function renderResultadosCreditos() {
    return (
    <div className="w-full mb-4">
        <TableResumoPendencias/>
        <TableRGIPendencias/>
        <TableChequeSemFundo/>
        <TableProtestoNacional/>
    </div>
    );
  }