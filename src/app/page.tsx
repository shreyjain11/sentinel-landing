"use client";
import React, { useState, useEffect } from "react";
import "./globals.css";
import confetti from "canvas-confetti";

// Move typewriterPhrases outside the component
const typewriterPhrases = [
  "Effortless.",
  "Secure.",
  "Automatic.",
  "Smart.",
  "Intelligent.",
  "Reliable.",
  "Seamless.",
  "Powerful.",
  "Innovative.",
  "Trusted.",
  "Advanced.",
  "Simple.",
];

// Random Grid Component
function RandomGrid() {
  const [highlightedSquare, setHighlightedSquare] = useState({ row: 0, col: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const interval = setInterval(() => {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Generate random position: 1-10 for columns, 1-5 for rows
      const randomCol = Math.floor(Math.random() * 10);
      const randomRow = Math.floor(Math.random() * 5);
      setHighlightedSquare({ row: randomRow, col: randomCol });
      
      // Fade in
      setIsVisible(true);
      
      // Stay lit for 2 seconds, then fade out
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }, 2000); // Change every 2 seconds

    return () => {
      clearInterval(interval);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1]">
      <div 
        className={`absolute bg-blue-300 bg-opacity-10 transition-all duration-1000 ease-in-out shadow-[0_0_25px_rgba(147,197,253,0.4)]`}
        style={{
          width: '10%',
          height: '20%',
          left: `${highlightedSquare.col * 10}%`,
          top: `${highlightedSquare.row * 20}%`,
          opacity: isVisible ? 0.6 : 0,
        }}
      />
    </div>
  );
}

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!deleting && displayed.length < typewriterPhrases[index].length) {
      timeout = setTimeout(() => setDisplayed(typewriterPhrases[index].slice(0, displayed.length + 1)), 50);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 25);
    } else if (!deleting) {
      timeout = setTimeout(() => setDeleting(true), 1200);
    } else {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((index + 1) % typewriterPhrases.length);
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <div className="relative text-center min-h-[2.5em] mb-8">
      <span className="font-heading font-medium text-2xl md:text-3xl text-gray-700 select-none leading-[1.2]">
        {displayed}
      </span>
      <span className="text-gray-700 font-normal">
        |
      </span>
    </div>
  );
}

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div className={`transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>{children}</div>
  );
}

function SuccessCheckmark({ show }: { show: boolean }) {
  return show ? (
    <div className="flex items-center justify-center mt-4">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" stroke="#3b82f6" strokeWidth="3" fill="#3b82f622" />
        <path d="M13 21l5 5 9-9" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  ) : null;
}

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://formspree.io/f/xyzjrazr', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Show confetti and success state
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          zIndex: 9999,
          colors: ['#3b82f6', '#1d4ed8', '#1e40af', '#1e3a8a']
        });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
        
        // Reset the form
        const form = e.currentTarget;
        if (form) {
          form.reset();
        }
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center text-gray-800 font-sans transition-colors duration-500 px-4">
      <div className="flex flex-col items-center gap-12 w-full max-w-4xl">
        <FadeInSection delay={100}>
          <div className="text-center">
            <h1 className="font-heading text-6xl md:text-8xl font-black text-center tracking-tight mb-4 relative select-none text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 leading-[0.9]">
              Sentinel
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-medium">The effortless way to manage free trials and subscriptions.</p>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={300}>
          <Typewriter />
        </FadeInSection>
        
        <FadeInSection delay={500}>
          <div className="flex flex-col items-center gap-8 w-full max-w-xl">
            <div className="bg-white p-8 shadow-xl border border-gray-100 flex flex-col items-center w-full transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] rounded-xl backdrop-blur-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Be the first to know</h2>
              <form 
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row gap-3 items-center w-full justify-center"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email address"
                  className="px-4 py-3 bg-gray-50 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-80 shadow-sm transition-all duration-200 rounded-full"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-hover-effect px-6 py-3 font-bold shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border border-gray-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
                >
                  <span>{isSubmitting ? "Adding..." : submitted ? "Added!" : "Get Early Access"}</span>
                </button>
              </form>
              <SuccessCheckmark show={submitted} />
            </div>
            
            <div className="flex flex-col gap-4 w-full items-center">
              <p className="text-gray-600 text-center mb-4">Follow us for updates</p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/usesentinelai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn-hover flex items-center gap-3 px-5 py-2.5 font-semibold bg-white border border-gray-200 text-gray-700 shadow-lg transition-all duration-200 hover:-translate-y-1 rounded-full"
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 0A5.75 5.75 0 0 0 2 7.75Zm8.5 0A5.75 5.75 0 0 1 22 7.75Zm0 20A5.75 5.75 0 0 0 22 16.25Zm-8.5 0A5.75 5.75 0 0 1 2 16.25Zm3.75-7.25a3.5 3.5 0 1 0 7 0a3.5 3.5 0 0 0-7 0Zm7.25-4.25a1 1 0 1 0 2 0a1 1 0 0 0-2 0Z"/></svg>
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.tiktok.com/@usesentinelai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn-hover flex items-center gap-3 px-5 py-2.5 font-semibold bg-white border border-gray-200 text-gray-700 shadow-lg transition-all duration-200 hover:-translate-y-1 rounded-full"
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="inline-block"><path d="M16.5 2a1 1 0 0 0-1 1v12.25a2.75 2.75 0 1 1-2.75-2.75 1 1 0 1 0 0-2A4.75 4.75 0 1 0 17.5 17V8.56a7.03 7.03 0 0 0 3 0V6.5a1 1 0 0 0-1-1c-1.1 0-2-.9-2-2a1 1 0 0 0-1-1Z"/></svg>
                  <span>TikTok</span>
                </a>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
      <RandomGrid />
    </main>
  );
}
