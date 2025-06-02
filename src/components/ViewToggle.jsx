import React from 'react';

const ViewToggle = ({ listView, setListView }) => {
    return (
        <div className={`
        z-51 flex justify-center items-center font-light font-space-grotesk
        ${/* desktop fixed center */ ''}
        lg:flex fixed top-4 left-4 lg:left-1/2 transform lg:-translate-x-1/2 pr-8 w-full max-w-full lg:max-w-[420px]
        `}>
        <div className="flex h-[40px] rounded overflow-hidden w-full transition-opacity duration-200">
            <button
            onClick={() => setListView(false)}
            className={`w-1/2 text-sm transition-colors opacity-50 hover:opacity-100 hover:bg-[#2a2a2a] transition-all ${
                !listView ? 'bg-[#2a2a2a] text-[#868686]' : 'text-[#868686]'
            }`}
            >
            WEB VIEW
            </button>
            <button
            onClick={() => setListView(true)}
            className={`w-1/2 text-sm transition-colors opacity-50 hover:opacity-100 hover:bg-[#2a2a2a] transition-all ${
                listView ? 'bg-[#2a2a2a] text-[#868686]' : 'text-[#868686]'
            }`}
            >
            LIST VIEW
            </button>
        </div>
        </div>
    );
};

export default ViewToggle;
