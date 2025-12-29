'use client';

import * as React from 'react';
import { useActionState, useEffect } from 'react';
import { analyzeIngredients, type FormState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { IngredientForm } from '@/components/ingredient-form';
import { ResultsDisplay } from '@/components/results-display';
import { LoadingAnimation } from './loading-animation';
import { ScrollArea } from './ui/scroll-area';
import { useChat } from '@/hooks/useChat';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const initialState: FormState = { type: 'initial' };

interface IngredientAnalysisProps {
  onAnalysisComplete?: (sessionId: number) => void;
}

export function IngredientAnalysis({ onAnalysisComplete }: IngredientAnalysisProps) {
  const [state, formAction, isPending] = useActionState(analyzeIngredients, initialState);
  const { toast } = useToast();
  const { createNewSession, addMessage } = useChat();
  const [currentSessionId, setCurrentSessionId] = React.useState<number | null>(null);

  useEffect(() => {
    if (state.type === 'error' && state.message) {
      toast({
        variant: 'destructive',
        title: 'Analysis Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  const handleContinueChat = async () => {
    if (!state.data) return;
    
    try {
      // Create a new chat session for this analysis
      const session = await createNewSession('Ingredient Analysis');
      setCurrentSessionId(session.id);
      
      // Add the analysis as the first message
      const analysisText = formatAnalysisAsMessage(state.data);
      await addMessage(session.id, 'assistant', analysisText);
      
      // Notify parent component
      if (onAnalysisComplete) {
        onAnalysisComplete(session.id);
      }
    } catch (error) {
      console.error('Failed to create chat session:', error);
    }
  };

  const formatAnalysisAsMessage = (data: any): string => {
    let message = '**Ingredient Analysis Results**\n\n';
    
    if (data.summary) {
      message += `**Summary:** ${data.summary}\n\n`;
    }
    
    if (data.highlights && data.highlights.length > 0) {
      message += '**Key Ingredients to Watch:**\n';
      data.highlights.forEach((highlight: any, index: number) => {
        message += `\n${index + 1}. **${highlight.ingredient}** (${highlight.confidence} confidence)\n`;
        message += `   ${highlight.reason}\n`;
      });
      message += '\n';
    }
    
    if (data.suggestedActions && data.suggestedActions.length > 0) {
      message += '**Suggested Actions:**\n';
      data.suggestedActions.forEach((action: string, index: number) => {
        message += `\n${index + 1}. ${action}`;
      });
      message += '\n';
    }
    
    if (data.uncertaintyNote) {
      message += `\n**Note:** ${data.uncertaintyNote}\n`;
    }
    
    message += '\n---\n\nYou can ask me follow-up questions about these ingredients or get more specific advice!';
    
    return message;
  };

  const showWelcome = !isPending && state.type === 'initial';
  const showResults = state.type === 'success' && state.data;
  
  const handleReset = () => {
    setCurrentSessionId(null);
    window.location.reload();
  }

  if (isPending) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  if (showResults) {
    return (
      <ScrollArea className="h-full w-full">
        <div className="p-6 main-content-bg min-h-full">
          <ResultsDisplay data={state.data!} onReset={handleReset} />
          <div className="mt-6 flex gap-3">
            <Button 
              onClick={handleContinueChat}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Continue Chat
            </Button>
            <Button 
              variant="outline" 
              onClick={handleReset}
            >
              New Analysis
            </Button>
          </div>
        </div>
      </ScrollArea>
    );
  }
  
  return (
    <div className="flex h-full w-full items-center justify-center main-content-bg mt-8">
        <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-8 px-4 text-center">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight neon-text bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent leading-tight pb-4">
                    Understand what you're eating.
                </h1>
                <p className="max-w-md text-gray-500">
                    Upload a food label or paste ingredients to get a clear explanation.
                </p>
            </div>
            <IngredientForm formAction={formAction} isPending={isPending} />
        </div>
    </div>
  );
}
