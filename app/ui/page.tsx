"use client";
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function UIPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('theme');
    const initial = saved === 'dark' || saved === 'light'
      ? saved
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
  };

  const cards = [
    { title: 'Card One', description: 'This is the first card.' },
    { title: 'Card Two', description: 'This is the second card.' },
    { title: 'Card Three', description: 'This is the third card.' },
    { title: 'Card Four', description: 'This is the fourth card.' },
    { title: 'Card Five', description: 'This is the fifth card.' },
    { title: 'Card Six', description: 'This is the sixth card.' },
  ];

  const accordions = [
    { title: 'Section One', content: 'Content for section one.' },
    { title: 'Section Two', content: 'Content for section two.' },
    { title: 'Section Three', content: 'Content for section three.' },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>UI Demo</h1>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
      </header>
      <section>
        <h2>Responsive Card Grid</h2>
        <div className={styles.grid}>
          {cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>CSS-Only Accordion</h2>
        <div className={styles.accordion}>
          {accordions.map((item, index) => (
            <div key={index} className={styles.accordionItem}>
              <input
                type="checkbox"
                id={`accordion-${index}`} 
                className={styles.checkbox}
              />
              <label htmlFor={`accordion-${index}`} className={styles.accordionHeader}>
                {item.title}
              </label>
              <div className={styles.accordionContent}>
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}