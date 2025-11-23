'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getMovieDetailsAction } from '@/app/actions';
import type { Recommendation, QuestionnaireData, MovieDetails } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Film, MessageCircle, Star, Users, Youtube } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';

type RecommendationDetailsProps = {
  movie: Recommendation;
  userPreferences: QuestionnaireData;
};

const DetailSection = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="mb-6">
        <h3 className="font-headline text-xl mb-2 flex items-center gap-2 text-primary">
            {icon}
            {title}
        </h3>
        <Card className="bg-background/50 border-border/50">
            <CardContent className="p-4 text-sm text-foreground/80">
                {children}
            </CardContent>
        </Card>
    </div>
);


export function RecommendationDetails({ movie, userPreferences }: RecommendationDetailsProps) {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setDetails(null);
    getMovieDetailsAction(movie, userPreferences)
      .then((data) => {
        setDetails(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [movie, userPreferences]);

  return (
    <ScrollArea className="max-h-[90vh]">
        <div className="grid md:grid-cols-3 gap-6 p-6">
            <div className="md:col-span-1">
                <div className="sticky top-6">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-4 shadow-lg">
                    <Image src={movie.poster} alt={`Poster for ${movie.title}`} fill className="object-cover" data-ai-hint="movie poster" />
                    </div>
                    <h2 className="font-headline text-3xl">{movie.title}</h2>
                    <p className="text-muted-foreground text-lg mb-2">{movie.year}</p>
                    <div className="flex items-center gap-2 text-amber-400 mb-4">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-bold text-lg text-foreground">{movie.ratings}</span>
                    </div>
                    {loading ? (
                        <Skeleton className="h-10 w-full" />
                    ) : (
                        details && (
                            <Button asChild className='w-full bg-red-600 hover:bg-red-700 text-white'>
                                <Link href={details.trailerSearchLink} target="_blank" rel="noopener noreferrer">
                                    <Youtube className="mr-2 h-4 w-4" />
                                    Watch Trailer
                                </Link>
                            </Button>
                        )
                    )}
                </div>
            </div>

            <div className="md:col-span-2">
                {loading ? (
                <div className="space-y-6">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-16 w-full" />
                </div>
                ) : (
                details && (
                    <>
                        <DetailSection icon={<Star className="w-5 h-5"/>} title="Why You'll Like It">
                            <p>{details.personalizedRecommendation}</p>
                        </DetailSection>

                        <DetailSection icon={<Film className="w-5 h-5"/>} title="Summary">
                            <p>{details.summary}</p>
                        </DetailSection>

                        <DetailSection icon={<MessageCircle className="w-5 h-5"/>} title="From The Web">
                            <p className="italic">"{details.redditComment}"</p>
                        </DetailSection>

                        <DetailSection icon={<Users className="w-5 h-5"/>} title="Cast & Crew">
                            <p>{details.castDetails}</p>
                        </DetailSection>

                        <DetailSection icon={<ExternalLink className="w-5 h-5"/>} title="Where to Watch">
                            <Badge variant="secondary">{details.streamingAvailability}</Badge>
                        </DetailSection>
                    </>
                )
                )}
            </div>
        </div>
    </ScrollArea>
  );
}
