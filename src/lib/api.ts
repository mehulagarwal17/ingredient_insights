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

import { auth } from '@clerk/nextjs/server';

class ApiClient {
  private getAuthHeaders() {
    // Get the JWT token from Clerk
    const token = auth().getToken();
    
    return {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    };
  }

  async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  }

  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  }

  async delete(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
  }

  // Chat Sessions
  async getChatSessions(): Promise<ChatSession[]> {
    try {
      const data = await this.get('/api/chat/sessions/');
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

  async getChatSession(id: number): Promise<ChatSessionDetail> {
    return this.get(`/api/chat/sessions/${id}/`);
  }

  async createChatSession(title?: string): Promise<ChatSession> {
    return this.post('/api/chat/sessions/', { title: title || 'New Chat' });
  }

  async deleteChatSession(id: number) {
    return this.delete(`/api/chat/sessions/${id}/`);
  }

  // Messages
  async getMessages(sessionId: number): Promise<Message[]> {
    return this.get(`/api/chat/sessions/${sessionId}/messages_list/`);
  }

  async addMessage(sessionId: number, role: 'user' | 'assistant', content: string): Promise<Message> {
    return this.post(`/api/chat/sessions/${sessionId}/messages/`, { role, content });
  }
}

export const apiClient = new ApiClient();
