'use client';

import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

export function SubscriptionForm() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) return;
        
        setLoading(true);
        // Simulate network request for demo
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "Subscribed!",
                description: `You'll receive weekly recommendations at ${email}. (Demo mode)`,
            });
            setEmail('');
        }, 1000);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input 
                type="email" 
                placeholder="your@email.com" 
                className="flex-grow text-center sm:text-left bg-card" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
            />
            <Button type="submit" disabled={loading} className="bg-accent text-accent-foreground hover:bg-accent/90">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Subscribe'}
            </Button>
        </form>
    );
}
