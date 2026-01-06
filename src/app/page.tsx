'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, Droplet, Zap, Target, CheckCircle, Quote, HelpCircle, Info, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/firebase';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">
              Testimonials
            </a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">
              FAQ
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
                <Button className="bg-gray-900 text-white hover:bg-gray-800 text-sm font-semibold rounded-full px-5 py-2.5 transition-transform hover:scale-105" asChild>
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
            <Button className="mt-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-semibold rounded-full px-8 py-6 flex items-center gap-2 group mx-auto transition-transform hover:scale-105" asChild>
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
             <TooltipProvider>
              <div className="grid md:grid-cols-3 gap-8">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-white p-8 rounded-2xl shadow-md text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-help">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                          <Target className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-lg">Set Daily Goals</h4>
                      <p className="text-sm text-gray-500 mt-2">Personalize your daily hydration target to fit your lifestyle and needs.</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Adjust your goal anytime based on activity level or weather.</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-white p-8 rounded-2xl shadow-md text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-help">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                          <Droplet className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-lg">Log Intake Easily</h4>
                      <p className="text-sm text-gray-500 mt-2">Quickly add drinks with our intuitive interface. Water, coffee, tea - we track it all.</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Log common sizes like glasses or bottles with a single tap.</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                     <div className="bg-white p-8 rounded-2xl shadow-md text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-help">
                       <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                          <Zap className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-lg">Track Your Streaks</h4>
                      <p className="text-sm text-gray-500 mt-2">Stay motivated by building a streak of successfully hitting your daily goals.</p>
                    </div>
                  </TooltipTrigger>
                   <TooltipContent>
                    <p>Celebrate milestones and build a lasting habit.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </section>

         {/* Testimonials Section */}
        <section id="testimonials" className="bg-gray-50 py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold">Loved by Hydration Heroes</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-600">Don't just take our word for it. Here's what our users say.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <Quote className="w-8 h-8 text-blue-200 mb-4" />
                        <p className="text-gray-600 mb-6">"I never realized how little water I was drinking. HydroCult has been a game-changer for my energy levels!"</p>
                        <div className="flex items-center">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="https://picsum.photos/seed/user1/100/100" alt="User 1" />
                                <AvatarFallback>JS</AvatarFallback>
                            </Avatar>
                            <div className="ml-4">
                                <p className="font-semibold">Jessica S.</p>
                                <p className="text-sm text-gray-500">Fitness Enthusiast</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <Quote className="w-8 h-8 text-blue-200 mb-4" />
                        <p className="text-gray-600 mb-6">"The streak feature is so motivating! I haven't missed a day in over a month. Highly recommend this app."</p>
                        <div className="flex items-center">
                           <Avatar className="h-10 w-10">
                                <AvatarImage src="https://picsum.photos/seed/user2/100/100" alt="User 2" />
                                <AvatarFallback>MD</AvatarFallback>
                            </Avatar>
                            <div className="ml-4">
                                <p className="font-semibold">Mark D.</p>
                                <p className="text-sm text-gray-500">Software Developer</p>
                            </div>
                        </div>
                    </div>
                     <div className="bg-white p-8 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <Quote className="w-8 h-8 text-blue-200 mb-4" />
                        <p className="text-gray-600 mb-6">"Simple, beautiful, and effective. It does exactly what it promises without any clutter. Love the little plant!"</p>
                        <div className="flex items-center">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="https://picsum.photos/seed/user3/100/100" alt="User 3" />
                                <AvatarFallback>LW</AvatarFallback>
                            </Avatar>
                            <div className="ml-4">
                                <p className="font-semibold">Laura W.</p>
                                <p className="text-sm text-gray-500">Designer</p>
                            </div>
                        </div>
                    </div>
                </div>
                 <div className="text-center mt-12">
                    <p className="text-lg font-semibold text-blue-600">95% of users meet their hydration goals daily with HydroCult.</p>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24">
            <div className="container mx-auto px-6 max-w-4xl">
                 <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold">Common Questions</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-600">Have questions? We've got answers.</p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Do I need to log every glass manually?</AccordionTrigger>
                        <AccordionContent>
                        Not at all! You can set up quick-add buttons for your favorite drink sizes (e.g., 250ml glass, 500ml bottle) to log your intake with a single tap.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Can I sync with other health apps?</AccordionTrigger>
                        <AccordionContent>
                        Currently, HydroCult is a standalone app. We are exploring integrations with Apple Health and Google Fit for future updates, so stay tuned!
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What counts towards my daily goal?</AccordionTrigger>
                        <AccordionContent>
                        While plain water is best, other beverages like tea, coffee, and juice also contribute to your hydration. Our app allows you to log different drink types and gives you gentle reminders about the best sources of hydration.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Is there a dark mode?</AccordionTrigger>
                        <AccordionContent>
                        Yes! HydroCult respects your system's theme by default. You can also manually toggle between light and dark modes in the settings.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>


        {/* About Section */}
        <section id="about" className="bg-blue-50/50 py-24">
            <div className="container mx-auto px-6 text-center max-w-3xl">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600">
                      <Info className="w-8 h-8" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold">Our Mission</h2>
                <p className="mt-4 text-lg text-gray-600">
                    At HydroCult, we believe that proper hydration is the foundation of a healthy life. Our mission is to make water tracking simple, enjoyable, and beautiful, empowering you to build a lasting habit one sip at a time. We're a small team dedicated to creating a tool that genuinely helps you feel your best.
                </p>
            </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold">Hydration Tips & Resources</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-600">Expand your knowledge and build healthier habits with our latest articles.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <a href="#" className="group block bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <Image src="https://picsum.photos/seed/blog1/400/250" alt="Blog post 1" width={400} height={250} className="w-full object-cover" />
                        <div className="p-6">
                            <p className="text-sm text-blue-600 font-semibold">Wellness</p>
                            <h4 className="font-bold text-lg mt-2 group-hover:text-blue-600 transition-colors">5 Surprising Benefits of Staying Hydrated</h4>
                            <p className="text-sm text-gray-500 mt-2">It's about more than just quenching thirst. Discover the hidden perks.</p>
                        </div>
                    </a>
                    <a href="#" className="group block bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <Image src="https://picsum.photos/seed/blog2/400/250" alt="Blog post 2" width={400} height={250} className="w-full object-cover" />
                        <div className="p-6">
                            <p className="text-sm text-blue-600 font-semibold">Habits</p>
                            <h4 className="font-bold text-lg mt-2 group-hover:text-blue-600 transition-colors">How to Build a Water-Drinking Habit That Lasts</h4>
                             <p className="text-sm text-gray-500 mt-2">Struggling to be consistent? Try these science-backed tips.</p>
                        </div>
                    </a>
                    <a href="#" className="group block bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                         <Image src="https://picsum.photos/seed/blog3/400/250" alt="Blog post 3" width={400} height={250} className="w-full object-cover" />
                        <div className="p-6">
                            <p className="text-sm text-blue-600 font-semibold">Myth Busters</p>
                            <h4 className="font-bold text-lg mt-2 group-hover:text-blue-600 transition-colors">Do You Really Need 8 Glasses a Day?</h4>
                             <p className="text-sm text-gray-500 mt-2">We dive into the science behind the most common hydration advice.</p>
                        </div>
                    </a>
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
                    <Button className="mt-8 bg-white text-blue-600 hover:bg-gray-100 text-base font-semibold rounded-full px-8 py-4 transition-transform hover:scale-105" asChild>
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
                <li><a href="#features" className="text-gray-500 hover:text-gray-900 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-500 hover:text-gray-900 transition-colors">How it Works</a></li>
                 <li><a href="#testimonials" className="text-gray-500 hover:text-gray-900 transition-colors">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Resources</h5>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="#blog" className="text-gray-500 hover:text-gray-900 transition-colors">Blog</a></li>
                <li><a href="#faq" className="text-gray-500 hover:text-gray-900 transition-colors">FAQ</a></li>
                 <li><a href="#about" className="text-gray-500 hover:text-gray-900 transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Legal</h5>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Terms of use</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Privacy policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; 2024 HydroCult. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
                <a href="#" className="hover:text-gray-900 transition-colors">Terms & Conditions</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

    