'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, Droplet, Zap, Target } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/firebase';

export default function LandingPage() {
  const { user } = useUser();
  
  return (
    <div className="min-h-screen bg-white text-gray-900 font-body">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Droplet className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">HydroCult</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#features" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              Features <ChevronDown className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Pricing
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Blog
            </a>
          </nav>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button variant="ghost" className="text-sm font-semibold" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-sm font-semibold" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button className="bg-gray-900 text-white hover:bg-gray-800 text-sm font-semibold rounded-full px-5 py-2.5" asChild>
                  <Link href="/signup">
                    Sign up <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold !leading-tight tracking-tighter">
              Track Your Water. <span className="text-blue-600">Stay Hydrated.</span> Stay Healthy.
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Set daily goals, log your water intake, and celebrate your progress with our simple and intuitive water tracking app.
            </p>
            <Button className="mt-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-semibold rounded-full px-8 py-6 flex items-center gap-2 group mx-auto" asChild>
              <Link href="/signup">
                Get Started for Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
           <div className="mt-16">
              <Image
                src="https://picsum.photos/seed/hydro-app/800/500"
                alt="Water tracker app dashboard"
                data-ai-hint="hydration app dashboard"
                width={800}
                height={500}
                className="rounded-xl mx-auto shadow-2xl"
              />
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-gray-50 py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold">
                Everything You Need to <span className="text-blue-600">Succeed</span>
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                    HydroCult is packed with features to help you build a healthy hydration habit.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-md text-left transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                    <Target className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg">Set Daily Goals</h4>
                <p className="text-sm text-gray-500 mt-2">Personalize your daily hydration target to fit your lifestyle and needs.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-md text-left transition-all hover:shadow-xl hover:-translate-y-1">
                 <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                    <Droplet className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg">Log Intake Easily</h4>
                <p className="text-sm text-gray-500 mt-2">Quickly add drinks with our intuitive interface. Water, coffee, tea - we track it all.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-md text-left transition-all hover:shadow-xl hover:-translate-y-1">
                 <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                    <Zap className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg">Track Your Streaks</h4>
                <p className="text-sm text-gray-500 mt-2">Stay motivated by building a streak of successfully hitting your daily goals.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="container mx-auto px-6 py-24">
            <div className="bg-blue-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                 <Image src="https://picsum.photos/seed/abstract-pattern/1080/400" alt="background pattern" data-ai-hint="abstract pattern" fill className="object-cover opacity-10" />
                <div className="relative">
                    <h2 className="text-4xl font-bold">Ready to Start Your Hydration Journey?</h2>
                    <p className="mt-4 max-w-xl mx-auto opacity-90">Create your free account today and take the first step towards a healthier, more hydrated you.</p>
                    <Button className="mt-8 bg-white text-blue-600 hover:bg-gray-100 text-base font-semibold rounded-full px-8 py-4" asChild>
                        <Link href="/signup">Sign Up Now</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2">
                 <Droplet className="w-8 h-8 text-blue-500" />
                <span className="text-xl font-bold">HydroCult</span>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Helping you stay hydrated and healthy.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Product</h5>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="#features" className="text-gray-500 hover:text-gray-900">Features</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-900">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Resources</h5>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="#" className="text-gray-500 hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-900">Help center</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Legal</h5>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="#" className="text-gray-500 hover:text-gray-900">Terms of use</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-900">Privacy policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; 2024 HydroCult. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
                <a href="#" className="hover:text-gray-900">Terms & Conditions</a>
                <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
