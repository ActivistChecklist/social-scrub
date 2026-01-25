'use client';

import { useEffect, useState } from 'react';
import { Sparkles, PartyPopper } from 'lucide-react';

interface CelebrationProps {
  show: boolean;
  onComplete?: () => void;
}

// Simple confetti-like celebration animation
export default function Celebration({ show, onComplete }: CelebrationProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([]);

  useEffect(() => {
    if (show) {
      // Generate more particles, concentrated in the center
      const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'];
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        // Concentrate particles more toward the center (20-80% range)
        x: 20 + Math.random() * 60,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setParticles(newParticles);

      // Cleanup after animation
      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 2800);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show && particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-fall"
          style={{
            left: `${particle.x}%`,
            top: '-20px',
            animationDelay: `${particle.delay}s`,
            color: particle.color,
          }}
        >
          {particle.id % 2 === 0 ? (
            <Sparkles size={24} />
          ) : (
            <PartyPopper size={24} />
          )}
        </div>
      ))}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall 2.2s ease-in forwards;
        }
      `}</style>
    </div>
  );
}

// Hook to determine if we should show celebration
// Research suggests celebrating every 3-5 completions is optimal for engagement
// without being annoying. We'll celebrate on first completion, then every 3rd.
export function useCelebration(completedCount: number): boolean {
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Reset when completedCount changes
    setHasShown(false);
  }, [completedCount]);

  // Celebrate on first completion, then every 3rd, and on completing all
  const shouldCelebrate = !hasShown && (
    completedCount === 1 ||
    completedCount % 3 === 0 ||
    completedCount >= 8 // All steps complete
  );

  return shouldCelebrate;
}
