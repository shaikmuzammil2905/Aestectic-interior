import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  aspectRatio = 'aspect-[16/10]',
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, handleMove]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`relative select-none overflow-hidden rounded-2xl shadow-lg border border-subtle/80 cursor-ew-resize group focus:outline-none focus:ring-2 focus:ring-gold ${aspectRatio} ${className}`}
      aria-label="Before and after transformation comparison slider"
      role="slider"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* After Image (Background Layer) */}
      <img
        src={afterImage}
        alt="After Transformation"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
      
      {/* After Badge */}
      <div className="absolute bottom-4 right-4 z-10 bg-charcoal/80 backdrop-blur-sm text-softwhite px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow">
        {afterLabel}
      </div>

      {/* Before Image (Foreground Layer with Clip Path) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt="Before Transformation"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        {/* Before Badge */}
        <div className="absolute bottom-4 left-4 z-10 bg-charcoal/80 backdrop-blur-sm text-softwhite px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow">
          {beforeLabel}
        </div>
      </div>

      {/* Vertical Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Circular Handle */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-softwhite border-2 border-gold shadow-xl flex items-center justify-center text-charcoal pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform"
          aria-hidden="true"
        >
          <div className="flex items-center -space-x-1">
            <ChevronLeft className="w-4 h-4 text-espresso" />
            <ChevronRight className="w-4 h-4 text-espresso" />
          </div>
        </div>
      </div>
    </div>
  );
};
