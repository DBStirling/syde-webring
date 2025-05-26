import React from 'react';

// Optional: import this only if you’ve set up Space Grotesk via Google Fonts or Tailwind
// import { Space_Grotesk } from "next/font/google";
// const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const Sidebar = ({ node, onClose }) => {
    if (!node) return null;

    return (
        <div className="fixed top-0 right-0 w-[40vw] max-w-[600px] h-screen z-49 bg-[#161616] border-l border-[#333333] overflow-y-auto">
        <div className="relative">
            {/* Optional: design background element */}
            <div className="relative py-[120px] flex flex-col gap-10">
            {/* Header with name */}
            <div className={`border-l-[20px]`} style={{ borderColor: node.color || '#868686' }}>
                <div className="pl-[64px] flex flex-col gap-[4px] text-[#c9c9c9] w-full font-['Space_Grotesk'] leading-none font-light uppercase">
                        <div className="ml-[3px] text-[24px]">{node.fullName?.split(' ')[0]}
                        </div>
                        <div className="text-[64px]">
                            {node.fullName?.split(' ').slice(1).join(' ') || ''}
                        </div>
                    </div> 
            </div>

            <div className="pl-[86px] flex flex-col gap-5 font-['Space_Grotesk']">
                {/* Website */}
                {node.website && (
                <div className="flex flex-col">
                    <div className="text-[20px] text-[#3e3e3e]">WEBSITE</div>
                    <a
                    href={node.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[32px] text-[#c9c9c9] font-light underline break-all"
                    >
                    {node.website}
                    </a>
                </div>
                )}

                {/* Divider */}
                <div className="h-0 border border-[#333333]" />

                {/* Skills */}
                <div className="flex flex-col gap-6">
                {Object.entries(node.skills || {}).map(([label, value], idx) =>
                    value ? (
                    <div key={idx} className="flex flex-col w-fit">
                        <div className="text-[20px] text-[#3e3e3e] font-light">{label.toUpperCase()}</div>
                        <div className="text-[32px]  text-[#c9c9c9] font-light">{value}</div>
                    </div>
                    ) : null
                )}
                </div>

                {/* Divider */}
                <div className="h-0 border border-[#333333]" />

                {/* Bio */}
                {node.bio && (
                <div className="flex flex-col gap-2">
                    <div className="text-[20px] text-[#3e3e3e] uppercase tracking-wider">Bio</div>
                    <div className="text-[32px] leading-[28px] text-[#c9c9c9] font-light whitespace-pre-line break-words">
                    {node.bio}
                    </div>
                </div>
                )}
            </div>
            </div>
        </div>

        {/* Close button (optional) */}
        <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#868686] hover:text-white text-[30px] font-light"
            aria-label="Close"
            >
            &times;
        </button>
        </div>
    );
    };

export default Sidebar;
