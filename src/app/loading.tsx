import { Film, Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground">
      <div className="flex items-center gap-4 mb-4">
        <Film className="w-12 h-12 text-primary" />
        <h1 className="font-headline text-5xl md:text-6xl text-center">
          CinePhile
        </h1>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <p>Loading your experience...</p>
      </div>
    </div>
  );
}
