import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="fixed top-4 left-4 z-50">
        <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1a1a1a] text-white px-4 py-2 rounded border border-[#333] placeholder-[#555] outline-none w-[240px]"
        />
        </div>
    );
};

export default SearchBar;
