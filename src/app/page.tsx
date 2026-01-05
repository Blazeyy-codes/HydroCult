'use client';

import { Droplets, Target, BarChart, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlantIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default function LandingPage() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/dashboard');
    }
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Top Navigation */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 shadow-sm">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Droplets className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">HYDROCULT</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={handleGetStarted}>Login</Button>
            <Button onClick={handleGetStarted}>Sign Up</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center mb-6">
              <PlantIcon progress={100} className="w-24 h-24 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Track Your Water. Stay Hydrated. Stay Healthy.
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Set daily goals, log intake, and celebrate your progress.
          </p>
          <Button size="lg" onClick={handleGetStarted}>Get Started</Button>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Target className="w-6 h-6" />}
              title="Set Your Daily Goal"
              description="Customize your daily hydration target to fit your personal needs and lifestyle."
            />
            <FeatureCard 
              icon={<BarChart className="w-6 h-6" />}
              title="Track Your Progress"
              description="Visualize your intake with beautiful charts and see how you stack up day-to-day."
            />
            <FeatureCard 
              icon={<Trophy className="w-6 h-6" />}
              title="Celebrate Milestones"
              description="Stay motivated by earning badges and celebrating your hydration streaks."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="hover:text-primary">About</a>
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Contact</a>
          </div>
          <p>&copy; {new Date().getFullYear()} Hydrocult. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
