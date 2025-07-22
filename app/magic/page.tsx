"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MagicPage() {
  const specialties = ['Sleight of Hand', 'Stage Illusions', 'Mentalism', 'Card Tricks']
  const [typedText, setTypedText] = useState('')
  const [specIndex, setSpecIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (charIndex < specialties[specIndex].length) {
        setTypedText((prev) => prev + specialties[specIndex][charIndex])
        setCharIndex((prev) => prev + 1)
      } else {
        setTimeout(() => {
          setTypedText('')
          setCharIndex(0)
          setSpecIndex((prev) => (prev + 1) % specialties.length)
        }, 1000)
      }
    }, 100)
    return () => clearTimeout(timeout)
  }, [charIndex, specIndex, specialties])

  return (
    <div className="text-white bg-black">
      
      <section className="relative h-screen flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <img
            src="https://via.placeholder.com/1950x1080?text=Mystical+Magic"
            alt="Mystical Background"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">
            Prepare to Believe in Magic
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            Join Mysto the Marvel in a journey beyond imagination.
          </p>
          <Link href="#contact" className="button">
            Book a Show
          </Link>
        </div>
      </section>

      
      <section id="about" className="bg-gray-900 text-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif mb-4">About Mysto the Marvel</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Mysto the Marvel has dazzled audiences worldwide with his captivating performances and
            mind-bending illusions. With years of experience on stage and close-up venues, Mysto
            brings wonder and excitement to every event.
          </p>
          <div className="text-xl font-mono h-8">
            {typedText}
            <span className="blinking-cursor">|</span>
          </div>
        </div>
      </section>

      
      <section id="services" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-8">Show Offerings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Private Parties', desc: 'Intimate performances tailored for your gathering.' },
              { title: 'Corporate Events', desc: 'Professional magic shows for your corporate functions.' },
              { title: 'Virtual Shows', desc: 'Interactive online magic experiences.' },
            ].map((item) => (
              <div key={item.title} className="card p-6 bg-gray-800 text-white">
                <h3 className="text-2xl font-serif mb-2">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section id="gallery" className="bg-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-8 text-white">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="overflow-hidden rounded-lg">
                <img
                  src={`https://via.placeholder.com/600x400?text=Photo+${i + 1}`}
                  alt={`Mysto Photo ${i + 1}`}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-8">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: 'Absolutely mesmerizing performance!', name: 'Alice Johnson', rating: 5 },
              { quote: "Our guests can't stop talking about it!", name: 'Mark Stevens', rating: 4 },
              { quote: 'Mysto made our event unforgettable.', name: 'Sarah Lee', rating: 5 },
            ].map((item, idx) => (
              <div key={idx} className="card p-6">
                <p className="italic mb-4">"{item.quote}"</p>
                <div className="mb-2">
                  {'★'.repeat(item.rating) + '☆'.repeat(5 - item.rating)}
                </div>
                <p className="font-semibold">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section id="contact" className="bg-gray-900 py-20">
        <div className="container mx-auto px-4 max-w-lg">
          <h2 className="text-3xl font-serif mb-6 text-center text-white">Contact</h2>
          <form className="space-y-4">
            {['Name', 'Email', 'Message'].map((field) =>
              field !== 'Message' ? (
                <input
                  key={field}
                  type={field === 'Email' ? 'email' : 'text'}
                  placeholder={field}
                  required
                />
              ) : (
                <textarea key={field} rows={4} placeholder={field} required />
              )
            )}
            <button type="submit" className="button w-full">
              Send
            </button>
          </form>
          <div className="mt-8 text-center text-white">
            <a href="#" className="mx-2">
              Twitter
            </a>
            <a href="#" className="mx-2">
              Instagram
            </a>
            <p className="mt-4">🎩 ✨ Mysto the Marvel ✨ 🎩</p>
          </div>
        </div>
      </section>
    </div>
  )
}
