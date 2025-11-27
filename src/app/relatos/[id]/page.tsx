'use client';

import Link from 'next/link';
import { useRelato, useDeleteRelato } from '@/hooks/useRelatos';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { StatusEnum } from '@/types/relato';

export default function RelatoDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { data: relato, isLoading } = useRelato(id);
  const deleteRelato = useDeleteRelato();
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

  const getStatusBadgeClass = (status: StatusEnum) => {
    const classes = {
      [StatusEnum.ABERTA]: 'bg-blue-100 text-blue-800',
      [StatusEnum.EM_ANDAMENTO]: 'bg-yellow-100 text-yellow-800',
      [StatusEnum.CONCLUIDA]: 'bg-green-100 text-green-800',
      [StatusEnum.CANCELADA]: 'bg-red-100 text-red-800',
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  };

  const handleDelete = () => {
    if (relato) {
      deleteRelato.mutate(relato.numero_demanda, {
        onSuccess: () => {
          router.push('/relatos');
        },
      });
    }
  };

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
        <Link href="/relatos">
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
          <Link href="/relatos">
            <Button variant="ghost" size="sm" className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{relato.titulo_relato}</h1>
          <p className="text-gray-500">Detalhes do relato de teste RTC</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/relatos/${relato.numero_demanda}/editar`}>
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
              <label className="text-sm font-medium text-gray-500">Número da Demanda</label>
              <p className="text-lg font-semibold">{relato.numero_demanda}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Número do Relato</label>
              <p className="text-lg">{relato.numero_relato}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <p>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusBadgeClass(relato.status)}`}
                >
                  {relato.status}
                </span>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Responsável</label>
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
              <label className="text-sm font-medium text-gray-500">Data de Abertura</label>
              <p className="text-lg">{formatDate(relato.data_abertura)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Data de Encerramento</label>
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
          <p className="whitespace-pre-wrap text-gray-700">{relato.descricao_relato}</p>
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

