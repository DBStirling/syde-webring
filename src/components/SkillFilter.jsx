import React from 'react';
import skillOptions from '../data/skillOptions';
import { adjustSaturation } from '../utils/adjustSaturation';

const getSkillColor = (skill) => {
  const group = skillOptions.find(group => group.skills.includes(skill));
  return group ? group.color : '#555';
};

const SkillFilter = ({ skillFilters, setSkillFilters, visible }) => {
  const toggleSkill = (skill) => {
    if (skillFilters.includes(skill)) {
      setSkillFilters(skillFilters.filter(s => s !== skill));
    } else if (skillFilters.length < 3) {
      setSkillFilters([...skillFilters, skill]);
    }
  };

  return (
    <div
      className={`
        fixed top-20 left-4 z-50 max-h-[20vh] w-[90vw] lg:w-[292px] lg:max-h-none overflow-y-auto
        flex flex-col gap-4 font-light font-space-grotesk
        transition-all duration-500 ease-in-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'}
      `}
    >
      {skillOptions.map(group => (
        <div key={group.label} className="flex flex-wrap gap-2">
          {group.skills.map(skill => {
            const baseColor = getSkillColor(skill);
            const isSelected = skillFilters.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className="text-xs lg:text-sm px-3 py-1 rounded-[4px] border text-[#868686] transition-all duration-200"
                style={{
                  backgroundColor: isSelected ? baseColor : 'transparent',
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
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = '#333';
                    e.currentTarget.style.color = '#868686';
                  }
                }}
              >
                {skill}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SkillFilter;
