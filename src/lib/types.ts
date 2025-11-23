export type Recommendation = {
  title: string;
  year: string;
  poster: string;
  ratings: string;
};

export type MovieDetails = {
  summary: string;
  personalizedRecommendation: string;
  redditComment: string;
  castDetails: string;
  streamingAvailability: string;
  trailerSearchLink: string;
};

export type QuestionnaireData = {
  genres: string;
  actors: string;
  directors: string;
  themes: string;
  vibe: string;
  timePeriod: string;
};
