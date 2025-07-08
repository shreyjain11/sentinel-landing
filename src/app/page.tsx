"use client";
import React, { useState, useRef, useEffect } from "react";
import "./globals.css";
import { useForm } from "react-hook-form";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Move typewriterPhrases outside the component
const typewriterPhrases = [
  "Never forget to cancel a free trial again.",
  "AI-powered trial tracking.",
  "Smart notifications before charges.",
  "One-click cancellation.",
  "Save money on unwanted subscriptions.",
  "Effortless subscription management.",
  "Usage analytics for smarter decisions.",
  "Personalized offers and alternatives.",
  "Your privacy, our priority.",
  "Gamify your savings journey.",
  "Integrates with your favorite tools.",
  "Smarter tracking. Safer spending.",
];

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout;
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
    <span className="font-medium text-xl md:text-2xl text-center min-h-[2.5em] mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-800 select-none leading-[1.2] drop-shadow-[0_2px_12px_rgba(34,197,94,0.3)]">
      {displayed}|
    </span>
  );
}

function ParallaxBlobs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setCoords({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 12+ blobs, organic positions, different sizes/colors/movement
  const blobs = [
    { style: { background: "radial-gradient(circle at 50% 50%, #6366f1 0%, #a855f7 80%, transparent 100%)", width: 340, height: 340, filter: "blur(60px)", opacity: 0.32, left: `calc(2% + ${(coords.x - 0.5) * 120}px)`, top: `calc(8% + ${(coords.y - 0.5) * 80}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #f472b6 0%, #a855f7 80%, transparent 100%)", width: 120, height: 120, filter: "blur(30px)", opacity: 0.18, left: `calc(80% + ${(coords.x - 0.5) * 60}px)`, top: `calc(5% + ${(coords.y - 0.5) * 40}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #34d399 0%, #6366f1 80%, transparent 100%)", width: 180, height: 180, filter: "blur(40px)", opacity: 0.15, left: `calc(10% + ${(coords.x - 0.5) * 200}px)`, top: `calc(80% + ${(coords.y - 0.5) * 120}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #a855f7 0%, #6366f1 80%, transparent 100%)", width: 320, height: 320, filter: "blur(80px)", opacity: 0.22, left: `calc(70% + ${(coords.x - 0.5) * 100}px)`, top: `calc(60% + ${(coords.y - 0.5) * 120}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #fbbf24 0%, #a855f7 80%, transparent 100%)", width: 100, height: 100, filter: "blur(30px)", opacity: 0.13, left: `calc(90% + ${(coords.x - 0.5) * 80}px)`, top: `calc(90% + ${(coords.y - 0.5) * 80}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #60a5fa 0%, #a855f7 80%, transparent 100%)", width: 200, height: 200, filter: "blur(50px)", opacity: 0.18, left: `calc(45% + ${(coords.x - 0.5) * 60}px)`, top: `calc(40% + ${(coords.y - 0.5) * 60}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #a855f7 0%, #f472b6 80%, transparent 100%)", width: 90, height: 90, filter: "blur(20px)", opacity: 0.12, left: `calc(5% + ${(coords.x - 0.5) * 100}px)`, top: `calc(95% + ${(coords.y - 0.5) * 60}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #f59e42 0%, #a855f7 80%, transparent 100%)", width: 160, height: 160, filter: "blur(40px)", opacity: 0.14, left: `calc(15% + ${(coords.x - 0.5) * 120}px)`, top: `calc(60% + ${(coords.y - 0.5) * 100}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #60a5fa 0%, #6366f1 80%, transparent 100%)", width: 260, height: 260, filter: "blur(70px)", opacity: 0.19, left: `calc(80% + ${(coords.x - 0.5) * 120}px)`, top: `calc(80% + ${(coords.y - 0.5) * 120}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #34d399 0%, #60a5fa 80%, transparent 100%)", width: 80, height: 80, filter: "blur(20px)", opacity: 0.10, left: `calc(2% + ${(coords.x - 0.5) * 60}px)`, top: `calc(2% + ${(coords.y - 0.5) * 40}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #f472b6 0%, #a21caf 80%, transparent 100%)", width: 150, height: 150, filter: "blur(30px)", opacity: 0.15, left: `calc(70% + ${(coords.x - 0.5) * 80}px)`, top: `calc(45% + ${(coords.y - 0.5) * 60}px)` } },
    { style: { background: "radial-gradient(circle at 50% 50%, #60a5fa 0%, #6366f1 80%, transparent 100%)", width: 100, height: 100, filter: "blur(25px)", opacity: 0.11, left: `calc(25% + ${(coords.x - 0.5) * 40}px)`, top: `calc(55% + ${(coords.y - 0.5) * 40}px)` } },
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 -z-20 pointer-events-none">
      {blobs.map((blob, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...blob.style,
            borderRadius: "50%",
            transition: "left 0.3s cubic-bezier(.4,2,.6,1), top 0.3s cubic-bezier(.4,2,.6,1)",
            zIndex: -20,
          }}
        />
      ))}
    </div>
  );
}

function GlassNoiseOverlay() {
  // Implementation of GlassNoiseOverlay component
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* GlassNoiseOverlay content */}
    </div>
  );
}

function AnimatedLogo() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);
  return (
    <span className={`rounded-full p-2 bg-gradient-to-br from-green-600/60 to-green-900/60 shadow-[0_0_32px_8px_rgba(34,197,94,0.25)] animate-pulse transition-all duration-700 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
      style={{ display: 'inline-block' }}>
      <img src="/sentinal-logo.png" alt="Sentinal Logo" width={60} height={60} className="mx-auto" />
    </span>
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

function GreenGlowCursor() {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <div
        style={{
          position: "absolute",
          left: pos.x - 22,
          top: pos.y - 22,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.22) 0%, rgba(34,197,94,0.10) 70%, transparent 100%)",
          boxShadow: "0 0 32px 12px rgba(34,197,94,0.18)",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "left 0.02s linear, top 0.02s linear",
        }}
      />
    </div>
  );
}

function SuccessCheckmark({ show }: { show: boolean }) {
  return show ? (
    <div className="flex items-center justify-center mt-4">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="animate-pop">
        <circle cx="20" cy="20" r="18" stroke="#22c55e" strokeWidth="3" fill="#22c55e22" />
        <path d="M13 21l5 5 9-9" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  ) : null;
}

function GreenParticlesBackground() {
  const [particles, setParticles] = useState<{
    width: number;
    height: number;
    left: number;
    top: number;
    opacity: number;
    anim: number;
  }[] | null>(null);

  useEffect(() => {
    // Only run on client
    const arr = Array.from({ length: 18 }).map((_, i) => ({
      width: 18 + (i % 4) * 8,
      height: 18 + (i % 4) * 8,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: 0.7 - (i % 3) * 0.2,
      anim: (i % 3) + 1,
    }));
    setParticles(arr);
  }, []);

  if (!particles) return null;

  return (
    <div className="fixed inset-0 -z-30 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full bg-green-500/20 animate-float${p.anim}`}
          style={{
            width: `${p.width}px`,
            height: `${p.height}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            filter: 'blur(2px)',
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

function GreenBlobsBackground() {
  // 3 large animated green blobs, more visible
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute left-[-10vw] top-[-10vh] w-[40vw] h-[40vw] rounded-full bg-green-500/60 blur-3xl animate-blob1" />
      <div className="absolute right-[-12vw] top-[30vh] w-[45vw] h-[45vw] rounded-full bg-green-400/50 blur-3xl animate-blob2" />
      <div className="absolute left-[20vw] bottom-[-15vh] w-[35vw] h-[35vw] rounded-full bg-green-700/40 blur-2xl animate-blob3" />
    </div>
  );
}

function StarfieldBackground() {
  const [stars, setStars] = useState<{
    left: number;
    top: number;
    size: number;
    twinkle: number;
  }[] | null>(null);

  useEffect(() => {
    const arr = Array.from({ length: 48 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1.2 + Math.random() * 1.8,
      twinkle: Math.floor(Math.random() * 3) + 1,
    }));
    setStars(arr);
  }, []);

  if (!stars) return null;

  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      {stars.map((s, idx) => (
        <div
          key={idx}
          className={`absolute rounded-full bg-white animate-twinkle${s.twinkle}`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `24px`,
            height: `24px`,
            opacity: 1,
            border: '2px solid #22c55e',
            boxShadow: '0 0 12px 4px #22c55e33, 0 0 2px 1px #fff',
            filter: 'none',
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    setError(null);
    setSubmitted(false);
    try {
      await addDoc(collection(db, "waitlist"), {
        email: data.email,
        timestamp: serverTimestamp(),
      });
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 2000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center text-white font-sans transition-colors duration-500 bg-black">
      <StarfieldBackground />
      {/* Tailwind safelist for twinkle classes */}
      <div className="hidden animate-twinkle1 animate-twinkle2 animate-twinkle3" />
      <GreenBlobsBackground />
      <GreenParticlesBackground />
      <GreenGlowCursor />
      <ParallaxBlobs />
      <GlassNoiseOverlay />
      <div className="flex flex-col items-center gap-8 px-4 py-16 w-full">
        <FadeInSection delay={100}>
          <h1
            className="premium-heading text-5xl md:text-7xl font-extrabold text-center tracking-tight drop-shadow-lg mb-2 relative select-none text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-800 leading-[1.2]"
          >
            Sentinal
          </h1>
        </FadeInSection>
        <FadeInSection delay={300}>
          <AnimatedLogo />
        </FadeInSection>
        <FadeInSection delay={500}>
          <span className="premium-heading text-xl md:text-2xl text-center text-green-300 mb-2 font-semibold tracking-wide">The effortless way to manage free trials and subscriptions.</span>
        </FadeInSection>
        <FadeInSection delay={700}>
          <Typewriter />
        </FadeInSection>
        <FadeInSection delay={900}>
          <div className="flex flex-col items-center gap-6 w-full max-w-xl">
            <div className="bg-zinc-900/60 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-green-900/60 flex flex-col items-center w-full">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-3 items-center w-full justify-center">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                  className="px-4 py-2 rounded-lg bg-zinc-900 text-white border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 w-64 md:w-72 shadow-md"
                />
                <button
                  type="submit"
                  className="px-7 py-2 rounded-lg font-bold shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 bg-gradient-to-r from-green-600 to-green-800 text-white hover:from-green-500 hover:to-green-700 focus:shadow-[0_0_16px_4px_rgba(34,197,94,0.5)] hover:shadow-[0_0_24px_8px_rgba(34,197,94,0.7)] animate-glow active:scale-95"
                >
                  {submitted ? "Added!" : "Join the Waitlist"}
                </button>
              </form>
              {errors.email && (
                <div className="text-green-400 text-sm mt-2">Please enter a valid email.</div>
              )}
              {error && (
                <div className="text-green-400 text-sm mt-2">{error}</div>
              )}
              <SuccessCheckmark show={submitted} />
            </div>
            {/* Social buttons */}
            <div className="flex flex-col gap-2 w-full items-center">
              <a
                href="https://www.instagram.com/use.sentinel/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2 rounded-full font-semibold bg-zinc-900/80 border border-green-700 text-green-300 hover:bg-green-700/20 hover:text-green-100 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_16px_4px_rgba(34,197,94,0.25)]"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 0A5.75 5.75 0 0 0 2 7.75Zm8.5 0A5.75 5.75 0 0 1 22 7.75Zm0 20A5.75 5.75 0 0 0 22 16.25Zm-8.5 0A5.75 5.75 0 0 1 2 16.25Zm3.75-7.25a3.5 3.5 0 1 0 7 0a3.5 3.5 0 0 0-7 0Zm7.25-4.25a1 1 0 1 0 2 0a1 1 0 0 0-2 0Z"/></svg>
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@use.sentinel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2 rounded-full font-semibold bg-zinc-900/80 border border-green-700 text-green-300 hover:bg-green-700/20 hover:text-green-100 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_16px_4px_rgba(34,197,94,0.25)]"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="inline-block"><path d="M16.5 2a1 1 0 0 0-1 1v12.25a2.75 2.75 0 1 1-2.75-2.75 1 1 0 1 0 0-2A4.75 4.75 0 1 0 17.5 17V8.56a7.03 7.03 0 0 0 3 0V6.5a1 1 0 0 0-1-1c-1.1 0-2-.9-2-2a1 1 0 0 0-1-1Z"/></svg>
                TikTok
              </a>
            </div>
          </div>
        </FadeInSection>
      </div>
    </main>
  );
}
