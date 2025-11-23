'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getMovieDetailsAction } from '@/app/actions';
import type { Recommendation, QuestionnaireData, MovieDetails } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Film, MessageCircle, Star, Users, Youtube, Clapperboard } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { getStreamingIcon } from './streaming-icons';

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
                    <div className="flex items-center gap-4 text-amber-400 mb-4">
                      <div className="flex items-center gap-1.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 fill-current text-red-600"><path d="M10.3 2.2c-.1-.3-.4-.5-.8-.5s-.7.2-.8.5L4 8.3c-.2.3-.2.7 0 1l4.9 6.3c.2.2.5.3.8.3s.6-.1.8-.3l4.9-6.3c.2-.3.2-.7 0-1L10.3 2.2Z"/><path d="m9.2 2.6 4.9 6.3c.2.3.2.7 0 1L9.2 16.2"/><path d="M4.4 8.8 9.2 2.6"/><path d="m15.6 8.8-4.9-6.3"/></svg>
                          <span className="font-bold text-lg text-foreground">{movie.rottenTomatoesRating}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 fill-current text-yellow-500"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                          <span className="font-bold text-lg text-foreground">{movie.imdbRating}</span>
                      </div>
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
                            <div className="space-y-2">
                                <div>
                                    <p className="font-bold">Cast:</p>
                                    <p>{details.castAndCrew.cast.join(', ')}</p>
                                </div>
                                <div>
                                    <p className="font-bold">Director:</p>
                                    <p>{details.castAndCrew.director.join(', ')}</p>
                                </div>
                                <div>
                                    <p className="font-bold">Studio:</p>
                                    <p>{details.castAndCrew.studio}</p>
                                </div>
                            </div>
                        </DetailSection>

                        <DetailSection icon={<ExternalLink className="w-5 h-5"/>} title="Where to Watch">
                             <div className="flex flex-wrap gap-4 items-center">
                                {details.streamingAvailability.length > 0 ? (
                                    details.streamingAvailability.map(platform => {
                                        const Icon = getStreamingIcon(platform);
                                        return Icon ? <Icon key={platform} /> : <span key={platform} className="text-sm">{platform}</span>;
                                    })
                                ) : (
                                    <p className="text-sm text-muted-foreground">Not available for streaming.</p>
                                )}
                            </div>
                        </DetailSection>
                    </>
                )
                )}
            </div>
        </div>
    </ScrollArea>
  );
}
