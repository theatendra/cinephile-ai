'use client';

import Image from 'next/image';
import { Sparkles, Tv } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Recommendation } from '@/lib/types';
import { Badge } from './ui/badge';
import { rottenTomatoesIcon, imdbIcon } from './streaming-icons';

type RecommendationCardProps = {
  movie: Recommendation;
  onSelectMovie: (movie: Recommendation) => void;
  index: number;
};

export function RecommendationCard({ movie, onSelectMovie, index }: RecommendationCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col group animate-in fade-in-0 slide-in-from-top-4"
      onClick={() => onSelectMovie(movie)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardHeader className="p-0 relative aspect-[2/3]">
        <Image
          src={movie.poster}
          alt={`Poster for ${movie.title}`}
          fill
          className="object-cover group-hover:brightness-75 transition-all"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          data-ai-hint="movie poster"
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-2xl mb-2">{movie.title}</CardTitle>
        <p className="text-muted-foreground text-sm">{movie.year}</p>
        <div className="flex items-center gap-2 mt-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-sm text-muted-foreground font-semibold">{movie.vibe}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex-col items-start gap-3">
         <div className="flex items-center gap-4 text-foreground">
            <div className="flex items-center gap-1.5">
                {rottenTomatoesIcon}
                <span className="font-bold text-sm">{movie.rottenTomatoesRating}</span>
            </div>
             <div className="flex items-center gap-1.5">
                {imdbIcon}
                <span className="font-bold text-sm">{movie.imdbRating}</span>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
