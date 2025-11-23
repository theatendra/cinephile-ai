'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clapperboard, Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';

const genresList = [
  'Sci-Fi',
  'Thriller',
  'Comedy',
  'Romance',
  'Action',
  'Horror',
  'Drama',
  'Fantasy',
  'Animation',
  'Documentary',
  'Mystery',
];

const formSchema = z.object({
  genres: z.string().min(1, 'Please select at least one genre.'),
  actors: z.string().optional(),
  directors: z.string().optional(),
  themes: z.string().optional(),
  vibe: z.string().min(1, 'Please describe your current vibe.'),
  timePeriod: z.string().optional(),
});

type QuestionnaireFormProps = {
  formAction: (payload: FormData) => void;
  pending: boolean;
  error: string | null;
};

export function QuestionnaireForm({ formAction, pending, error }: QuestionnaireFormProps) {
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

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-3xl flex items-center gap-3">
          <Clapperboard className="w-8 h-8 text-primary" />
          Find Your Next Movie
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="genres"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Favorite Genres</FormLabel>
                      <FormDescription>
                        Select all that apply.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {genresList.map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="genres"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    const currentGenres = field.value ? field.value.split(',').filter(g => g) : [];
                                    if (checked) {
                                      field.onChange([...currentGenres, item].join(','));
                                    } else {
                                      field.onChange(currentGenres.filter((value) => value !== item).join(','));
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vibe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What's the Vibe?</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Cozy night in, adventurous" {...field} />
                    </FormControl>
                     <FormDescription>
                      How are you feeling right now?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="actors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Favorite Actors (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Tom Hanks, Denzel Washington" {...field} name="actors" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="directors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Favorite Directors (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Christopher Nolan" {...field} name="directors"/>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="themes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Favorite Themes (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Underdog story, space exploration" {...field} name="themes"/>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timePeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Time Period (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 1990s, modern, black and white" {...field} name="timePeriod"/>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={pending} className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Get Recommendations'
              )}
            </Button>
            {error && <p className="text-destructive mt-4">{error}</p>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
