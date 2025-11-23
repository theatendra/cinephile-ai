export type Recommendation = {
  title: string;
  year: string;
  poster: string;
  imdbRating: string;
  rottenTomatoesRating: string;
  vibe: string;
};

export type MovieDetails = {
  summary: string;
  personalizedRecommendation: string;
  redditComment: string;
  castAndCrew: {
    cast: string[];
    director: string[];
    studio: string;
  };
  streamingAvailability: string[];
  trailerSearchLink: string;
};

export type QuestionnaireData = {
  actors: string;
  directors: string;
  themes: string;
  vibe: string;
  timePeriod: string;
};
