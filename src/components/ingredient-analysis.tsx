'use client';

import * as React from 'react';
import { useActionState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <div className="flex h-full w-full items-center justify-center main-content-bg mt-8 perspective-1000 relative overflow-hidden">
      {/* Enhanced food-themed background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Decorative food illustrations */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 opacity-20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Spoon */}
            <ellipse cx="50" cy="30" rx="15" ry="20" fill="#ff8533" opacity="0.6" />
            <rect x="45" y="45" width="10" height="45" rx="5" fill="#ff8533" opacity="0.6" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute top-40 right-20 w-24 h-24 opacity-20"
          animate={{
            y: [0, 18, 0],
            rotate: [0, -8, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Bowl */}
            <path
              d="M20 40 Q 20 70, 50 80 Q 80 70, 80 40 L 20 40 Z"
              fill="#6fad3d"
              opacity="0.5"
            />
            <ellipse cx="50" cy="40" rx="30" ry="8" fill="#6fad3d" opacity="0.6" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-1/4 w-16 h-16 opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Leaf */}
            <path
              d="M50 10 Q 75 30, 80 55 Q 80 75, 65 85 Q 50 90, 50 90 Q 50 90, 35 85 Q 20 75, 20 55 Q 25 30, 50 10 Z"
              fill="#6fad3d"
              opacity="0.5"
            />
          </svg>
        </motion.div>

        {/* Additional decorative elements */}
        <motion.div
          className="absolute top-1/3 right-10 w-20 h-20 opacity-15"
          animate={{
            y: [0, 12, 0],
            x: [0, 5, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Carrot */}
            <path
              d="M50 20 L 45 80 Q 50 85, 55 80 L 50 20 Z"
              fill="#ff8533"
              opacity="0.6"
            />
            <path d="M50 15 L 45 25 M50 15 L 55 25 M50 15 L 50 25" stroke="#6fad3d" strokeWidth="2" opacity="0.6" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/3 w-18 h-18 opacity-15"
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Tomato */}
            <circle cx="50" cy="55" r="25" fill="#f26d4f" opacity="0.6" />
            <path d="M45 30 Q 50 25, 55 30" stroke="#6fad3d" strokeWidth="3" fill="none" opacity="0.6" />
          </svg>
        </motion.div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="food-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#ff8533" />
                <circle cx="60" cy="60" r="2" fill="#6fad3d" />
                <circle cx="80" cy="30" r="2" fill="#f26d4f" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#food-pattern)" />
          </svg>
        </div>
      </div>

      <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-8 px-4 text-center relative z-10">
        <motion.div
          className="flex flex-col items-center gap-4 relative z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold tracking-tight leading-tight pb-2"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: 'hsl(25, 30%, 15%)',
              lineHeight: '1.1'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Know What's On Your Plate
          </motion.h1>
          <motion.p
            className="max-w-md text-lg leading-relaxed"
            style={{ color: 'hsl(25, 20%, 35%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Decode your food ingredients with AI. Get clear, honest insights about what you're really eating.
          </motion.p>
        </motion.div>
        <IngredientForm formAction={formAction} isPending={isPending} />
      </div>
    </div>
  );
}
