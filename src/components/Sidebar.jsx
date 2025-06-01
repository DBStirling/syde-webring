import React, { useEffect, useState } from 'react';

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

  return (
    <div
      className={`fixed top-0 right-0 w-[40vw] max-w-[600px] min-w-[400px] h-screen z-25 bg-[#161616] border-l border-[#333333] overflow-y-auto
        transform transition-transform duration-500 ease-in-out
        ${visible ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="relative py-[120px] flex flex-col gap-10">
        {/* Header */}
        <div className={`border-l-[6px]`} style={{ borderColor: node.color || '#868686' }}>
          <div className="pl-[64px] flex flex-col gap-[4px] text-[#c9c9c9] w-full font-['Space_Grotesk'] leading-none font-light uppercase">
            <div className="ml-[3px] text-[20px]">{node.fullName?.split(' ')[0]}</div>
            <div className="text-[40px]">
              {node.fullName?.split(' ').slice(1).join(' ') || ''}
            </div>
          </div>
        </div>

        <div className="px-[74px] flex flex-col gap-5 font-space-grotesk">
          {/* Website */}
          {node.website && (
            <div className="flex flex-col">
              <div className="text-[14px] text-[#3e3e3e]">WEBSITE</div>
              <a
                href={node.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[20px] text-[#c9c9c9] font-light underline break-all"
              >
                {node.website}
              </a>
            </div>
          )}

          <div className="h-0 border border-[#333]" />

          {/* Skills */}
          <div className="flex flex-col gap-6">
            {Object.entries(node.skills || {}).map(([label, value], idx) =>
              value ? (
                <div key={idx} className="flex flex-col w-fit">
                  <div className="text-[14px] text-[#3e3e3e] font-light">{label.toUpperCase()}</div>
                  <div className="text-[20px] text-[#c9c9c9] font-light">{value}</div>
                </div>
              ) : null
            )}
          </div>

          <div className="h-0 border border-[#333]" />

          {/* Bio */}
          {node.bio && (
            <div className="flex flex-col gap-2">
              <div className="text-[14px] text-[#3e3e3e] uppercase tracking-wider">Bio</div>
              <div className="text-[20px] leading-[28px] text-[#c9c9c9] font-light whitespace-pre-line break-words">
                {node.bio}
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 400); // wait for animation to finish
        }}
        className="absolute top-4 right-4 text-[#868686] hover:text-white text-[30px] font-light leading-none"
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
};

export default Sidebar;
