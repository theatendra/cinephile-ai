'use server';

import {
  generatePersonalizedRecommendations,
  type PersonalizedRecommendationsInput,
  type PersonalizedRecommendationsOutput,
} from '@/ai/flows/generate-personalized-recommendations';
import {
  displayDetailedMovieInformation,
  type DisplayDetailedMovieInformationInput,
  type DisplayDetailedMovieInformationOutput,
} from '@/ai/flows/display-detailed-movie-information';
import type { Recommendation, QuestionnaireData } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export async function getRecommendationsAction(
  prevState: any,
  formData: FormData
): Promise<{
  recommendations: Recommendation[] | null;
  userPreferences: QuestionnaireData | null;
  error: string | null;
}> {
  try {
    const userInput: PersonalizedRecommendationsInput = {
      genres: formData.get('genres') as string || '',
      actors: formData.get('actors') as string,
      directors: formData.get('directors') as string,
      themes: formData.get('themes') as string,
      vibe: formData.get('vibe') as string,
      timePeriod: formData.get('timePeriod') as string,
    };

    if (!userInput.genres) {
      return {
        recommendations: null,
        userPreferences: userInput,
        error: 'Please select at least one genre.',
      }
    }

    const aiResult: PersonalizedRecommendationsOutput =
      await generatePersonalizedRecommendations(userInput);

    const recommendationsWithPlaceholders = aiResult.recommendations.map((rec, index) => ({
      ...rec,
      poster: PlaceHolderImages[index % PlaceHolderImages.length]?.imageUrl || rec.poster,
    }));

    return {
      recommendations: recommendationsWithPlaceholders,
      userPreferences: userInput,
      error: null,
    };
  } catch (e: any) {
    console.error(e);
    return {
      recommendations: null,
      userPreferences: {
        genres: formData.get('genres') as string || '',
        actors: formData.get('actors') as string || '',
        directors: formData.get('directors') as string || '',
        themes: formData.get('themes') as string || '',
        vibe: formData.get('vibe') as string || '',
        timePeriod: formData.get('timePeriod') as string || '',
      },
      error: e.message || 'Failed to generate recommendations.',
    };
  }
}

export async function getMovieDetailsAction(
  movie: Recommendation,
  userPreferences: QuestionnaireData
): Promise<DisplayDetailedMovieInformationOutput> {
  try {
    const input: DisplayDetailedMovieInformationInput = {
      title: movie.title,
      year: parseInt(movie.year, 10) || new Date().getFullYear(),
      imdbRating: movie.imdbRating,
      rottenTomatoesRating: movie.rottenTomatoesRating,
      genres: userPreferences.genres ? userPreferences.genres.split(',').map(g => g.trim()) : [],
      actors: userPreferences.actors ? userPreferences.actors.split(',').map(a => a.trim()) : [],
      directors: userPreferences.directors ? userPreferences.directors.split(',').map(d => d.trim()) : [],
      themes: userPreferences.themes ? userPreferences.themes.split(',').map(t => t.trim()) : [],
      vibe: userPreferences.vibe,
      timePeriod: userPreferences.timePeriod,
      summary: 'Awaiting summary...',
    };

    const details = await displayDetailedMovieInformation(input);
    return details;
  } catch (e) {
    console.error(e);
    // Fallback response in case of an error
    return {
        summary: 'Could not load movie details.',
        personalizedRecommendation: 'An error occurred while fetching personalized information.',
        redditComment: 'N/A',
        castAndCrew: {
            cast: [],
            director: [],
            studio: 'N/A',
        },
        streamingAvailability: [],
        trailerSearchLink: `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' ' + movie.year + ' trailer')}`,
    };
  }
}
