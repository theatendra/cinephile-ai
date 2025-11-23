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
  genres: z.array(z.string()).describe('The genres of the movie.'),
  actors: z.array(z.string()).describe('The main actors in the movie.'),
  directors: z.array(z.string()).describe('The directors of the movie.'),
  themes: z.array(z.string()).describe('The themes present in the movie.'),
  vibe: z.string().describe('The current vibe of the user.'),
  timePeriod: z.string().describe('The preferred time period of the user.'),
  summary: z.string().describe('A short summary of the movie.'),
  ratings: z.number().describe('The average rating of the movie.'),
});
export type DisplayDetailedMovieInformationInput = z.infer<
  typeof DisplayDetailedMovieInformationInputSchema
>;

const DisplayDetailedMovieInformationOutputSchema = z.object({
  summary: z.string().describe('A short summary of the movie.'),
  personalizedRecommendation: z
    .string()
    .describe('A personalized reason why the user will like the movie.'),
  redditComment: z.string().describe('A relevant Reddit comment about the movie.'),
  castDetails: z.string().describe('Details about the cast of the movie.'),
  streamingAvailability: z.string().describe('Where the movie is available to stream.'),
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
  prompt: `You are an AI movie expert. Given the following movie details and user preferences, provide a personalized recommendation, a relevant Reddit comment, cast details, streaming availability, and a trailer search link.\n\nMovie Details:\nTitle: {{{title}}}\nYear: {{{year}}}\nGenres: {{#each genres}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\nActors: {{#each actors}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\nDirectors: {{#each directors}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\nThemes: {{#each themes}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\nSummary: {{{summary}}}\nRatings: {{{ratings}}}\n\nUser Preferences:\nVibe: {{{vibe}}}\nTime Period: {{{timePeriod}}}\n\nProvide the following information:\n- A personalized recommendation (personalizedRecommendation) explaining why the user will like the movie based on their preferences.\n- A relevant Reddit comment (redditComment) about the movie. If no relevant comment exists, make one up.\n- Cast details (castDetails) formatted as: "cast [comma-separated list of main actors] and [director's name] and [studio name]".\n- Streaming availability (streamingAvailability) - list where the movie is available to stream, if known. If not known say "Streaming availability not available".\n- A trailer search link (trailerSearchLink) to search for the movie trailer on YouTube using the movie title and year. Start the search with "https://www.youtube.com/results?search_query=".\n\n\nOutput the result as JSON:
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
