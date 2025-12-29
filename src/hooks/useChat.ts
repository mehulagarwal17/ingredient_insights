'use client';

import { useState, useEffect } from 'react';
import { useApiClient, ChatSession, Message, ChatSessionDetail } from '@/lib/client-api';

export function useChat() {
  const apiClient = useApiClient();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSessionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const sessionsData = await apiClient.getChatSessions();
      setSessions(Array.isArray(sessionsData) ? sessionsData : []);
      setError(null);
    } catch (err) {
      setError('Failed to load chat sessions');
      console.error(err);
      setSessions([]); // Ensure sessions is always an array
    } finally {
      setLoading(false);
    }
  };

  const createNewSession = async (title?: string): Promise<ChatSession> => {
    try {
      const newSession = await apiClient.createChatSession(title);
      setSessions(prev => Array.isArray(prev) ? [newSession, ...prev] : [newSession]);
      return newSession;
    } catch (error) {
      console.error('Failed to create new session:', error);
      throw error;
    }
  };

  const loadSession = async (sessionId: number) => {
    try {
      setLoading(true);
      const sessionData = await apiClient.getChatSession(sessionId);
      setCurrentSession(sessionData);
      setError(null);
    } catch (err) {
      setError('Failed to load session');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addMessage = async (sessionId: number, role: 'user' | 'assistant', content: string) => {
    try {
      const newMessage = await apiClient.addMessage(sessionId, role, content);
      
      // Update current session if it's the active one
      if (currentSession && currentSession.id === sessionId) {
        setCurrentSession({
          ...currentSession,
          messages: [...currentSession.messages, newMessage],
        });
      }
      
      // Update session in the list
      setSessions(prevSessions => {
        if (!Array.isArray(prevSessions)) return prevSessions;
        return prevSessions.map(session => 
          session.id === sessionId 
            ? { ...session, message_count: session.message_count + 1, last_message: newMessage }
            : session
        );
      });
      
      return newMessage;
    } catch (err) {
      setError('Failed to add message');
      console.error(err);
      throw err;
    }
  };

  const deleteSession = async (sessionId: number) => {
    try {
      await apiClient.deleteChatSession(sessionId);
      setSessions(prevSessions => {
        if (!Array.isArray(prevSessions)) return prevSessions;
        return prevSessions.filter(session => session.id !== sessionId);
      });
      if (currentSession && currentSession.id === sessionId) {
        setCurrentSession(null);
      }
    } catch (err) {
      setError('Failed to delete session');
      console.error(err);
      throw err;
    }
  };

  return {
    sessions,
    currentSession,
    loading,
    error,
    loadSessions,
    createNewSession,
    loadSession,
    addMessage,
    deleteSession,
    setCurrentSession,
  };
}
