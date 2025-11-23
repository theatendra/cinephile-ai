'use server';

/**
 * @fileOverview Retrieves and formats detailed movie information including a summary, personalized recommendation, Reddit comment, cast, streaming options, and trailer link.
 *
 * - displayDetailedMovieInformation - A function that retrieves and formats detailed movie information.
 * - DisplayDetailedMovieInformationInput - The input type for the displayDetailedMovieInformation function.
 * - DisplayDetailedMovieInformationOutput - The return type for the displayDetailedMovieInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DisplayDetailedMovieInformationInputSchema = z.object({
  title: z.string().describe('The title of the movie.'),
  year: z.number().describe('The year the movie was released.'),
  actors: z.array(z.string()).describe('The main actors in the movie.'),
  directors: z.array(z.string()).describe('The directors of the movie.'),
  themes: z.array(z.string()).describe('The themes present in the movie.'),
  vibe: z.string().describe('The current vibe of the user.'),
  timePeriod: z.string().describe('The preferred time period of the user.'),
  summary: z.string().describe('A short summary of the movie.'),
  imdbRating: z.string().describe("The movie's rating on IMDb."),
  rottenTomatoesRating: z.string().describe("The movie's rating on Rotten Tomatoes."),
});
export type DisplayDetailedMovieInformationInput = z.infer<
  typeof DisplayDetailedMovieInformationInputSchema
>;

const CastCrewDetailsSchema = z.object({
    cast: z.array(z.string()).describe("A list of the main actors in the movie."),
    director: z.array(z.string()).describe("The director(s) of the movie."),
    studio: z.string().describe("The production studio of the movie."),
});


const DisplayDetailedMovieInformationOutputSchema = z.object({
  summary: z.string().describe('A short summary of the movie.'),
  personalizedRecommendation: z
    .string()
    .describe('A personalized reason why the user will like the movie.'),
  redditComment: z.string().describe('A relevant Reddit comment about the movie.'),
  castAndCrew: CastCrewDetailsSchema.describe("Details about the movie's cast, director, and studio."),
  streamingAvailability: z.array(z.string()).describe('A list of platforms where the movie is available to stream (e.g., "Netflix", "Hulu", "Amazon Prime Video"). If not known, return an empty array.'),
  trailerSearchLink: z.string().describe('A link to search for the movie trailer.'),
});
export type DisplayDetailedMovieInformationOutput = z.infer<
  typeof DisplayDetailedMovieInformationOutputSchema
>;

export async function displayDetailedMovieInformation(
  input: DisplayDetailedMovieInformationInput
): Promise<DisplayDetailedMovieInformationOutput> {
  return displayDetailedMovieInformationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'displayDetailedMovieInformationPrompt',
  input: {schema: DisplayDetailedMovieInformationInputSchema},
  output: {schema: DisplayDetailedMovieInformationOutputSchema},
  prompt: `You are an AI movie expert. Given the following movie details and user preferences, provide a personalized recommendation, a relevant Reddit comment, structured cast and crew details, streaming availability, and a trailer search link.\n\nMovie Details:\nTitle: {{{title}}}\nYear: {{{year}}}\nActors from user: {{#each actors}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\nDirectors from user: {{#each directors}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\nThemes: {{#each themes}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\nIMDb Rating: {{{imdbRating}}}\nRotten Tomatoes Rating: {{{rottenTomatoesRating}}}\n\nUser Preferences:\nVibe: {{{vibe}}}\nTime Period: {{{timePeriod}}}\n\nProvide the following information:\n- A personalized recommendation (personalizedRecommendation) explaining why the user will like the movie based on their preferences.\n- A relevant Reddit comment (redditComment) about the movie. If no relevant comment exists, make one up.\n- Structured cast and crew details (castAndCrew) with 'cast', 'director', and 'studio' fields. Find the actual main cast, director, and studio for the movie.\n- A list of streaming platforms (streamingAvailability). Common values are "Netflix", "Hulu", "Amazon Prime Video", "Disney+", "Max". If unknown, return an empty array.\n- A trailer search link (trailerSearchLink) to search for the movie trailer on YouTube using the movie title and year. Start the search with "https://www.youtube.com/results?search_query=".\n\n\nOutput the result as JSON:
`,
});

const displayDetailedMovieInformationFlow = ai.defineFlow(
  {
    name: 'displayDetailedMovieInformationFlow',
    inputSchema: DisplayDetailedMovieInformationInputSchema,
    outputSchema: DisplayDetailedMovieInformationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
