import axios from 'axios';
import type { Relato, RelatoCreate, RelatoUpdate, StatusEnum } from '@/types/relato';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const relatosApi = {
  // Listar abas disponíveis
  getAbas: async (): Promise<string[]> => {
    const response = await api.get<string[]>('/abas');
    return response.data;
  },

  // Listar todos os relatos da aba
  getAll: async (aba: string): Promise<Relato[]> => {
    const response = await api.get<Relato[]>(`/${aba}/relatos`);
    return response.data;
  },

  // Buscar relato por ID (numero_demanda - mantido para compatibilidade)
  getById: async (aba: string, numeroDemanda: string): Promise<Relato> => {
    const response = await api.get<Relato>(`/${aba}/relatos/${numeroDemanda}`);
    return response.data;
  },

  // Buscar relato por número do relato (chave única)
  getByNumeroRelato: async (aba: string, numeroRelato: string): Promise<Relato> => {
    const response = await api.get<Relato>(`/${aba}/relatos/por-relato/${numeroRelato}`);
    return response.data;
  },

  // Criar novo relato
  create: async (aba: string, relato: RelatoCreate): Promise<Relato> => {
    const response = await api.post<Relato>(`/${aba}/relatos`, relato);
    return response.data;
  },

  // Atualizar relato (numero_demanda - mantido para compatibilidade)
  update: async (aba: string, numeroDemanda: string, relato: RelatoUpdate): Promise<Relato> => {
    const response = await api.put<Relato>(`/${aba}/relatos/${numeroDemanda}`, relato);
    return response.data;
  },

  // Atualizar relato por número do relato (chave única)
  updateByNumeroRelato: async (aba: string, numeroRelato: string, relato: RelatoUpdate): Promise<Relato> => {
    const response = await api.put<Relato>(`/${aba}/relatos/por-relato/${numeroRelato}`, relato);
    return response.data;
  },

  // Deletar relato (numero_demanda - mantido para compatibilidade)
  delete: async (aba: string, numeroDemanda: string): Promise<void> => {
    await api.delete(`/${aba}/relatos/${numeroDemanda}`);
  },

  // Deletar relato por número do relato (chave única)
  deleteByNumeroRelato: async (aba: string, numeroRelato: string): Promise<void> => {
    await api.delete(`/${aba}/relatos/por-relato/${numeroRelato}`);
  },

  // Filtrar por status
  getByStatus: async (aba: string, status: StatusEnum): Promise<Relato[]> => {
    const response = await api.get<Relato[]>(`/${aba}/relatos/status/${status}`);
    return response.data;
  },
};

export default api;

