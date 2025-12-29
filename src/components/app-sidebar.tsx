'use client';

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from '@/components/ui/sidebar';
import { Bot, MessageSquarePlus, Trash2, MessageSquare, User, LogOut } from 'lucide-react';
import { useSidebar } from './ui/sidebar';
import { useChat } from '@/hooks/useChat';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { useUser, SignOutButton } from '@clerk/nextjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppSidebarProps {
  onSessionSelect: (sessionId: number | null) => void;
  currentSessionId: number | null;
  showIngredientAnalysis: boolean;
  onShowIngredientAnalysis: (show: boolean) => void;
}

export function AppSidebar({ 
  onSessionSelect, 
  currentSessionId, 
  showIngredientAnalysis, 
  onShowIngredientAnalysis 
}: AppSidebarProps) {
  const { open, setOpen, isMobile } = useSidebar();
  const { sessions, loading, deleteSession } = useChat();
  const { user } = useUser();

  const handleSessionClick = (sessionId: number) => {
    onSessionSelect(sessionId);
    onShowIngredientAnalysis(false);
  };

  const handleNewAnalysis = () => {
    onSessionSelect(null);
    onShowIngredientAnalysis(true);
  };

  const handleDeleteSession = async (sessionId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteSession(sessionId);
      if (currentSessionId === sessionId) {
        // Show ingredient analysis after deleting current session
        handleNewAnalysis();
      }
    } catch (error) {
      console.error('Failed to delete session:', error);
    }
  };

  return (
    <>
      <div className="absolute top-4 left-4 z-20 md:hidden">
        <SidebarTrigger />
      </div>
      <Sidebar className="sidebar-neon">
        <SidebarContent>
          <SidebarHeader className="pt-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="h-8 w-8 text-primary neon-text" />
                <h1 className="text-xl font-bold tracking-tight leading-none">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">Tatva</span>
                  <span className="text-white ml-1">.ai</span>
                </h1>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full text-primary hover:bg-primary/10">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.imageUrl} alt={user?.firstName || "User"} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-morphism border border-primary/20" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-foreground">
                        {user?.firstName || "User"}
                      </p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user?.emailAddresses[0]?.emailAddress}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <SignOutButton>
                      <button className="w-full flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarHeader>
          
          <div className="p-4 space-y-2">
            <Button 
              onClick={handleNewAnalysis}
              className={`w-full ${showIngredientAnalysis ? 'neon-button' : 'neon-border'}`}
              variant={showIngredientAnalysis ? "default" : "outline"}
            >
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              New Analysis
            </Button>
          </div>
          
          <ScrollArea className="flex-1 px-3 neon-scrollbar">
            <div className="space-y-2 pb-4">
              {loading ? (
                <div className="text-center text-muted-foreground text-sm">Loading chats...</div>
              ) : !Array.isArray(sessions) || sessions.length === 0 ? (
                <div className="text-center text-muted-foreground text-sm">No chat history yet</div>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`group relative rounded-lg border p-3 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                      !showIngredientAnalysis && currentSessionId === session.id 
                        ? 'neon-border bg-primary/10' 
                        : 'glass-morphism hover:bg-primary/5'
                    }`}
                    onClick={() => handleSessionClick(session.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex min-w-0 flex-1 flex-col pr-8">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-primary flex-shrink-0" />
                          <h3 className="text-sm font-medium text-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                            {session.title}
                          </h3>
                        </div>
                        
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground flex-shrink-0">
                            {formatDistanceToNow(new Date(session.updated_at), { addSuffix: true })}
                          </span>
                          <span className="text-xs text-primary flex-shrink-0">
                            {session.message_count} msgs
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/20 flex-shrink-0"
                        onClick={(e) => handleDeleteSession(session.id, e)}
                      >
                        <Trash2 className="h-3 w-3 text-white" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
