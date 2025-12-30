import { useAuth } from '@clerk/nextjs';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ChatSession {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  message_count: number;
  last_message?: {
    content: string;
    timestamp: string;
    role: string;
  };
}

export interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatSessionDetail extends ChatSession {
  messages: Message[];
}

class ApiClient {
  async getAuthHeaders(token?: string) {
    // Get the JWT token from Clerk on client side
    const authToken = token || '';

    return {
      'Authorization': authToken ? `Bearer ${authToken}` : '',
      'Content-Type': 'application/json',
    };
  }

  async get(endpoint: string, token?: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: await this.getAuthHeaders(token),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  }

  async post(endpoint: string, data: any, token?: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: await this.getAuthHeaders(token),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  }

  async delete(endpoint: string, token?: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: await this.getAuthHeaders(token),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
  }

  // Chat Sessions
  async getChatSessions(token?: string): Promise<ChatSession[]> {
    try {
      const data = await this.get('/api/chat/sessions/', token);
      // Handle paginated results from Django REST Framework
      if (data && typeof data === 'object' && 'results' in data) {
        return data.results || [];
      }
      // Handle direct array response
      if (Array.isArray(data)) {
        return data;
      }
      // Fallback to empty array
      return [];
    } catch (error) {
      console.error('Failed to fetch chat sessions:', error);
      return [];
    }
  }

  async getChatSession(id: number, token?: string): Promise<ChatSessionDetail> {
    return this.get(`/api/chat/sessions/${id}/`, token);
  }

  async createChatSession(title?: string, token?: string): Promise<ChatSession> {
    return this.post('/api/chat/sessions/', { title: title || 'New Chat' }, token);
  }

  async deleteChatSession(id: number, token?: string) {
    return this.delete(`/api/chat/sessions/${id}/`, token);
  }

  // Messages
  async getMessages(sessionId: number, token?: string): Promise<Message[]> {
    return this.get(`/api/chat/sessions/${sessionId}/messages_list/`, token);
  }

  async addMessage(sessionId: number, role: 'user' | 'assistant', content: string, token?: string): Promise<Message> {
    return this.post(`/api/chat/sessions/${sessionId}/messages/`, { role, content }, token);
  }
}

export const apiClient = new ApiClient();

// Hook for components to use with Clerk authentication
export function useApiClient() {
  const { getToken } = useAuth();

  return {
    getChatSessions: async () => {
      const token = await getToken();
      return apiClient.getChatSessions(token || undefined);
    },
    getChatSession: async (id: number) => {
      const token = await getToken();
      return apiClient.getChatSession(id, token || undefined);
    },
    createChatSession: async (title?: string) => {
      const token = await getToken();
      return apiClient.createChatSession(title, token || undefined);
    },
    deleteChatSession: async (id: number) => {
      const token = await getToken();
      return apiClient.deleteChatSession(id, token || undefined);
    },
    getMessages: async (sessionId: number) => {
      const token = await getToken();
      return apiClient.getMessages(sessionId, token || undefined);
    },
    addMessage: async (sessionId: number, role: 'user' | 'assistant', content: string) => {
      const token = await getToken();
      return apiClient.addMessage(sessionId, role, content, token || undefined);
    },
  };
}
