'use client';

import { useState, useEffect } from 'react';
import { IngredientAnalysis } from '@/components/ingredient-analysis';
import { ChatInterface } from '@/components/chat-interface';
import { CylindricalNavbar } from '@/components/cylindrical-navbar';
import { Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { AnimatedDotsBackground } from '@/components/animated-dots-background';
import { SubscriptionPage } from '@/components/subscription-page';
import { useChat } from '@/hooks/useChat';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const [showIngredientAnalysis, setShowIngredientAnalysis] = useState(true);
  const [showSubscription, setShowSubscription] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { sessions, loadSession } = useChat();

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect('/sign-in');
    }
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    // Auto-select first chat session if available and not showing ingredient analysis
    if (!showIngredientAnalysis && !currentSessionId && Array.isArray(sessions) && sessions.length > 0) {
      setCurrentSessionId(sessions[0].id);
      loadSession(sessions[0].id);
    }
  }, [sessions, currentSessionId, showIngredientAnalysis, loadSession]);

  const handleSessionSelect = (sessionId: number | null) => {
    setCurrentSessionId(sessionId);
    if (sessionId) {
      loadSession(sessionId);
    }
  };

  const handleAnalysisComplete = (sessionId: number) => {
    setCurrentSessionId(sessionId);
    setShowIngredientAnalysis(false);
    loadSession(sessionId);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    
    // Handle navigation based on section
    switch (section) {
      case 'home':
        setShowIngredientAnalysis(true);
        setCurrentSessionId(null);
        break;
      case 'analysis':
        setShowIngredientAnalysis(true);
        setCurrentSessionId(null);
        break;
      case 'history':
        setShowIngredientAnalysis(false);
        if (Array.isArray(sessions) && sessions.length > 0 && !currentSessionId) {
          setCurrentSessionId(sessions[0].id);
          loadSession(sessions[0].id);
        }
        break;
      case 'subscription':
        setShowIngredientAnalysis(false);
        setShowSubscription(true);
        setCurrentSessionId(null);
        break;
      case 'search':
        // Add search functionality later
        break;
      case 'settings':
        // Add settings functionality later
        break;
    }
  };

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="flex h-dvh w-full items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not signed in (will redirect)
  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <AnimatedDotsBackground>
        <div className="flex h-dvh w-full bg-transparent relative z-10">
          <AppSidebar 
            onSessionSelect={handleSessionSelect}
            currentSessionId={currentSessionId}
            showIngredientAnalysis={showIngredientAnalysis}
            onShowIngredientAnalysis={setShowIngredientAnalysis}
          />
          <SidebarInset>
            <main className="flex-1 h-dvh">
              {showSubscription ? (
                <SubscriptionPage />
              ) : showIngredientAnalysis ? (
                <IngredientAnalysis onAnalysisComplete={handleAnalysisComplete} />
              ) : currentSessionId ? (
                <div className="h-full chat-black-bg">
                  <ChatInterface sessionId={currentSessionId} />
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4 neon-text">Select a chat</h2>
                    <p className="text-muted-foreground">Choose a chat from the sidebar or start a new conversation</p>
                  </div>
                </div>
              )}
            </main>
          </SidebarInset>
        </div>
      </AnimatedDotsBackground>
      
      {/* Cylindrical Navigation Bar */}
      <CylindricalNavbar 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
    </>
  );
}
