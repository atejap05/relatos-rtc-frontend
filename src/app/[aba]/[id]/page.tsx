'use client';

import Link from 'next/link';
import { useRelato, useDeleteRelato } from '@/hooks/useRelatos';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter, useParams, notFound } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { StatusBadge } from '@/components/ui/status-badge';
import { ABAS, type Aba } from '@/types/relato';

export default function RelatoDetailsPage() {
  const params = useParams();
  const aba = params.aba as string;
  const id = params.id as string;
  const router = useRouter();
  
  // Validar se a aba existe
  if (!ABAS.includes(aba as Aba)) {
    notFound();
  }

  const { data: relato, isLoading } = useRelato(aba, id);
  const deleteRelato = useDeleteRelato(aba);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = () => {
    if (relato) {
      deleteRelato.mutate(relato.numero_demanda, {
        onSuccess: () => {
          router.push(`/${aba}`);
        },
      });
    }
  };

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
        <Link href={`/${aba}`}>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Listagem
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href={`/${aba}`}>
            <Button variant="ghost" size="sm" className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{relato.titulo_relato}</h1>
          <p className="text-muted-foreground">Detalhes do relato de teste RTC - {aba}</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/${aba}/${relato.numero_demanda}/editar`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </Link>
          <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Número da Demanda</label>
              <p className="text-lg font-semibold">{relato.numero_demanda}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Número do Relato</label>
              <p className="text-lg">{relato.numero_relato}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Tipo do Relato</label>
              <p className="text-lg">{relato.tipo_relato || "-"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Ambiente</label>
              <p className="text-lg">{relato.ambiente || "-"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <p>
                <StatusBadge status={relato.status} />
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Responsável</label>
              <p className="text-lg">{relato.responsavel}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Datas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Data de Abertura</label>
              <p className="text-lg">{formatDate(relato.data_abertura)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Data de Encerramento</label>
              <p className="text-lg">{formatDate(relato.data_encerramento)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Descrição</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-foreground">{relato.descricao_relato}</p>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o relato <strong>{relato.numero_demanda}</strong>?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

