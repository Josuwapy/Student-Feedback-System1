import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value?: number;
  rating?: number;
  onChange?: (val: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  readOnly?: boolean;
  idPrefix?: string;
  id?: string;
}

const RATING_LABELS: Record<number, string> = {
  1: 'Unsatisfactory (1/5)',
  2: 'Fair (2/5)',
  3: 'Good (3/5)',
  4: 'Very Good (4/5)',
  5: 'Outstanding (5/5)',
};

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  rating,
  onChange,
  max = 5,
  size = 'md',
  showLabel = false,
  readOnly = false,
  idPrefix = 'star',
  id
}) => {
  const currentRatingValue = rating ?? value ?? 5;
  const isInteractive = Boolean(onChange) && !readOnly;
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8 sm:w-9 sm:h-9'
  };

  const buttonPaddings = {
    sm: 'p-0.5',
    md: 'p-1 sm:p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center',
    lg: 'p-2 min-w-[44px] min-h-[44px] flex items-center justify-center'
  };

  const activeRating = isInteractive && hoverValue !== null ? hoverValue : currentRatingValue;

  return (
    <div className="flex flex-col gap-1.5" id={id}>
      <div 
        className="flex items-center gap-1" 
        role={isInteractive ? 'radiogroup' : 'img'} 
        aria-label={`Rating: ${currentRatingValue} of ${max}`}
      >
        {Array.from({ length: max }, (_, index) => {
          const starNumber = index + 1;
          const isFilled = starNumber <= activeRating;

          if (!isInteractive) {
            return (
              <span key={starNumber} className="inline-flex text-amber-400">
                <Star
                  className={`${starSizes[size]} ${isFilled ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-300'}`}
                />
              </span>
            );
          }

          return (
            <button
              key={starNumber}
              id={`${idPrefix}-${starNumber}`}
              type="button"
              role="radio"
              aria-checked={currentRatingValue === starNumber}
              aria-label={`${starNumber} star${starNumber > 1 ? 's' : ''}: ${RATING_LABELS[starNumber]}`}
              onClick={() => onChange && onChange(starNumber)}
              onMouseEnter={() => setHoverValue(starNumber)}
              onMouseLeave={() => setHoverValue(null)}
              className={`${buttonPaddings[size]} rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 hover:scale-110 active:scale-95 touch-manipulation`}
            >
              <Star
                className={`${starSizes[size]} transition-colors ${
                  isFilled
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-slate-100 text-slate-300 hover:text-amber-300'
                }`}
              />
            </button>
          );
        })}
      </div>

      {showLabel && (
        <span className="text-xs font-medium text-slate-600 tracking-wide min-h-[16px]">
          {activeRating > 0 ? RATING_LABELS[activeRating] || `${activeRating}/${max}` : 'Select a rating'}
        </span>
      )}
    </div>
  );
};
