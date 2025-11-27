export enum StatusEnum {
  ABERTA = 'ABERTA',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDA = 'CONCLUIDA',
  CANCELADA = 'CANCELADA',
}

export interface Relato {
  numero_demanda: string;
  numero_relato: string;
  titulo_relato: string;
  descricao_relato: string;
  responsavel: string;
  status: StatusEnum;
  data_abertura: string;
  data_encerramento: string | null;
}

export interface RelatoCreate {
  numero_demanda: string;
  numero_relato: string;
  titulo_relato: string;
  descricao_relato: string;
  responsavel: string;
  status?: StatusEnum;
}

export interface RelatoUpdate {
  numero_relato?: string;
  titulo_relato?: string;
  descricao_relato?: string;
  responsavel?: string;
  status?: StatusEnum;
  data_encerramento?: string | null;
}

