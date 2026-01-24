import { Shield } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const SIZES = {
  sm: { icon: 16, text: 'text-sm', container: 'w-6 h-6' },
  md: { icon: 20, text: 'text-base', container: 'w-8 h-8' },
  lg: { icon: 24, text: 'text-lg', container: 'w-10 h-10' },
  xl: { icon: 32, text: 'text-xl', container: 'w-14 h-14' },
};

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeConfig = SIZES[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo icon with gradient background */}
      <div
        className={`${sizeConfig.container} rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-sm`}
      >
        <Shield
          size={sizeConfig.icon}
          className="text-white"
          strokeWidth={2.5}
        />
      </div>

      {showText && (
        <span className={`font-semibold text-gray-900 dark:text-gray-100 ${sizeConfig.text}`}>
          Social Scrub
        </span>
      )}
    </div>
  );
}
