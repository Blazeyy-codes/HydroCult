'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, Droplet, Zap, Target, Award, Facebook, Twitter, Linkedin, Instagram, PlayCircle, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-body">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Droplet className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">HydroTrack</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
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
            <Button variant="ghost" className="text-sm font-semibold">
              Log in
            </Button>
            <Button className="bg-gray-900 text-white hover:bg-gray-800 text-sm font-semibold rounded-full px-5 py-2.5">
              Sign up <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
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
            <Button className="mt-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-semibold rounded-full px-8 py-6 flex items-center gap-2 group mx-auto">
              Get Started for Free
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
           <div className="mt-16">
              <Image
                src="https://images.unsplash.com/photo-1523362628745-0c3001d0a52b?q=80&w=800&auto=format&fit=crop"
                alt="Water tracker app dashboard"
                data-ai-hint="hydration app dashboard"
                width={800}
                height={500}
                className="rounded-xl mx-auto shadow-2xl"
              />
            </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold">
                Everything You Need to <span className="text-blue-600">Succeed</span>
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                    HydroTrack is packed with features to help you build a healthy hydration habit.
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

        {/* Why Track Water Section */}
        <section className="container mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://images.unsplash.com/photo-1543164893-03233a4efa54?q=80&w=800&auto=format&fit=crop"
                alt="Person drinking water"
                data-ai-hint="person drinking water"
                width={600}
                height={400}
                className="rounded-xl"
              />
            </div>
            <div className="max-w-md">
              <h3 className="text-3xl font-bold leading-tight">
                Unlock a Healthier You, One Sip at a Time
              </h3>
              <p className="mt-4 text-gray-600">
                Proper hydration is key to your overall well-being. Tracking your water intake helps you improve energy levels, enhance skin health, and boost physical performance.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <span><span className="font-semibold text-gray-900">Boost Energy:</span> Fight fatigue and stay alert throughout the day.</span>
                </li>
                 <li className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <span><span className="font-semibold text-gray-900">Improve Health:</span> Support essential body functions and overall wellness.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="container mx-auto px-6 py-24">
            <div className="bg-blue-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                 <Image src="https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHBhdHRlcm58ZW58MHx8fHwxNzY3NjIzMTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="background pattern" data-ai-hint="abstract pattern" fill className="object-cover opacity-10" />
                <div className="relative">
                    <h2 className="text-4xl font-bold">Ready to Start Your Hydration Journey?</h2>
                    <p className="mt-4 max-w-xl mx-auto opacity-90">Create your free account today and take the first step towards a healthier, more hydrated you.</p>
                    <Button className="mt-8 bg-white text-blue-600 hover:bg-gray-100 text-base font-semibold rounded-full px-8 py-4">
                        Sign Up Now
                    </Button>
                </div>
            </div>
        </section>

        {/* Live Chat & Demo Section */}
        <section className="container mx-auto px-6 pb-24">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-blue-50 rounded-3xl p-8 flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                            <MessageCircle className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold">Live Chat</h3>
                        <p className="mt-2 text-gray-600">Have questions? Get instant support from our team.</p>
                    </div>
                    <Button variant="link" className="text-blue-600 p-0 mt-6 font-semibold self-start">
                        Start a chat <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
                <div className="bg-green-50 rounded-3xl p-8 flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                            <PlayCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold">Watch a Demo</h3>
                        <p className="mt-2 text-gray-600">See HydroTrack in action and learn how it can help you.</p>
                    </div>
                    <Button variant="link" className="text-green-600 p-0 mt-6 font-semibold self-start">
                        Watch a demo <ArrowRight className="w-4 h-4 ml-1" />
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
                <span className="text-xl font-bold">HydroTrack</span>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Helping you stay hydrated and healthy.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Company</h5>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="#" className="text-gray-500 hover:text-gray-900">About us</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-900">Press</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Product</h5>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="#" className="text-gray-500 hover:text-gray-900">Features</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-900">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Resources</h5>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="#" className="text-gray-500 hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-900">Help center</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-900">Support</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Legal</h5>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="#" className="text-gray-500 hover:text-gray-900">Terms of use</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-900">Privacy policy</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-900">Cookie policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; 2024 HydroTrack. All rights reserved.</p>
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
    