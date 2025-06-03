import React, { useEffect, useState } from 'react';
import getNodeColor from '../utils/getNodeColor';

const Sidebar = ({ node, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setVisible(false);
        setTimeout(onClose, 400); // same delay as close button
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!node) return null;

  const year = node.year?.toString().slice(-2) || '';
  const yearDisplay = `'${year[0]}\n${year[1] || ''}`;

  return (
    <div
      className={`fixed top-0 right-0 w-full lg:w-[40vw] lg:max-w-[600px] lg:min-w-[400px] h-screen z-51 lg:z-51 bg-[#161616] border-l border-[#333333] overflow-y-auto
        transform transition-transform duration-500 ease-in-out overflow-x-hidden
        ${visible ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {/* Year in top-right corner */}
      {year && (
        <div className="absolute top-[-48px] right-[-80px] text-[#3e3e3e] font-light text-4xl leading-[224px] whitespace-pre font-space-grotesk text-right text-[#333]">
          {yearDisplay}
        </div>
      )}

      <div className="relative py-[40px] lg:py-[68px] flex flex-col gap-10">
        {/* Header */}
        <div className={`border-l-[6px]`} style={{ borderColor: getNodeColor(node) || '#555' }}>
          <div className="pl-[32px] lg:pl-[64px] flex flex-col gap-[4px] text-[#c9c9c9] w-full font-['Space_Grotesk'] leading-none font-light uppercase">
            <div className="ml-[3px] text-base">{node.fullName?.split(' ')[0]}</div>
            <div className="text-xl">
              {node.fullName?.split(' ').slice(1).join(' ') || ''}
            </div>
          </div>
        </div>

        <div className="px-[40px] lg:px-[74px] flex flex-col gap-5 font-space-grotesk">
          {node.website && (
            <div className="flex flex-col">
              <div className="text-xs text-[#3e3e3e]">WEBSITE</div>
              <a
                href={node.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm lg:text-base text-[#c9c9c9] font-light underline break-all"
              >
                {node.website}
              </a>
            </div>
          )}

          {/* <div className="h-0 border border-[#333]" /> */}

          <div className="flex flex-col gap-6">
            {Object.entries(node.skills || {}).map(([label, value], idx) =>
              value ? (
                <div key={idx} className="flex flex-col w-fit">
                  <div className="text-xs text-[#3e3e3e] font-light">{label.toUpperCase()}</div>
                  <div className="text-sm lg:text-base text-[#c9c9c9] font-light">{value}</div>
                </div>
              ) : null
            )}
          </div>

          {/* <div className="h-0 border border-[#333]" /> */}

          {node.bio && (
            <div className="flex flex-col">
              <div className="text-xs text-[#3e3e3e] uppercase tracking-wider">Bio</div>
              <div className="text-sm lg:text-base leading-[28px] text-[#c9c9c9] font-light whitespace-pre-line break-words">
                {node.bio}
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 400);
        }}
        className="absolute top-4 right-4 text-[#868686] hover:text-white text-lg font-light leading-none"
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
};

export default Sidebar;
