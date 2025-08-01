"use client";
import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function MagicPage() {
  const specialties = useMemo(() => ['Sleight of Hand', 'Stage Illusions', 'Mentalism', 'Card Tricks'], [])
  const galleryImages = useMemo(
    () => Array(6).fill('/blog/magic-photo.svg'),
    [],
  )
  const [typedText, setTypedText] = useState('')
  const [specIndex, setSpecIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  // Hide global header/footer for immersive magic page
  useEffect(() => {
    const headerEl = document.querySelector('header') as HTMLElement | null
    const footerEl = document.querySelector('footer') as HTMLElement | null
    const infoEl = document.querySelector('div.text-center.text-xs') as HTMLElement | null
    if (headerEl) headerEl.style.display = 'none'
    if (footerEl) footerEl.style.display = 'none'
    if (infoEl) infoEl.style.display = 'none'
    return () => {
      if (headerEl) headerEl.style.display = ''
      if (footerEl) footerEl.style.display = ''
      if (infoEl) infoEl.style.display = ''
    }
  }, [])

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
    <div className="text-black animate-fadeIn">
      
      <section className="h-screen flex items-center justify-center text-center">
        <div className="container mx-auto px-4">
          <div className="relative inline-block mb-4 animate-fadeIn">
            <h1 className="text-5xl md:text-6xl font-serif drop-shadow-lg relative z-10">
              Prepare to Believe in Magic
            </h1>
            <span className="absolute -top-4 -left-4 text-yellow-300 text-2xl animate-pulse">✨</span>
            <span className="absolute -top-4 -right-4 text-yellow-300 text-3xl animate-ping">✨</span>
            <span className="absolute -bottom-4 -right-8 text-yellow-300 text-2xl animate-pulse">✨</span>
          </div>
          <p className="text-xl md:text-2xl mb-6 animate-fadeIn">
            Join Mysto the Marvel in a journey beyond imagination.
          </p>
          <Link href="#contact" className="button animate-bounce">
            Book a Show
          </Link>
        </div>
      </section>

      
      <section id="about" className="text-center py-20 animate-fadeIn">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif mb-4 inline-block animate-fadeIn">✨ About Mysto the Marvel ✨</h2>
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

      
      <section id="services" className="py-20 animate-fadeIn">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-8 inline-block animate-fadeIn">✨ Show Offerings ✨</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Private Parties', desc: 'Intimate performances tailored for your gathering.' },
              { title: 'Corporate Events', desc: 'Professional magic shows for your corporate functions.' },
              { title: 'Virtual Shows', desc: 'Interactive online magic experiences.' },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="text-2xl font-serif mb-2">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section id="gallery" className="py-20 animate-fadeIn">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-8">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((src, i) => (
              <div key={i} className="overflow-hidden rounded-lg animate-float">
                <Image
                  src={src}
                  alt={`Mysto Photo ${i + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section id="testimonials" className="py-20 animate-fadeIn">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-8 inline-block animate-fadeIn">✨ Testimonials ✨</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: 'Absolutely mesmerizing performance!', name: 'Alice Johnson', rating: 5 },
              { quote: "Our guests can't stop talking about it!", name: 'Mark Stevens', rating: 4 },
              { quote: 'Mysto made our event unforgettable.', name: 'Sarah Lee', rating: 5 },
            ].map((item, idx) => (
              <div key={idx} className="card p-6">
                <p className="italic mb-4">&ldquo;{item.quote}&rdquo;</p>
                <div className="mb-2">
                  {'★'.repeat(item.rating) + '☆'.repeat(5 - item.rating)}
                </div>
                <p className="font-semibold">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section id="contact" className="py-20 animate-fadeIn">
        <div className="container mx-auto px-4 max-w-lg">
          <h2 className="text-3xl font-serif mb-6 text-center inline-block animate-fadeIn">✨ Contact ✨</h2>
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
          <div className="mt-8 text-center">
            <a href="#" className="mx-2 text-accent hover:text-accent-hover">
              Twitter
            </a>
            <a href="#" className="mx-2 text-accent hover:text-accent-hover">
              Instagram
            </a>
            <p className="mt-4">🎩 ✨ Mysto the Marvel ✨ 🎩</p>
          </div>
        </div>
      </section>
    </div>
  )
}
