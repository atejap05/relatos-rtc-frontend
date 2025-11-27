"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRelatos } from "@/hooks/useRelatos";
import { StatusEnum, type Relato } from "@/types/relato";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Eye, Trash2, Plus, Search } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { useDeleteRelato } from "@/hooks/useRelatos";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STATUS_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: StatusEnum.ABERTA, label: "Abertos" },
  { value: StatusEnum.EM_ANDAMENTO, label: "Em Andamento" },
  { value: StatusEnum.CONCLUIDA, label: "Concluídos" },
  { value: StatusEnum.CANCELADA, label: "Cancelados" },
];

export default function RelatosPage() {
  const { data: relatos = [], isLoading } = useRelatos();
  const deleteRelato = useDeleteRelato();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [relatoToDelete, setRelatoToDelete] = useState<Relato | null>(null);

  const filteredRelatos = useMemo(() => {
    return relatos.filter(relato => {
      const matchesSearch =
        relato.numero_demanda
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        relato.numero_relato.toLowerCase().includes(searchTerm.toLowerCase()) ||
        relato.titulo_relato.toLowerCase().includes(searchTerm.toLowerCase()) ||
        relato.responsavel.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || relato.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [relatos, searchTerm, statusFilter]);

  const handleDeleteClick = (relato: Relato) => {
    setRelatoToDelete(relato);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (relatoToDelete) {
      deleteRelato.mutate(relatoToDelete.numero_demanda, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setRelatoToDelete(null);
        },
      });
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os relatos de testes RTC
          </p>
        </div>
        <Link href="/relatos/novo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Relato
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por número, título ou responsável..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Listagem ({filteredRelatos.length}{" "}
            {filteredRelatos.length === 1 ? "relato" : "relatos"})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">
              Carregando...
            </div>
          ) : filteredRelatos.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              Nenhum relato encontrado
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº Demanda</TableHead>
                    <TableHead>Nº Relato</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data Abertura</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRelatos.map(relato => (
                    <TableRow key={relato.numero_demanda}>
                      <TableCell className="font-medium">
                        {relato.numero_demanda}
                      </TableCell>
                      <TableCell>{relato.numero_relato}</TableCell>
                      <TableCell className="max-w-[300px] truncate">
                        {relato.titulo_relato}
                      </TableCell>
                      <TableCell>{relato.responsavel}</TableCell>
                      <TableCell>
                        <StatusBadge status={relato.status} />
                      </TableCell>
                      <TableCell>{formatDate(relato.data_abertura)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/relatos/${relato.numero_demanda}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link
                            href={`/relatos/${relato.numero_demanda}/editar`}
                          >
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(relato)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o relato{" "}
              <strong>{relatoToDelete?.numero_demanda}</strong>? Esta ação não
              pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
