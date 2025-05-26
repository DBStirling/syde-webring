import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, toggleFilterUI  }) => {
    return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
        <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1a1a1a] text-white px-4 py-2 rounded border border-[#333] placeholder-[#555] outline-none w-[240px]"
        />
        <button
            onClick={toggleFilterUI}
            className="text-sm bg-[#2a2a2a] text-white px-3 py-2 rounded border border-[#444] hover:bg-[#3a3a3a]"
        >
            Filters
        </button>
        </div>
    );
};

export default SearchBar;
