'use client';

import * as React from 'react';
import { IngredientAnalysis } from '@/components/ingredient-analysis';
import { Sidebar, SidebarInset, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Bot, MessageSquarePlus, History } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar>
        <SidebarContent>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-accent" />
              <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-400">
                Ingredient AI
              </h1>
            </div>
          </SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <MessageSquarePlus />
                New Analysis
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="mt-4 p-2 text-sm font-medium text-neutral-400 flex items-center gap-2">
            <History className="h-4 w-4"/>
            <span>History</span>
          </div>
          {/* Placeholder for chat history */}
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <main className="flex-1 flex flex-col p-4 relative">
            <div className="absolute top-4 left-4">
                <SidebarTrigger />
            </div>
            <div className="flex-1 flex items-center justify-center">
                 <IngredientAnalysis />
            </div>
        </main>
      </SidebarInset>
    </div>
  );
}
