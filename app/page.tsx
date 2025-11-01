'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  // Generate star positions once on mount using useState lazy initializer
  const [stars] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: Math.random() * 3 + 2,
    }))
  );

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with marketing platform
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header and Navigation */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-[#0B132B] tracking-tight">
                ✨ Star Map
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-700 hover:text-[#0B132B] transition">
                How it works
              </a>
              <a href="#gallery" className="text-gray-700 hover:text-[#0B132B] transition">
                Gallery
              </a>
              <a href="#reviews" className="text-gray-700 hover:text-[#0B132B] transition">
                Reviews
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-[#0B132B] transition">
                Pricing
              </a>
              <a href="#contact" className="text-gray-700 hover:text-[#0B132B] transition">
                Contact
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button className="bg-[#FFC857] text-[#0B132B] px-6 py-2.5 rounded-full font-semibold hover:bg-[#FFD787] transition shadow-md">
                Create your map
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-[#0B132B] p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a href="#how-it-works" className="text-gray-700 hover:text-[#0B132B] transition" onClick={() => setMobileMenuOpen(false)}>
                  How it works
                </a>
                <a href="#gallery" className="text-gray-700 hover:text-[#0B132B] transition" onClick={() => setMobileMenuOpen(false)}>
                  Gallery
                </a>
                <a href="#reviews" className="text-gray-700 hover:text-[#0B132B] transition" onClick={() => setMobileMenuOpen(false)}>
                  Reviews
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-[#0B132B] transition" onClick={() => setMobileMenuOpen(false)}>
                  Pricing
                </a>
                <a href="#contact" className="text-gray-700 hover:text-[#0B132B] transition" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </a>
                <button className="bg-[#FFC857] text-[#0B132B] px-6 py-2.5 rounded-full font-semibold hover:bg-[#FFD787] transition">
                  Create your map
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0B132B] via-[#1a1f3a] to-[#0B132B] text-white pt-32 pb-20 overflow-hidden">
        {/* Starfield Background */}
        <div className="absolute inset-0 overflow-hidden">
          {stars.map((star) => (
            <div
              key={star.id}
              className="star"
              style={{
                width: `${star.width}px`,
                height: `${star.height}px`,
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.animationDelay}s`,
                animationDuration: `${star.animationDuration}s`
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Capture your special moment in the stars
              </h1>
              <p className="text-xl sm:text-2xl mb-8 text-gray-300">
                Enter a date and location to generate a beautiful night‑sky map for any occasion
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-[#FFC857] text-[#0B132B] px-8 py-3.5 rounded-full font-bold text-lg hover:bg-[#FFD787] transition shadow-lg">
                  Create your map
                </button>
                <button className="border-2 border-white text-white px-8 py-3.5 rounded-full font-semibold text-lg hover:bg-white/10 transition">
                  <a href="#gallery">See examples</a>
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md aspect-square bg-gradient-to-br from-[#1F77B4]/20 to-[#0B132B] rounded-3xl shadow-2xl flex items-center justify-center border border-[#1F77B4]/30">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">✨</div>
                  <div className="text-sm text-gray-400 mb-2">Sample Star Map</div>
                  <div className="text-lg font-semibold">Your Special Moment</div>
                  <div className="text-sm text-gray-400 mt-2">40.7128° N, 74.0060° W</div>
                  <div className="text-sm text-gray-400">January 1, 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B132B] mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create your personalized star map in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-[#1F77B4] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0B132B] mb-4 text-center">
                Enter details
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Input the event&apos;s location (city or coordinates), date and time. The system calculates the exact celestial alignment for that moment.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-[#FFC857] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-[#0B132B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0B132B] mb-4 text-center">
                Customize design
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Select a background hue from 9 colour options, choose to include a constellation chart or grid, and add an optional personal dedication.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-[#1F77B4] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0B132B] mb-4 text-center">
                Preview & order
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                View a live preview of your personalized map. Select print size and frame options (12×16 in, 16×20 in, 20×30 in) or choose digital download.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B132B] mb-4">
              Gallery
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore beautiful star maps created for special occasions
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Wedding Night', date: 'June 15, 2023', location: 'Paris, France', color: 'from-blue-900 to-purple-900' },
              { title: 'First Anniversary', date: 'December 25, 2022', location: 'New York, USA', color: 'from-indigo-900 to-pink-900' },
              { title: 'Baby\'s Birth', date: 'March 10, 2024', location: 'London, UK', color: 'from-purple-900 to-blue-900' },
              { title: 'Graduation Day', date: 'May 20, 2023', location: 'Tokyo, Japan', color: 'from-slate-900 to-teal-900' },
              { title: 'First Date', date: 'August 8, 2020', location: 'Rome, Italy', color: 'from-violet-900 to-fuchsia-900' },
              { title: 'Engagement', date: 'February 14, 2023', location: 'Sydney, Australia', color: 'from-blue-900 to-indigo-900' }
            ].map((item, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className={`aspect-[3/4] bg-gradient-to-br ${item.color} rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 p-8 flex flex-col justify-between`}>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-white/30 text-center">
                      {[...Array(30)].map((_, i) => (
                        <span key={i} className="inline-block mx-1">·</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-white text-center">
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-white/80">{item.location}</p>
                    <p className="text-sm text-white/80">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B132B] mb-4">
              What our customers say
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex text-[#FFC857]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xl font-semibold text-[#0B132B]">4.6/5</span>
              <span className="text-gray-600">(339 reviews)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Mitchell',
                role: 'Wedding Gift',
                text: 'Ordered this for my best friend\'s wedding and they absolutely loved it! The quality is exceptional and the personalization makes it so special.',
                rating: 5
              },
              {
                name: 'James Chen',
                role: 'Anniversary Present',
                text: 'The perfect gift for our 10th anniversary. The star map from our wedding night brought back so many memories. Highly recommend!',
                rating: 5
              },
              {
                name: 'Emma Thompson',
                role: 'New Baby Gift',
                text: 'Such a unique way to commemorate our daughter\'s birth. The print quality is amazing and it looks beautiful in the nursery.',
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex text-[#FFC857] mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <div>
                  <div className="font-bold text-[#0B132B]">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md">
              <span className="font-semibold text-[#0B132B]">Trusted by customers worldwide</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">30-day satisfaction guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B132B] mb-4">
              Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect size for your space
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[
              { size: 'Digital', dimensions: 'High-res file', price: '$29', features: ['Instant download', 'Print anywhere', 'Unlimited prints'] },
              { size: 'Small', dimensions: '12" × 16"', price: '$49', features: ['Premium paper', 'Matte finish', 'Free shipping'] },
              { size: 'Medium', dimensions: '16" × 20"', price: '$79', features: ['Premium paper', 'Matte finish', 'Free shipping'], popular: true },
              { size: 'Large', dimensions: '20" × 30"', price: '$119', features: ['Premium paper', 'Matte finish', 'Free shipping'] }
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl shadow-lg p-6 relative ${
                  plan.popular ? 'ring-2 ring-[#FFC857] scale-105' : ''
                } hover:shadow-xl transition`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[#FFC857] text-[#0B132B] text-sm font-bold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#0B132B] mb-2">{plan.size}</h3>
                  <p className="text-gray-600 mb-4">{plan.dimensions}</p>
                  <div className="text-4xl font-bold text-[#0B132B]">{plan.price}</div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-[#1F77B4] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full font-semibold transition ${
                    plan.popular
                      ? 'bg-[#FFC857] text-[#0B132B] hover:bg-[#FFD787]'
                      : 'bg-gray-100 text-[#0B132B] hover:bg-gray-200'
                  }`}
                >
                  Select
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              All prints include premium photo board printing with matte finish
            </p>
            <a href="#pricing" className="text-[#1F77B4] font-semibold hover:underline">
              See all frame options →
            </a>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-[#0B132B] to-[#1F77B4] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to create your star map?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Memorialize your special moment with a personalized map of the night sky
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#FFC857] text-[#0B132B] px-8 py-3.5 rounded-full font-bold text-lg hover:bg-[#FFD787] transition shadow-lg">
              Create your map
            </button>
            <button className="border-2 border-white text-white px-8 py-3.5 rounded-full font-semibold text-lg hover:bg-white/10 transition">
              Contact us
            </button>
          </div>
          <p className="mt-6 text-sm text-gray-300">
            Free shipping on orders over $75 • 30-day satisfaction guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#0B132B] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">✨ Star Map</h3>
              <p className="text-gray-400 mb-4">
                Capture your special moments in the stars with personalized night sky maps.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-[#FFC857] transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#FFC857] transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition">How it works</a></li>
                <li><a href="#gallery" className="text-gray-400 hover:text-white transition">Gallery</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-bold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Order Status</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Returns</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4 text-sm">
                Get updates on new designs and special offers
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC857]"
                />
                <button
                  type="submit"
                  className="bg-[#FFC857] text-[#0B132B] px-4 py-2 rounded-full font-semibold hover:bg-[#FFD787] transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © 2024 Star Map. All rights reserved.
              </div>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition">About</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
