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
  actors: z.string().optional().describe('List of favorite actors, comma separated.'),
  directors: z.string().optional().describe('List of favorite directors, comma separated.'),
  themes: z.string().optional().describe('List of themes the user enjoys in movies, comma separated.'),
  vibe: z.string().describe('Current mood or vibe the user is in.'),
  timePeriod: z.string().optional().describe('Preferred time period for movies.'),
});
export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const MovieRecommendationSchema = z.object({
  title: z.string().describe('Title of the movie.'),
  year: z.string().describe('Year the movie was released.'),
  poster: z.string().describe('URL of the movie poster. Use a placeholder if you cannot find one.'),
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
  prompt: `You are a movie recommendation expert. Your task is to generate three movie recommendations based on user preferences.

User Preferences:
- Vibe: {{{vibe}}}
- Actors: {{{actors}}}
- Directors: {{{directors}}}
- Themes: {{{themes}}}
- Time Period: {{{timePeriod}}}

Your recommendations MUST adhere to the following rules:
1. Rely primarily on the user's 'vibe' to make your selections.
2. If the user provides themes, you MUST strictly recommend movies that fit those themes. For example, if they say 'romance', only recommend romantic films. If they list multiple themes, the recommendations should reflect all of them.
3. Consider other preferences like actors, directors, and time period to refine the recommendations, but the vibe and themes are the most important factors.
4. For each recommended movie, provide a valid poster URL. It is acceptable to use a placeholder image URL if a real one cannot be found.

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
