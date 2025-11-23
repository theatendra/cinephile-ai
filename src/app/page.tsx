'use client';

import { useState, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Film, Mail } from 'lucide-react';
import { getRecommendationsAction } from '@/app/actions';
import { QuestionnaireForm } from '@/components/questionnaire-form';
import { SubscriptionForm } from '@/components/subscription-form';
import { RecommendationCard } from '@/components/recommendation-card';
import { RecommendationDetails } from '@/components/recommendation-details';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import type { Recommendation, QuestionnaireData } from '@/lib/types';

const formSchema = z.object({
  genres: z.string().min(1, 'Please select at least one genre.'),
  actors: z.string().optional(),
  directors: z.string().optional(),
  themes: z.string().optional(),
  vibe: z.string().min(1, 'Please describe your current vibe.'),
  timePeriod: z.string().optional(),
});

const initialState: {
  recommendations: Recommendation[] | null;
  userPreferences: QuestionnaireData | null;
  error: string | null;
} = {
  recommendations: null,
  userPreferences: null,
  error: null,
};

export default function Home() {
  const [state, formAction, pending] = useActionState(getRecommendationsAction, initialState);
  const [selectedMovie, setSelectedMovie] = useState<Recommendation | null>(null);
  
  const recommendations = state?.recommendations;
  const userPreferences = state?.userPreferences;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      genres: '',
      actors: '',
      directors: '',
      themes: '',
      vibe: '',
      timePeriod: '',
    },
  });

  useEffect(() => {
    if (userPreferences) {
      form.reset(userPreferences);
    }
  }, [userPreferences, form.reset]);


  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-10">
        <h1 className="font-headline text-5xl md:text-6xl text-center flex items-center justify-center gap-4">
          <Film className="w-12 h-12 text-primary" />
          ReelMind
        </h1>
        <p className="text-center text-muted-foreground mt-2 text-lg">Your personal AI movie curator.</p>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section id="questionnaire" className="mb-16">
          <QuestionnaireForm formAction={formAction} pending={pending} error={state?.error} form={form} />
        </section>

        {pending && (
          <section id="recommendations-loading">
             <h2 className="font-headline text-4xl text-center mb-8">Finding suitable films for you...</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Skeleton className="h-[520px] w-full rounded-lg" />
                <Skeleton className="h-[520px] w-full rounded-lg" />
                <Skeleton className="h-[520px] w-full rounded-lg" />
             </div>
          </section>
        )}

        {recommendations && recommendations.length > 0 && !pending && (
          <section id="recommendations" className="animate-in fade-in-50 duration-500">
            <h2 className="font-headline text-4xl text-center mb-8">Here's What We Found For You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.map((rec, index) => (
                <RecommendationCard key={index} movie={rec} onSelectMovie={setSelectedMovie} index={index}/>
              ))}
            </div>
          </section>
        )}

        <Dialog open={!!selectedMovie} onOpenChange={(isOpen) => !isOpen && setSelectedMovie(null)}>
          <DialogContent className="max-w-3xl w-full max-h-[90vh] p-0">
            {selectedMovie && userPreferences && (
              <RecommendationDetails movie={selectedMovie} userPreferences={userPreferences} />
            )}
          </DialogContent>
        </Dialog>
      </main>

      <footer className="w-full py-12 bg-card/50 mt-16">
        <div className="container mx-auto px-4 text-center">
            <Mail className="w-10 h-10 mx-auto text-primary mb-4" />
            <h3 className="font-headline text-3xl mb-2">Get Weekly Picks</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">Subscribe to get AI-curated movie recommendations delivered to your inbox every week.</p>
            <SubscriptionForm />
        </div>
      </footer>
    </div>
  );
}
