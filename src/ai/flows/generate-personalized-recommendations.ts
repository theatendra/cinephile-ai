'use server';
/**
 * @fileOverview Flow to generate personalized movie recommendations based on user input.
 *
 * - generatePersonalizedRecommendations - A function that takes user preferences and returns movie recommendations.
 * - PersonalizedRecommendationsInput - The input type for the generatePersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the generatePersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  genres: z.string().optional().describe('List of favorite movie genres, comma separated.'),
  actors: z.string().optional().describe('List of favorite actors, comma separated.'),
  directors: z.string().optional().describe('List of favorite directors, comma separated.'),
  themes: z.string().optional().describe('List of favorite movie themes, comma separated.'),
  vibe: z.string().describe('Current mood or vibe the user is in.'),
  timePeriod: z.string().optional().describe('Preferred time period for movies.'),
});
export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const MovieRecommendationSchema = z.object({
  title: z.string().describe('Title of the movie.'),
  year: z.string().describe('Year the movie was released.'),
  poster: z.string().describe('URL of the movie poster.'),
  imdbRating: z.string().describe("The movie's rating on IMDb."),
  rottenTomatoesRating: z.string().describe("The movie's rating on Rotten Tomatoes."),
  vibe: z.string().describe('The overall vibe or mood of the film.'),
});

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(MovieRecommendationSchema).describe('List of movie recommendations.'),
});
export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function generatePersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return generatePersonalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `Given the following user preferences, generate three movie recommendations. If genres are not provided, rely primarily on the user's 'vibe'.

  Genres: {{{genres}}}
  Actors: {{{actors}}}
  Directors: {{{directors}}}
  Themes: {{{themes}}}
  Vibe: {{{vibe}}}
  Time Period: {{{timePeriod}}}

  Format the output as a JSON object with a 'recommendations' field. Each movie object in the 'recommendations' array should include the following keys: title, year, poster, imdbRating, rottenTomatoesRating, and vibe. Make sure the year is a string, not a number. If a rating isn't available, use "N/A".
  `,
});

const generatePersonalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
