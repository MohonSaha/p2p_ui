import React, { useEffect, useState, useRef } from "react";

interface TextMarqueeProps {
  speed?: number;
  text?: string;
}

const TextMarquee: React.FC<TextMarqueeProps> = ({
  speed = 1,
  text = "FIND COMFORT, LIVE WITH SAHA AGENCY",
}) => {
  const [position, setPosition] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentWidth, setContentWidth] = useState<number>(0);

  const fullText = `${text} • ${text} • ${text} • `;

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }

    const animate = (): void => {
      setPosition((prevPosition) => {
        // Reset position when text moves completely out of view
        if (Math.abs(prevPosition) >= contentWidth / 3) {
          return 0;
        }
        return prevPosition - speed; // Move text to the left
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    const animationRef: { current: number | null } = { current: null };
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [contentWidth, speed]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white text-black py-4 overflow-hidden"
    >
      <div className="relative whitespace-nowrap">
        <div
          ref={contentRef}
          className="inline-block md:text-7xl text-6xl font-bold tracking-tight"
          style={{ transform: `translateX(${position}px)` }}
        >
          {fullText}
        </div>
        <div
          className="inline-block md:text-7xl text-6xl font-bold tracking-tight"
          style={{ transform: `translateX(${position}px)` }}
        >
          {fullText}
        </div>
        <div
          className="inline-block md:text-7xl text-6xl font-bold tracking-tight"
          style={{ transform: `translateX(${position}px)` }}
        >
          {fullText}
        </div>
      </div>
    </div>
  );
};

export default TextMarquee;
