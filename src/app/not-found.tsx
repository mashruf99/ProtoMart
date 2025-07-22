import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] text-center px-4">
      <AlertTriangle className="h-24 w-24 text-destructive mb-6" />
      <h1 className="text-5xl font-bold mb-4 text-primary font-headline">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        Oops! The page you're looking for doesn't seem to exist. It might have been moved or deleted.
      </p>
      <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
        <Link href="/">Return to Homepage</Link>
      </Button>
    </div>
  )
}
