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

const findPosterTool = ai.defineTool(
  {
    name: 'findPoster',
    description: 'Find the URL for a movie poster.',
    inputSchema: z.object({
      title: z.string().describe('The title of the movie.'),
    }),
    outputSchema: z.string().describe('The URL of the movie poster.'),
  },
  async ({title}) => {
    // In a real app, you would use a service like TMDB here with an API key.
    // For this example, we'll return a high-quality placeholder.
    const searchBase =
      'https://images.unsplash.com/photo-';
    const params =
      '?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx8ZW58MHx8fHwxNzYzNzkzODU4fDA&ixlib=rb-4.1.0&q=80&w=1080';

    if (title.toLowerCase().includes('dune')) {
      return `${searchBase}1678203395368-2c36a5356914${params}`;
    }
    if (title.toLowerCase().includes('blade runner')) {
      return `${searchBase}1508304922359-b9d454eb9b84${params}`;
    }
    return `${searchBase}1590179068383-b9c69aacebd3${params}`;
  }
);


const PersonalizedRecommendationsInputSchema = z.object({
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
  tools: [findPosterTool],
  prompt: `You are a movie recommendation expert. Your task is to generate three movie recommendations based on user preferences.

User Preferences:
- Vibe: {{{vibe}}}
- Actors: {{{actors}}}
- Directors: {{{directors}}}
- Themes: {{{themes}}}
- Time Period: {{{timePeriod}}}

Your recommendations MUST adhere to the following rules:
1. Rely primarily on the user's 'vibe' to make your selections.
2. Consider other preferences like actors, directors, and themes to refine the recommendations, but the vibe is the most important factor.
3. For each recommended movie, you MUST use the findPoster tool to get a valid URL for the movie poster.

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
