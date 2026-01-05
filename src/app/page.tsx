'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, Facebook, Twitter, Linkedin, Instagram, PlayCircle, MessageCircle, Star, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ))}
  </div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-body">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="#111827" />
              <path
                d="M16.23 6.32031L23.44 13.9103L16.42 21.3603L13.11 18.2503L16.23 21.5503L20.25 17.7603L13.13 10.1503L16.23 6.32031Z"
                fill="white"
              />
              <path
                d="M13.1201 10.1504L8.79006 14.1504L13.1301 18.2504L10.7101 20.8404L13.1201 18.2504L16.4201 21.3604L8.79006 21.5504L8.60006 18.4404L13.1201 10.1504Z"
                fill="#4F46E5"
              />
            </svg>
            <span className="text-2xl font-bold text-gray-900">Rofeno</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
              Product <ChevronDown className="w-4 h-4" />
            </a>
            <a href="#" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
              Solutions <ChevronDown className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Pricing
            </a>
            <a href="#" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
              Resources <ChevronDown className="w-4 h-4" />
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-sm font-semibold">
              Log in
            </Button>
            <Button className="bg-gray-900 text-white hover:bg-gray-800 text-sm font-semibold rounded-full px-5 py-2.5">
              Get started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                  More Power For You
                </span>
                <Image
                  src="https://picsum.photos/seed/9/24/24"
                  alt="Decorative element"
                  data-ai-hint="abstract shape"
                  width={24}
                  height={24}
                />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold !leading-tight tracking-tighter">
                Maximize Your <span className="text-indigo-600">Financial</span> Potential
              </h1>
              <p className="mt-6 text-gray-600">
                Simple way to manage your personal finances. We'll help you to take control of your financial future.
              </p>
              <Button className="mt-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-semibold rounded-full px-8 py-6 flex items-center gap-2 group">
                Get started
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <div>
              <Image
                src="https://picsum.photos/seed/1/600/450"
                alt="Financial dashboard preview"
                data-ai-hint="financial dashboard"
                width={600}
                height={450}
                className="rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* Ratings Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-gray-500 mb-6">Rated by over 10,000+ customers</p>
            <div className="flex justify-center items-center gap-12">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">4.8</span>
                <div>
                  <StarRating rating={4.8} />
                  <p className="text-xs text-gray-500">Capterra</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">4.9</span>
                <div>
                  <StarRating rating={4.9} />
                  <p className="text-xs text-gray-500">G2</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">4.8</span>
                <div>
                  <StarRating rating={4.8} />
                  <p className="text-xs text-gray-500">Crowd</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Empower Financial Future Section */}
        <section className="container mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">
              Empower Your Financial <span className="text-indigo-600">Future with us</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://picsum.photos/seed/2/600/400"
                alt="Financial Analytics Dashboard"
                data-ai-hint="analytics dashboard"
                width={600}
                height={400}
                className="rounded-xl"
              />
            </div>
            <div className="max-w-md">
              <h3 className="text-3xl font-bold leading-tight">
                Comprehensive Financial Analytics Dashboard
              </h3>
              <p className="mt-4 text-gray-600">
                Get real-time insights into your finances. We provide a clear overview of your income, expenses, and investments.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-800">Bank-level security</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-800">24/7 support</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Track Expense Section */}
        <section className="container mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="max-w-md">
              <h3 className="text-3xl font-bold leading-tight">
                Track Your all the <span className="text-indigo-600">Expense Easily</span>
              </h3>
              <p className="mt-4 text-gray-600">
                Connect your bank accounts and credit cards to automatically track your spending. Categorize transactions and set budgets.
              </p>
              <Button className="mt-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-semibold rounded-full px-8 py-6">
                Get started
              </Button>
            </div>
            <div>
              <Image
                src="https://picsum.photos/seed/3/500/400"
                alt="Expense tracking interface"
                data-ai-hint="expense tracking"
                width={500}
                height={400}
                className="rounded-xl"
              />
            </div>
          </div>
        </section>
        
        {/* Send Money Section */}
        <section className="bg-gray-50 py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold">
              Send Money <span className="text-indigo-600">Across the Globe</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
              Transfer funds internationally with competitive exchange rates and low fees. Your money arrives quickly and securely.
            </p>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-md text-left">
                <Image src="https://picsum.photos/seed/4/300/200" alt="Multi-currency support" data-ai-hint="currency exchange" width={300} height={200} className="rounded-lg mb-4"/>
                <h4 className="font-bold text-lg">Multi-Currency Support</h4>
                <p className="text-sm text-gray-500 mt-2">Send and receive money in over 50 currencies without hidden fees.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-md text-left">
                <Image src="https://picsum.photos/seed/5/300/200" alt="Instant transfers" data-ai-hint="instant transfer" width={300} height={200} className="rounded-lg mb-4"/>
                <h4 className="font-bold text-lg">Instant P2P Sending</h4>
                <p className="text-sm text-gray-500 mt-2">Transfer money to other Rofeno users instantly with just a username.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-md text-left">
                <Image src="https://picsum.photos/seed/6/300/200" alt="Unlimited transactions" data-ai-hint="secure transaction" width={300} height={200} className="rounded-lg mb-4"/>
                <h4 className="font-bold text-lg">Unlimited Transactions</h4>
                <p className="text-sm text-gray-500 mt-2">No limits on the number of transactions you can make. Freedom for your finances.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Achieve Financial Excellence Section */}
        <section className="container mx-auto px-6 py-24">
           <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">
              Empower Your Financial <span className="text-indigo-600">Future with us</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://picsum.photos/seed/7/500/400"
                alt="Debit cards"
                data-ai-hint="debit card"
                width={500}
                height={400}
              />
            </div>
            <div className="max-w-md">
              <h3 className="text-3xl font-bold leading-tight">
                Achieve Financial <span className="text-indigo-600">Excellence</span>
              </h3>
              <p className="mt-4 text-gray-600">
                We provide the tools and insights to help you build wealth, save smarter, and reach your financial goals faster.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <span><span className="font-semibold text-gray-900">Personalized Insights:</span> Get tailored recommendations based on your spending habits.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <span><span className="font-semibold text-gray-900">Goal Setting & Tracking:</span> Set financial goals and monitor your progress effortlessly.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Integrate Tools Section */}
        <section className="bg-gray-50 py-24">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
             <div className="max-w-md">
              <h3 className="text-3xl font-bold leading-tight">
                Integrate With Your <span className="text-indigo-600">Favorite Tools</span>
              </h3>
              <p className="mt-4 text-gray-600">
                Connect Rofeno with the tools you already use to streamline your financial management.
              </p>
              <Button className="mt-8 bg-gray-900 text-white hover:bg-gray-800 text-base font-semibold rounded-full px-8 py-6">
                Start Integrating Now
              </Button>
            </div>
            <div>
              <Image
                src="https://picsum.photos/seed/8/500/400"
                alt="Integration logos"
                data-ai-hint="integration logos"
                width={500}
                height={400}
              />
            </div>
          </div>
        </section>
        
        {/* Ready to Run Business Section */}
        <section className="container mx-auto px-6 py-24">
            <div className="bg-indigo-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                 <Image src="https://picsum.photos/seed/10/1000/400" alt="background pattern" data-ai-hint="abstract pattern" fill className="object-cover opacity-10" />
                <div className="relative">
                    <h2 className="text-4xl font-bold">Ready to Run your Business <span className="text-green-300">Better</span> with us</h2>
                    <p className="mt-4 max-w-xl mx-auto opacity-90">Our platform is designed to give you the financial clarity you need to make smarter decisions.</p>
                    <Button className="mt-8 bg-white text-indigo-600 hover:bg-gray-100 text-base font-semibold rounded-full px-8 py-4">
                        Get Started Now
                    </Button>
                </div>
            </div>
        </section>

        {/* Live Chat & Demo Section */}
        <section className="container mx-auto px-6 pb-24">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-indigo-50 rounded-3xl p-8 flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                            <MessageCircle className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h3 className="text-2xl font-bold">Live Chat</h3>
                        <p className="mt-2 text-gray-600">Get instant support from our team of experts, 24/7.</p>
                    </div>
                    <Button variant="link" className="text-indigo-600 p-0 mt-6 font-semibold">
                        Start a chat <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
                <div className="bg-green-50 rounded-3xl p-8 flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                            <PlayCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold">Watch a Demo</h3>
                        <p className="mt-2 text-gray-600">See our platform in action and learn how it can help you.</p>
                    </div>
                    <Button variant="link" className="text-green-600 p-0 mt-6 font-semibold">
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
                 <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="16" cy="16" r="16" fill="#111827" />
                    <path
                      d="M16.23 6.32031L23.44 13.9103L16.42 21.3603L13.11 18.2503L16.23 21.5503L20.25 17.7603L13.13 10.1503L16.23 6.32031Z"
                      fill="white"
                    />
                    <path
                      d="M13.1201 10.1504L8.79006 14.1504L13.1301 18.2504L10.7101 20.8404L13.1201 18.2504L16.4201 21.3604L8.79006 21.5504L8.60006 18.4404L13.1201 10.1504Z"
                      fill="#4F46E5"
                    />
                  </svg>
                <span className="text-xl font-bold">Rofeno</span>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Voice of the underlying data for your financial state of money.
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
            <p>&copy; 2024 Rofeno. All rights reserved.</p>
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
