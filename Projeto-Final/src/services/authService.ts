import axios from 'axios';
import type { UserFormData } from '../schemas/userSchema';

const apiClient = axios.create({
  baseURL: 'http://localhost:3333',
});

async function login(data: UserFormData) {
  try {
    const response = await apiClient.post('/login', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Erro desconhecido no servidor.');
    }
    throw new Error('Não foi possível conectar ao servidor.');
  }
}

export const authService = {
  login,
};