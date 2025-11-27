'use client';

import { useRelato } from '@/hooks/useRelatos';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RelatoForm } from '@/components/relatos/relato-form';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function EditarRelatoPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: relato, isLoading } = useRelato(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!relato) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relato não encontrado</h1>
          <p className="text-gray-500">O relato solicitado não existe</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Relato</h1>
        <p className="text-gray-500">Atualize as informações do relato</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Relato</CardTitle>
        </CardHeader>
        <CardContent>
          <RelatoForm relato={relato} mode="edit" />
        </CardContent>
      </Card>
    </div>
  );
}

