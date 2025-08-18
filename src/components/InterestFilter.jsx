import React from 'react';
import interestOptions from '../data/interestOptions';

const getInterestColor = (interest) => {
  const group = interestOptions.find(group => group.interests.includes(interest));
  return group ? group.color : '#555';
};

const InterestFilter = ({ interestFilters, setInterestFilters, visible }) => {
  const toggleInterest = (interest) => {
    if (interestFilters.includes(interest)) {
      setInterestFilters(interestFilters.filter(s => s !== interest));
    } else if (interestFilters.length < 3) {
      setInterestFilters([...interestFilters, interest]);
    }
  };

  return (
    <div
      className={`
        fixed top-28 bg-[#333]/10 backdrop-blur lg:backdrop-blur-none lg:bg-[#333]/0 lg:top-20 left-4 z-50 max-h-[20vh] w-[90vw] lg:w-[292px] lg:max-h-none overflow-y-auto
        flex flex-col gap-4 font-light font-space-grotesk
        transition-all duration-500 ease-in-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'}
      `}
    >
      {interestOptions.map(group => (
        <div key={group.label} className="flex flex-wrap gap-2">
          {group.interests.map(interest => {
            const baseColor = getInterestColor(interest);
            const isSelected = interestFilters.includes(interest);
            return (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className="text-xs lg:text-sm px-3 py-1 rounded-[4px] border text-[#868686] transition-all duration-200"
                style={{
                  backgroundColor: isSelected ? baseColor : '#161616',
                  borderColor: isSelected ? baseColor : '#333',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = baseColor;
                    e.currentTarget.style.borderColor = baseColor;
                    e.currentTarget.style.color = '#FFFFFF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = '#161616';
                    e.currentTarget.style.borderColor = '#333';
                    e.currentTarget.style.color = '#868686';
                  }
                }}
              >
                {interest}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default InterestFilter;
