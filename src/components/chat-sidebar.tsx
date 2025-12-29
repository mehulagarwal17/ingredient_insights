'use client';

import { useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ChatSidebarProps {
  onSessionSelect: (sessionId: number) => void;
  currentSessionId: number | null;
}

export function ChatSidebar({ onSessionSelect, currentSessionId }: ChatSidebarProps) {
  const { sessions, loading, createNewSession, deleteSession } = useChat();
  const [creating, setCreating] = useState(false);

  const handleNewChat = async () => {
    try {
      setCreating(true);
      const newSession = await createNewSession();
      onSessionSelect(newSession.id);
    } catch (error) {
      console.error('Failed to create new chat:', error);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteSession = async (sessionId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteSession(sessionId);
      if (currentSessionId === sessionId) {
        // Select the most recent session or create a new one
        const remainingSessions = Array.isArray(sessions) ? sessions.filter(s => s.id !== sessionId) : [];
        if (remainingSessions.length > 0) {
          onSessionSelect(remainingSessions[0].id);
        } else {
          handleNewChat();
        }
      }
    } catch (error) {
      console.error('Failed to delete session:', error);
    }
  };

  return (
    <div className="flex h-full w-80 flex-col border-r bg-background">
      <div className="p-4">
        <Button 
          onClick={handleNewChat} 
          disabled={creating}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          {creating ? 'Creating...' : 'New Chat'}
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {loading ? (
            <div className="text-center text-muted-foreground">Loading chats...</div>
          ) : !Array.isArray(sessions) || sessions.length === 0 ? (
            <div className="text-center text-muted-foreground">No chats yet</div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className={`group relative rounded-lg border p-3 cursor-pointer transition-colors hover:bg-muted/50 ${
                  currentSessionId === session.id ? 'bg-muted border-primary' : ''
                }`}
                onClick={() => onSessionSelect(session.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <h3 className="truncate text-sm font-medium">
                        {session.title}
                      </h3>
                    </div>
                    
                    {session.last_message && (
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {session.last_message.role === 'user' ? 'You: ' : 'AI: '}
                        {session.last_message.content}
                      </p>
                    )}
                    
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(session.updated_at), { addSuffix: true })}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {session.message_count} messages
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 opacity-0 group-hover:opacity-100"
                    onClick={(e) => handleDeleteSession(session.id, e)}
                  >
                    <Trash2 className="h-3 w-3 trash-icon" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
