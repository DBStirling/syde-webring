import React, { useEffect, useState } from 'react';

const Loading = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 1500); // Show at least 1.5s
    const timer2 = setTimeout(() => onFinish(), 2500); // Allow time for fade out

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 bg-[#161616] flex items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
        <h1 className="text-[256px] font-space-grotesk font-light text-[#555] leading-none flex items-end gap-4">
            SYDE
            <span className="flex gap-[2px] text-[256px]">
            <span className="animate-bounce [animation-delay:.1s]">.</span>
            <span className="animate-bounce [animation-delay:.3s]">.</span>
            <span className="animate-bounce [animation-delay:.5s]">.</span>
            </span>      
        </h1>
    </div>
  );
};

export default Loading;
