'use client';

import { useRelato } from '@/hooks/useRelatos';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RelatoForm } from '@/components/relatos/relato-form';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useParams, notFound } from 'next/navigation';
import { ABAS, type Aba } from '@/types/relato';

export default function EditarRelatoPage() {
  const params = useParams();
  const aba = params.aba as string;
  const id = params.id as string;
  
  // Validar se a aba existe
  if (!ABAS.includes(aba as Aba)) {
    notFound();
  }

  const { data: relato, isLoading } = useRelato(aba, id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!relato) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relato não encontrado</h1>
          <p className="text-muted-foreground">O relato solicitado não existe</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Relato - {aba}</h1>
        <p className="text-muted-foreground">Atualize as informações do relato</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Relato</CardTitle>
        </CardHeader>
        <CardContent>
          <RelatoForm relato={relato} mode="edit" aba={aba} />
        </CardContent>
      </Card>
    </div>
  );
}

