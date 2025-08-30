import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16', 
    lg: 'w-20 h-20'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#bbf7d0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="1" />
          </linearGradient>
          
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.3" />
          </linearGradient>

          <filter id="glass-effect">
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.1 0"/>
          </filter>
        </defs>

        {/* Background Circle with Glass Effect */}
        <circle
          cx="60"
          cy="60"
          r="55"
          fill="rgba(255, 255, 255, 0.1)"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1"
          filter="url(#glass-effect)"
        />

        {/* Flowing Wave Background */}
        <path
          d="M10 90 Q30 80, 50 85 T90 80 Q100 85, 110 90 L110 110 L10 110 Z"
          fill="url(#flowGradient)"
          opacity="0.6"
        />

        {/* House Structure */}
        {/* House Base */}
        <rect
          x="35"
          y="55"
          width="50"
          height="35"
          rx="4"
          fill="url(#houseGradient)"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1"
        />

        {/* Roof */}
        <path
          d="M30 55 L60 35 L90 55 L85 55 L60 40 L35 55 Z"
          fill="url(#houseGradient)"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1"
        />

        {/* Door */}
        <rect
          x="55"
          y="70"
          width="10"
          height="20"
          rx="2"
          fill="rgba(59, 130, 246, 0.7)"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="0.5"
        />

        {/* Door Handle */}
        <circle
          cx="62"
          cy="80"
          r="1"
          fill="rgba(255, 255, 255, 0.8)"
        />

        {/* Windows */}
        <rect
          x="40"
          y="65"
          width="8"
          height="8"
          rx="1"
          fill="rgba(59, 130, 246, 0.6)"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="0.5"
        />
        
        <rect
          x="72"
          y="65"
          width="8"
          height="8"
          rx="1"
          fill="rgba(59, 130, 246, 0.6)"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="0.5"
        />

        {/* Window Cross Patterns */}
        <line x1="44" y1="65" x2="44" y2="73" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.5" />
        <line x1="40" y1="69" x2="48" y2="69" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.5" />
        <line x1="76" y1="65" x2="76" y2="73" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.5" />
        <line x1="72" y1="69" x2="80" y2="69" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.5" />

        {/* Chimney */}
        <rect
          x="75"
          y="40"
          width="6"
          height="15"
          rx="1"
          fill="url(#houseGradient)"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="0.5"
        />

        {/* Heart Icon */}
        <g 
          className="heartbeat" 
          style={{ 
            transformOrigin: '60px 25px',
            animation: 'heartbeat 1.5s ease-in-out infinite'
          }}
        >
          <path
            d="M60 30 C57 27, 52 27, 52 32 C52 37, 60 45, 60 45 C60 45, 68 37, 68 32 C68 27, 63 27, 60 30 Z"
            fill="url(#heartGradient)"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1"
          />
          
          {/* Heart Glow Effect */}
          <path
            d="M60 30 C57 27, 52 27, 52 32 C52 37, 60 45, 60 45 C60 45, 68 37, 68 32 C68 27, 63 27, 60 30 Z"
            fill="none"
            stroke="#f87171"
            strokeWidth="0.5"
            opacity="0.6"
            filter="url(#glass-effect)"
          />
        </g>

        {/* Decorative Elements */}
        {/* Small Hearts */}
        <circle cx="25" cy="40" r="2" fill="rgba(248, 113, 113, 0.4)" />
        <circle cx="95" cy="45" r="1.5" fill="rgba(248, 113, 113, 0.3)" />
        
        {/* Sparkle Effects */}
        <g opacity="0.6">
          <circle cx="85" cy="30" r="1" fill="rgba(255, 255, 255, 0.8)" />
          <circle cx="35" cy="25" r="0.8" fill="rgba(255, 255, 255, 0.7)" />
          <circle cx="20" cy="60" r="1.2" fill="rgba(59, 130, 246, 0.5)" />
        </g>
      </svg>
    </div>
  );
}