'use client';

import * as React from 'react';
import { useActionState, useEffect } from 'react';
import { analyzeIngredients, type FormState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { IngredientForm } from '@/components/ingredient-form';
import { ResultsDisplay } from '@/components/results-display';
import { LoadingAnimation } from './loading-animation';
import { Logo } from './icons';

const initialState: FormState = { type: 'initial' };

export function IngredientAnalysis() {
  const [state, formAction, isPending] = useActionState(analyzeIngredients, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.type === 'error' && state.message) {
      toast({
        variant: 'destructive',
        title: 'Analysis Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  const showWelcome = !isPending && state.type === 'initial';
  const showResults = state.type === 'success' && state.data;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto p-4 w-full">
        <div className="w-full max-w-4xl mx-auto">
          {isPending && (
            <div className="flex h-full items-center justify-center">
              <LoadingAnimation />
            </div>
          )}

          {showWelcome && (
            <div className="flex h-full flex-col items-center justify-center text-center -mt-16">
                <Logo className="h-20 w-20 text-accent" />
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-400 mt-4">
                    How can I help you today?
                </h1>
            </div>
          )}

          {showResults && <ResultsDisplay data={state.data} onReset={() => {}} />}
        </div>
      </div>

      <div className="p-4 w-full">
         <div className="w-full max-w-4xl mx-auto">
            <IngredientForm formAction={formAction} isPending={isPending} />
         </div>
      </div>
    </div>
  );
}
