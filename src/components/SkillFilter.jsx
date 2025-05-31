import React from 'react';
import skillOptions from '../data/skillOptions';
import { adjustSaturation } from '../utils/adjustSaturation';

const getSkillColor = (skill) => {
  const group = skillOptions.find(group => group.skills.includes(skill));
  return group ? group.color : '#555';
};

const SkillFilter = ({ skillFilters, setSkillFilters }) => {
  const toggleSkill = (skill) => {
    if (skillFilters.includes(skill)) {
      setSkillFilters(skillFilters.filter(s => s !== skill));
    } else if (skillFilters.length < 3) {
      setSkillFilters([...skillFilters, skill]);
    }
  };

  return (
    <div className="fixed top-20 left-4 z-50 flex flex-col gap-4 w-[280px] max-h-[80vh] overflow-y-auto font-light font-['Space_Grotesk']">
      {skillOptions.map(group => (
        <div key={group.label} className="flex flex-wrap gap-2">
          {group.skills.map(skill => {
            const baseColor = getSkillColor(skill); // full saturation
            const tonedColor = adjustSaturation(baseColor, 80); // reduced saturation
            const isSelected = skillFilters.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`text-sm px-3 py-1 rounded-[4px] border text-white transition-all duration-200`}
                style={
                  isSelected
                    ? { backgroundColor: baseColor,
                        borderColor: baseColor  
                    }
                    : {
                        borderColor: tonedColor,
                        backgroundColor: 'transparent',
                      }
                }
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = baseColor;
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
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
