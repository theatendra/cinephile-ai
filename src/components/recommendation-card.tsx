'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Recommendation } from '@/lib/types';

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
        <CardTitle className="font-headline text-2xl">{movie.title}</CardTitle>
        <p className="text-muted-foreground">{movie.year}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex items-center gap-2 text-amber-400">
          <Star className="w-5 h-5 fill-current" />
          <span className="font-bold text-lg text-foreground">{movie.ratings}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
