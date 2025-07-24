"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
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

function SmoothFilledOrganicCurveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);

  // Animation loop
  const animate = (currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Cap at 30fps for performance
    if (currentTime - lastTimeRef.current < 33.33) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastTimeRef.current = currentTime;

    const { width, height } = canvas;
    const time = currentTime * 0.001;

    // Clear canvas
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, width, height);

    // Create filled organic curves
    for (let i = 0; i < 3; i++) {
      const offset = i * 0.6;
      const amplitude = 80 + Math.sin(time * 0.3 + i) * 30;
      const frequency = 0.012 + Math.sin(time * 0.2 + i) * 0.002;
      
      ctx.beginPath();
      
      // Start the filled curve at the top
      const startY = height * 0.2 + Math.sin(time * 0.4 + offset) * 40;
      ctx.moveTo(0, startY);
      
      // Create the top edge of the filled curve
      for (let x = 0; x < width; x += 1) {
        const y = height * 0.2 + 
                  Math.sin(x * frequency + time * 0.6 + offset) * amplitude +
                  Math.sin(x * frequency * 0.7 + time * 0.8 + offset) * amplitude * 0.4 +
                  Math.sin(x * frequency * 0.3 + time * 1.2 + offset) * amplitude * 0.2;
        
        ctx.lineTo(x, y);
      }
      
      // Complete the filled shape by going to bottom and back
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      
      // Create gradient for the filled curve
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, `rgba(147, 51, 234, ${0.15 - i * 0.03})`);
      gradient.addColorStop(0.3, `rgba(99, 102, 241, ${0.2 - i * 0.03})`);
      gradient.addColorStop(0.7, `rgba(139, 92, 250, ${0.18 - i * 0.03})`);
      gradient.addColorStop(1, `rgba(147, 51, 234, ${0.15 - i * 0.03})`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // Add subtle floating particles
    for (let i = 0; i < 12; i++) {
      const x = (Math.sin(time * 0.2 + i * 0.8) * 0.5 + 0.5) * width;
      const y = (Math.cos(time * 0.3 + i * 0.6) * 0.5 + 0.5) * height;
      const size = Math.sin(time + i) * 2 + 3;
      const opacity = Math.sin(time * 0.6 + i) * 0.2 + 0.1;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(147, 197, 253, ${opacity})`;
      ctx.fill();
    }

    // Add subtle glow overlay
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = 'rgba(147, 51, 234, 0.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';

    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle resize
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  // Handle visibility change
  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    } else {
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame((time) => animate(time));
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Start animation
    animationRef.current = requestAnimationFrame((time) => animate(time));

    // Add event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: -10,
        opacity: 0.6,
        mixBlendMode: 'screen'
      }}
    />
  );
}

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
    <div className="relative text-center min-h-[2.5em] mb-4">
      {/* Enhanced typewriter text with better contrast */}
      <span className="font-heading font-medium text-xl md:text-2xl text-white select-none leading-[1.2] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
        {displayed}
      </span>
      {/* Enhanced cursor */}
      <span className="cursor text-white font-normal drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">
        |
      </span>
    </div>
  );
}

function AnimatedLogo() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);
  return (
    <div className={`relative transition-all duration-700 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
      {/* More subtle multi-layer glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-indigo-600/10 blur-xl animate-pulse" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/15 to-indigo-500/10 blur-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400/10 to-purple-500/5 blur-md animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Smaller, more refined logo container */}
      <div className="relative rounded-full p-3 bg-gradient-to-br from-slate-900/60 via-blue-900/40 to-indigo-900/30 backdrop-blur-lg border border-cyan-500/20 shadow-[0_0_30px_8px_rgba(34,211,238,0.15)]">
        <Image 
          src="/sentinel-logo.png" 
          alt="Sentinel Logo" 
          width={40} 
          height={40} 
          className="mx-auto drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" 
        />
      </div>
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
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="animate-pop">
        <circle cx="20" cy="20" r="18" stroke="#22d3ee" strokeWidth="3" fill="#22d3ee22" />
        <path d="M13 21l5 5 9-9" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  ) : null;
}

function RandomMovingOrganicShapesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const shapesRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    rotation: number;
    rotationSpeed: number;
    points: number;
    timeOffset: number;
  }>>([]);

  // Initialize random shapes
  const initializeShapes = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas;
    shapesRef.current = [];

    // Create 8-12 random organic shapes
    const numShapes = 8 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < numShapes; i++) {
      shapesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 60 + Math.random() * 120,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        points: 6 + Math.floor(Math.random() * 4),
        timeOffset: Math.random() * Math.PI * 2
      });
    }
  };

  // Create organic shape path
  const createOrganicShape = (ctx: CanvasRenderingContext2D, shape: any, time: number) => {
    const { x, y, size, rotation, points, timeOffset } = shape;
    
    ctx.beginPath();
    
    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2 + rotation;
      const radius = size * (0.7 + Math.sin(time * 0.5 + timeOffset + i * 0.5) * 0.3);
      
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        // Create smooth curves between points
        const prevAngle = ((i - 1) / points) * Math.PI * 2 + rotation;
        const prevRadius = size * (0.7 + Math.sin(time * 0.5 + timeOffset + (i - 1) * 0.5) * 0.3);
        const prevX = x + Math.cos(prevAngle) * prevRadius;
        const prevY = y + Math.sin(prevAngle) * prevRadius;
        
        const cpX = (prevX + px) / 2 + Math.sin(time * 0.3 + i) * 10;
        const cpY = (prevY + py) / 2 + Math.cos(time * 0.3 + i) * 10;
        
        ctx.quadraticCurveTo(cpX, cpY, px, py);
      }
    }
    
    ctx.closePath();
  };

  // Animation loop
  const animate = (currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Cap at 30fps for performance
    if (currentTime - lastTimeRef.current < 33.33) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastTimeRef.current = currentTime;

    const { width, height } = canvas;
    const time = currentTime * 0.001;

    // Clear canvas
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, width, height);

    // Update and draw shapes
    shapesRef.current.forEach((shape, index) => {
      // Update position
      shape.x += shape.speedX;
      shape.y += shape.speedY;
      shape.rotation += shape.rotationSpeed;

      // Bounce off edges
      if (shape.x < shape.size || shape.x > width - shape.size) {
        shape.speedX *= -1;
        shape.x = Math.max(shape.size, Math.min(width - shape.size, shape.x));
      }
      if (shape.y < shape.size || shape.y > height - shape.size) {
        shape.speedY *= -1;
        shape.y = Math.max(shape.size, Math.min(height - shape.size, shape.y));
      }

      // Create organic shape
      createOrganicShape(ctx, shape, time);

      // Create gradient for the shape
      const gradient = ctx.createRadialGradient(
        shape.x, shape.y, 0,
        shape.x, shape.y, shape.size
      );
      
      const hue = (index * 60 + time * 20) % 360;
      gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, 0.3)`);
      gradient.addColorStop(0.7, `hsla(${hue + 30}, 70%, 50%, 0.2)`);
      gradient.addColorStop(1, `hsla(${hue + 60}, 70%, 40%, 0.1)`);

      ctx.fillStyle = gradient;
      ctx.fill();
    });

    // Add subtle floating particles
    for (let i = 0; i < 15; i++) {
      const x = (Math.sin(time * 0.2 + i * 0.7) * 0.5 + 0.5) * width;
      const y = (Math.cos(time * 0.3 + i * 0.5) * 0.5 + 0.5) * height;
      const size = Math.sin(time + i) * 2 + 2;
      const opacity = Math.sin(time * 0.6 + i) * 0.15 + 0.05;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(147, 197, 253, ${opacity})`;
      ctx.fill();
    }

    // Add subtle glow overlay
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = 'rgba(147, 51, 234, 0.03)';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';

    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle resize
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeShapes();
  };

  // Handle visibility change
  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    } else {
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame((time) => animate(time));
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize shapes
    initializeShapes();

    // Start animation
    animationRef.current = requestAnimationFrame((time) => animate(time));

    // Add event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: -10,
        opacity: 0.7,
        mixBlendMode: 'screen'
      }}
    />
  );
}

function OrganicFlowingBlobsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const blobsRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    timeOffset: number;
    complexity: number;
  }>>([]);

  // Initialize organic blobs
  const initializeBlobs = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas;
    blobsRef.current = [];

    // Create 4-6 large organic blobs
    const numBlobs = 4 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < numBlobs; i++) {
      blobsRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 150 + Math.random() * 200,
        speedX: (Math.random() - 0.5) * 4,
        speedY: (Math.random() - 0.5) * 4,
        timeOffset: Math.random() * Math.PI * 2,
        complexity: 32 + Math.floor(Math.random() * 16)
      });
    }
  };

  // Create organic blob path
  const createOrganicBlob = (ctx: CanvasRenderingContext2D, blob: any, time: number) => {
    const { x, y, size, timeOffset, complexity } = blob;
    
    ctx.beginPath();
    
    // Create very smooth, round blob using many points and gentle sine waves
    for (let i = 0; i <= complexity; i++) {
      const angle = (i / complexity) * Math.PI * 2;
      const radius = size * (
        0.9 + 
        Math.sin(angle * 1.5 + time * 0.6 + timeOffset) * 0.08 +
        Math.sin(angle * 2.5 + time * 0.4 + timeOffset * 0.6) * 0.05 +
        Math.sin(angle * 3.5 + time * 0.8 + timeOffset * 1.1) * 0.03 +
        Math.sin(angle * 4.5 + time * 0.3 + timeOffset * 1.4) * 0.02
      );
      
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        // Create very smooth curves between points
        const prevAngle = ((i - 1) / complexity) * Math.PI * 2;
        const prevRadius = size * (
          0.9 + 
          Math.sin(prevAngle * 1.5 + time * 0.6 + timeOffset) * 0.08 +
          Math.sin(prevAngle * 2.5 + time * 0.4 + timeOffset * 0.6) * 0.05 +
          Math.sin(prevAngle * 3.5 + time * 0.8 + timeOffset * 1.1) * 0.03 +
          Math.sin(prevAngle * 4.5 + time * 0.3 + timeOffset * 1.4) * 0.02
        );
        const prevX = x + Math.cos(prevAngle) * prevRadius;
        const prevY = y + Math.sin(prevAngle) * prevRadius;
        
        // Create very smooth control points with minimal variation
        const cpX = (prevX + px) / 2 + Math.sin(time * 0.4 + i * 0.2) * 8;
        const cpY = (prevY + py) / 2 + Math.cos(time * 0.4 + i * 0.2) * 8;
        
        ctx.quadraticCurveTo(cpX, cpY, px, py);
      }
    }
    
    ctx.closePath();
  };

  // Animation loop
  const animate = (currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Cap at 30fps for performance
    if (currentTime - lastTimeRef.current < 33.33) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastTimeRef.current = currentTime;

    const { width, height } = canvas;
    const time = currentTime * 0.001;

    // Clear canvas
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, width, height);

    // Update and draw blobs
    blobsRef.current.forEach((blob, index) => {
      // Update position with faster, more dynamic movement
      blob.x += blob.speedX + Math.sin(time * 0.5 + blob.timeOffset) * 2.5;
      blob.y += blob.speedY + Math.cos(time * 0.6 + blob.timeOffset) * 2.5;

      // Add more dynamic movement patterns
      blob.x += Math.sin(time * 0.3 + blob.timeOffset * 0.5) * 1.5;
      blob.y += Math.cos(time * 0.4 + blob.timeOffset * 0.7) * 1.5;

      // Wrap around edges with more dynamic positioning
      if (blob.x < -blob.size) blob.x = width + blob.size;
      if (blob.x > width + blob.size) blob.x = -blob.size;
      if (blob.y < -blob.size) blob.y = height + blob.size;
      if (blob.y > height + blob.size) blob.y = -blob.size;

      // Create organic blob
      createOrganicBlob(ctx, blob, time);

      // Create gradient for the blob
      const gradient = ctx.createRadialGradient(
        blob.x, blob.y, 0,
        blob.x, blob.y, blob.size
      );
      
      // Use purple, blue, indigo color scheme
      if (index % 3 === 0) {
        // Purple gradient
        gradient.addColorStop(0, `rgba(147, 51, 234, 0.4)`);
        gradient.addColorStop(0.5, `rgba(168, 85, 247, 0.3)`);
        gradient.addColorStop(1, `rgba(196, 181, 253, 0.1)`);
      } else if (index % 3 === 1) {
        // Blue gradient
        gradient.addColorStop(0, `rgba(59, 130, 246, 0.4)`);
        gradient.addColorStop(0.5, `rgba(96, 165, 250, 0.3)`);
        gradient.addColorStop(1, `rgba(147, 197, 253, 0.1)`);
      } else {
        // Indigo gradient
        gradient.addColorStop(0, `rgba(99, 102, 241, 0.4)`);
        gradient.addColorStop(0.5, `rgba(129, 140, 248, 0.3)`);
        gradient.addColorStop(1, `rgba(165, 180, 252, 0.1)`);
      }

      ctx.fillStyle = gradient;
      ctx.fill();
    });

    // Add enhanced floating particles
    for (let i = 0; i < 35; i++) {
      const x = (Math.sin(time * 0.2 + i * 0.6) * 0.5 + 0.5) * width;
      const y = (Math.cos(time * 0.3 + i * 0.4) * 0.5 + 0.5) * height;
      const size = Math.sin(time + i) * 2 + 3;
      const opacity = Math.sin(time * 0.6 + i) * 0.15 + 0.08;
      const hue = (i * 20 + time * 10) % 360;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue}, 70%, 70%, ${opacity})`;
      ctx.fill();
      
      // Add glow effect to some particles
      if (i % 5 === 0) {
        ctx.beginPath();
        ctx.arc(x, y, size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 70%, 70%, ${opacity * 0.3})`;
        ctx.fill();
      }
    }

    // Add subtle glow overlay
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = 'rgba(147, 51, 234, 0.04)';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';

    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle resize
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeBlobs();
  };

  // Handle visibility change
  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    } else {
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame((time) => animate(time));
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize blobs
    initializeBlobs();

    // Start animation
    animationRef.current = requestAnimationFrame((time) => animate(time));

    // Add event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: -10,
        opacity: 0.6,
        mixBlendMode: 'screen'
      }}
    />
  );
}

function Clock() {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleFormat = () => {
    setIs24Hour(!is24Hour);
  };

  const formatTime = () => {
    if (is24Hour) {
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      const seconds = time.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    } else {
      const hours = time.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const minutes = time.getMinutes().toString().padStart(2, '0');
      const seconds = time.getSeconds().toString().padStart(2, '0');
      return `${displayHours}:${minutes}:${seconds} ${ampm}`;
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <div 
        className="bg-slate-900/80 backdrop-blur-xl rounded-xl px-4 py-2 border border-cyan-500/30 shadow-lg cursor-pointer transition-all duration-200 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:border-cyan-400/50"
        onClick={toggleFormat}
      >
        <div className="font-mono text-2xl font-bold text-cyan-400 tracking-wider drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
          {formatTime()}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Let the form submit naturally to Formspree
    // Show confetti after a short delay
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 9999,
        colors: ['#22d3ee', '#3b82f6', '#6366f1', '#8b5cf6']
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    }, 100);
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center text-white font-sans transition-colors duration-500">
      <OrganicFlowingBlobsBackground />
      <Clock />
      <div className="flex flex-col items-center gap-8 px-4 py-16 w-full">
        <FadeInSection delay={100}>
          <h1
            className="font-heading text-5xl md:text-7xl font-extrabold text-center tracking-tight drop-shadow-lg mb-2 relative select-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 leading-[1.2]"
          >
            Sentinel
          </h1>
        </FadeInSection>
        <FadeInSection delay={300}>
          <AnimatedLogo />
        </FadeInSection>
        <FadeInSection delay={500}>
          <span className="font-body text-xl md:text-2xl text-center text-white mb-2 font-semibold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">The effortless way to manage free trials and subscriptions.</span>
        </FadeInSection>
        <FadeInSection delay={700}>
          <Typewriter />
        </FadeInSection>
        <FadeInSection delay={900}>
          <div className="flex flex-col items-center gap-6 w-full max-w-xl">
            <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-cyan-500/30 flex flex-col items-center w-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:border-cyan-400/50 hover:scale-[1.02] hover:bg-slate-900/90">
              <form 
                action="https://formspree.io/f/xyzjrazr"
                method="POST"
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row gap-3 items-center w-full justify-center"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email. Save money. Get lit."
                  className="px-4 py-3 rounded-lg bg-slate-800/80 text-white border border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 w-80 md:w-96 shadow-lg backdrop-blur-sm transition-all duration-200 focus:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg font-bold shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.4)] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-500 active:scale-95 drop-shadow-[0_4px_12px_rgba(34,211,238,0.3)]"
                >
                  {submitted ? "Added!" : "Be the first to know"}
                </button>
              </form>
              <SuccessCheckmark show={submitted} />
            </div>
            {/* Enhanced social buttons */}
            <div className="flex flex-col gap-3 w-full items-center">
              <a
                href="https://www.instagram.com/usesentinelai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-full font-semibold bg-slate-800/80 border border-cyan-500/50 text-cyan-200 hover:bg-cyan-500/20 hover:text-cyan-100 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(34,211,238,0.3)] backdrop-blur-sm"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 0A5.75 5.75 0 0 0 2 7.75Zm8.5 0A5.75 5.75 0 0 1 22 7.75Zm0 20A5.75 5.75 0 0 0 22 16.25Zm-8.5 0A5.75 5.75 0 0 1 2 16.25Zm3.75-7.25a3.5 3.5 0 1 0 7 0a3.5 3.5 0 0 0-7 0Zm7.25-4.25a1 1 0 1 0 2 0a1 1 0 0 0-2 0Z"/></svg>
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@usesentinelai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-full font-semibold bg-slate-800/80 border border-cyan-500/50 text-cyan-200 hover:bg-cyan-500/20 hover:text-cyan-100 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(34,211,238,0.3)] backdrop-blur-sm"
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
