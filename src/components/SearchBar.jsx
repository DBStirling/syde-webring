import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, toggleFilterUI }) => {
    return (
        <div className="z-25 flex items-center gap-2 font-light font-space-grotesk w-full pr-8 max-w-full lg:max-w-[324px]">
            <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#1a1a1a]/50 text-white px-4 rounded border border-[#333] placeholder-[#555] outline-none h-[40px] w-full"
            />
            <button
                onClick={toggleFilterUI}
                className="text-sm bg-[#1a1a1a]/50 text-[#868686] px-3 rounded border border-[#333] hover:bg-[#3a3a3a] h-[40px] w-min"
                aria-label="Toggle Filters"
            >
                ☰
            </button>
        </div>
    );
};

export default SearchBar;
